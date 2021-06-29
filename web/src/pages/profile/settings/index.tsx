import { Avatar, Box, Button, Flex } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import router from 'next/router';
import React from 'react'
import FormikControl from '../../../components/FormikControl';
import Layout from '../../../components/Layout';
import Wrapper from '../../../components/Wrapper';
import { MeQuery, MeDocument, useUpdateUserMutation, useMeQuery } from '../../../generated/graphql';
import { toErrorMap } from '../../../utils/toErrorMap';
import { useIsAuth } from '../../../utils/useIsAuth';
import { withApollo } from '../../../utils/withApollo';
import login from '../../login';

interface indexProps {

}

const Settings: React.FC<indexProps> = ({ }) => {
    useIsAuth();
    const [UpdateUser] = useUpdateUserMutation();
    const { data: meData, loading: meLoading } = useMeQuery();

    if (meLoading) {
        return (
            <Wrapper>
                <Box>Загрузка...</Box>
            </Wrapper>
        );
    }

    if (!meData?.me) {
        return (
            <Box>
                Такого пользователя нет
            </Box>
        );
    }

    return (
        <Layout>
            <Wrapper variant='small'>
                <Box my='40px' w='100%'>
                    <Formik
                        initialValues={{
                            phone: meData.me.phone,
                            description: meData.me.description,
                            firstName: meData.me.firstName,
                            secondName: meData.me.secondName,
                        }}
                        onSubmit={async (values, { setErrors, setFieldValue }) => {

                            try {
                                await UpdateUser({
                                    variables: values
                                })
                                router.back();
                            } catch (error) {
                                setErrors(error);
                            }
                        }}>
                        {({ isSubmitting }) => (
                            <Form>
                                <Box w='fit-content' mx='auto'>
                                    <Flex mb='20px' mx='auto' alignItems='center'>
                                        <Avatar size='2xl' src="https://bit.ly/sage-adebayo" />
                                    </Flex>
                                </Box>

                                <FormikControl
                                    control='input'
                                    name='firstName'
                                    placeholder='Имя'
                                    label='Ваше имя'
                                    smallSize={true}
                                />
                                <Box h='20px'></Box>
                                <FormikControl
                                    control='input'
                                    name='secondName'
                                    placeholder='Фамилия'
                                    label='Ваша фамилия'
                                    smallSize={true}
                                />
                                <Box h='20px'></Box>
                                <FormikControl
                                    control='input'
                                    name='phone'
                                    placeholder='Телефон'
                                    label='Ваш телефон'
                                    smallSize={true}
                                />
                                <Box h='20px'></Box>
                                <FormikControl
                                    control='input'
                                    name='description'
                                    placeholder='Рассказ...'
                                    label='Расскажите о себе'
                                    smallSize={true}
                                    textarea
                                />

                                <Button colorScheme='teal' mt={5} w="100%" isLoading={isSubmitting} type='submit'>Сохранить</Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Wrapper>
        </Layout>
    );
}

export default withApollo({ ssr: true })(Settings);