import { Box, Button, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import FormikControl from '../components/FormikControl';
import InputFieldProps from '../components/InputFieldProps';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withApollo } from '../utils/withApollo';




interface registerProps {

}



const Login: React.FC<registerProps> = ({ }) => {
    const [login] = useLoginMutation();
    const router = useRouter();
    return (
        <>
            <Layout>
                <Wrapper variant='small'>
                    <Box mx='auto' w='fit-content' fontSize='26px' fontWeight='bold' mb={4} mt='40px'>Авторизация</Box>
                    <Formik
                        initialValues={{ usernameOrEmail: '', password: '' }}
                        onSubmit={async (values, { setErrors }) => {
                            const resp = await login({
                                variables: values,
                                update: (cache, { data }) => {
                                    cache.writeQuery<MeQuery>({
                                        query: MeDocument,
                                        data: {
                                            __typename: 'Query',
                                            me: data?.login.user, // Прикрепляем результат Register Query в кэш к Me Query
                                        }
                                    });
                                    cache.evict({ fieldName: 'houses:{}' });
                                }
                            });
                            if (resp.data?.login.errors) {
                                setErrors(toErrorMap(resp.data.login.errors));
                            } else if (resp.data?.login.user) {
                                if (typeof router.query.next === 'string') {
                                    router.push(router.query.next);
                                } else {
                                    router.back();
                                }
                            }
                        }}>
                        {({ isSubmitting }) => (
                            <Form>
                                <FormikControl
                                    control='input'
                                    name='usernameOrEmail'
                                    placeholder='Логин или E-mail'
                                    label='Логин или E-mail'
                                    smallSize={true}
                                />
                                <Box mt={5}></Box>
                                <FormikControl
                                    control='input'
                                    name='password'
                                    placeholder='Пароль'
                                    label='Пароль'
                                    type='password'
                                    smallSize={true}
                                />
                                <Button colorScheme='teal' mt={5} w="100%" isLoading={isSubmitting} type='submit'>Войти</Button>
                            </Form>
                        )}
                    </Formik>
                    <Box mt={3}>
                        <NextLink href='/forgot-password'>
                            <Link textDecoration='underline'>Забыли пароль?</Link>
                        </NextLink>
                    </Box>
                </Wrapper>
            </Layout>
        </>
    );
}

export default withApollo({ ssr: false })(Login);