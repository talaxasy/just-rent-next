import { dedupExchange, fetchExchange, stringifyVariables } from '@urql/core';
import { cacheExchange, Resolver, Cache } from '@urql/exchange-graphcache';
import { tap, pipe } from 'wonka'
import { useRouter } from 'next/router';
import { Exchange } from 'urql';
import { LoginMutation, MeQuery, MeDocument, LogoutMutation, RegisterMutation, DeleteHouseMutationVariables } from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';
import { isServer } from './isServer';


const errorExchange: Exchange = ({ forward }) => (ops$) => {

    return pipe(
        forward(ops$),
        tap(({ error }) => {

            if (error?.message.includes('Не авторизирован')) {
                //useRouter().push('/login');
                console.log('Не авторизирован');
            }
        })
    );
};


/// Pagination --start--

const cursorPagination = (): Resolver => {


    return (_parent, fieldArgs, cache, info) => {
        const { parentKey: entityKey, fieldName } = info;

        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
        const size = fieldInfos.length;
        if (size === 0) {
            return undefined;
        }

        const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
        const ifItInTheCache = cache.resolve(cache.resolve(entityKey, fieldKey) as string, 'houses');
        info.partial = !ifItInTheCache;
        let hasMore = true;

        const results: string[] = [];
        fieldInfos.forEach(fi => {
            const key = cache.resolve(entityKey, fi.fieldKey) as string;
            const data = cache.resolve(key, 'houses') as string[];
            const _hasMore = cache.resolve(key, 'hasMore');
            if (!_hasMore) {
                hasMore = _hasMore as boolean;
            }
            results.push(...data);
        })

        return {
            __typename: 'PaginatedHouses',
            hasMore,
            houses: results
        };
    };
};

/// Pagination --end--


function invalidateAllHouses(cache: Cache) {
    const allFields = cache.inspectFields("Query");
    const fieldInfos = allFields.filter((info) => info.fieldName === "houses");
    fieldInfos.forEach((fi) => {
        cache.invalidate("Query", "houses", fi.arguments || {});
    });
}


export const createUrqlClient = (ssrExchange: any, ctx: any) => {

    let cookie = '';
    if (isServer()) {
        cookie = ctx?.req?.headers?.cookie;
    }


    return {
        url: 'http://localhost:4000/graphql',
        fetchOptions: {
            credentials: 'include' as const,
            headers: cookie ? {
                cookie,
            } : undefined,
        },
        exchanges: [dedupExchange, cacheExchange({
            keys: {
                PaginatedHouses: () => null,
                Review: () => null,
            },
            resolvers: {
                Query: {
                    houses: cursorPagination(),
                }
            },
            updates: {
                Mutation: {
                    deleteHouse: (_result, args, cache, _info) => {
                        cache.invalidate({ __typename: 'House', id: (args as DeleteHouseMutationVariables).id });
                    },
                    createHouse: (_result, _args, cache, _info) => {
                        invalidateAllHouses(cache);
                    },
                    login: (_result, _args, cache, _info) => {
                        betterUpdateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
                            if (result.login.errors) {
                                return query;
                            } else {
                                return {
                                    me: result.login.user
                                }
                            }
                        });
                        invalidateAllHouses(cache);
                    },
                    logout: (_result, _args, cache, _info) => {
                        betterUpdateQuery<LogoutMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({ me: null }));
                    },
                    register: (_result, _args, cache, _info) => {
                        betterUpdateQuery<RegisterMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
                            if (result.register.errors) {
                                return query;
                            } else {
                                return {
                                    me: result.register.user
                                }
                            }
                        });
                    },
                }
            }
        }), errorExchange, ssrExchange, fetchExchange],
    }
};