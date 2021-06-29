import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import FormikControl from '../components/FormikControl';
import InputFieldProps from '../components/InputFieldProps';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withApollo } from '../utils/withApollo';




interface registerProps {

}



const Register: React.FC<registerProps> = ({ }) => {
    const [register] = useRegisterMutation();
    const router = useRouter();
    return (
        <>
            <Layout>
                <Wrapper variant='small'>
                    <Box mx='auto' w='fit-content' fontSize='26px' fontWeight='bold' mb={4} mt='40px'>Регистрация</Box>
                    <Formik
                        initialValues={{ username: '', password: '', email: '' }}
                        onSubmit={async (values, { setErrors }) => {
                            const resp = await register({
                                variables: { options: values },
                                update: (cache, { data }) => {
                                    cache.writeQuery<MeQuery>({
                                        query: MeDocument,
                                        data: {
                                            __typename: 'Query',
                                            me: data?.register.user, // Прикрепляем результат Register Query в кэш к Me Query
                                        }
                                    });
                                }
                            });
                            if (resp.data?.register.errors) {
                                setErrors(toErrorMap(resp.data.register.errors));
                            } else if (resp.data?.register.user) {
                                router.push('/profile');
                            }
                        }}>
                        {({ isSubmitting }) => (
                            <Form>
                                <FormikControl
                                    control='input'
                                    name='username'
                                    placeholder='Логин'
                                    label='Логин'
                                    smallSize={true}
                                />
                                <Box mt={5}></Box>
                                <FormikControl
                                    control='input'
                                    name='email'
                                    placeholder='Адрес электронной почты'
                                    label='E-mail'
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
                                <Button colorScheme='airbnb' mt={5} w="100%" isLoading={isSubmitting} type='submit'>Зарегистрироваться</Button>
                            </Form>
                        )}
                    </Formik>
                </Wrapper>
            </Layout>
        </>
    );
}

export default withApollo({ ssr: false })(Register);