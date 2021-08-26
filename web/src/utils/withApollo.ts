import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createWithApollo } from "./createWithApollo";
import { PaginatedHouses } from '../generated/graphql';
import { createUploadLink } from 'apollo-upload-client';

const createClient = (ctx: any) => new ApolloClient({
    link: createUploadLink({
        uri: 'http://localhost:4000/graphql',
        credentials: 'include',
        headers: {
            cookie:
                (typeof window === 'undefined'
                    ? ctx?.req?.headers.cookie
                    : undefined) || '',
        },

    }),

    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    houses: {
                        keyArgs: [],
                        merge(existing: PaginatedHouses | undefined, incoming: PaginatedHouses): PaginatedHouses {
                            return {
                                ...incoming,
                                houses: [...(existing?.houses || []), ...incoming.houses]
                            };
                        },
                    },
                },
            },
        },
    }),
});

export const withApollo = createWithApollo(createClient);