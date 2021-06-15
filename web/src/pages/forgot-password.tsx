import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import FormikControl from '../components/FormikControl';
import InputFieldProps from '../components/InputFieldProps';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';



const ForgotPassword: React.FC = ({ }) => {
    const [forgotPassword] = useForgotPasswordMutation();
    const [complite, setComplite] = useState(false);

    return (
        <>
            <Layout>
                <Wrapper variant='small'>
                    <Box mx='auto' w='fit-content' fontSize='26px' fontWeight='bold' my={2}>Восстановление пароля</Box>
                    <Formik
                        initialValues={{ email: '' }}
                        onSubmit={async (values) => {
                            await forgotPassword({ variables: values });
                            setComplite(true);
                        }}>

                        {({ isSubmitting }) => complite ?
                            <>
                                <Alert
                                    status="success"
                                    variant="subtle"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    textAlign="center"
                                    height="200px"
                                >
                                    <AlertIcon boxSize="40px" mr={0} />
                                    <AlertTitle mt={4} mb={1} fontSize="lg">
                                        Обрабатываем!
                                    </AlertTitle>
                                    <AlertDescription maxWidth="sm">
                                        Если аккаунт с такой почтой существует, то мы вышлем вам письмо.
                                    </AlertDescription>
                                </Alert>
                            </> :
                            (
                                <Form>
                                    <FormikControl
                                        control='input'
                                        smallSize={true}
                                        name='email'
                                        placeholder='Адрес электронной почты'
                                        label='E-mail'
                                    />
                                    <Button colorScheme='teal' mt={5} w="100%" isLoading={isSubmitting} type='submit'>Восстановить пароль</Button>
                                </Form>
                            )}
                    </Formik>
                </Wrapper>
            </Layout>
        </>
    );
}

export default withApollo({ ssr: false })(ForgotPassword);