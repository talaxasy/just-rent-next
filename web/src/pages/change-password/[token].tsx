import { Alert, AlertIcon, Box, Button, createStandaloneToast, toast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';

import InputFieldProps from '../../components/InputFieldProps';
import NavBarUnregistered from '../../components/NavBar';
import Wrapper from '../../components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import { MeDocument, MeQuery, useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { withApollo } from '../../utils/withApollo';
import FormikControl from '../../components/FormikControl';

const ChangePassword: NextPage = () => {
    const router = useRouter();
    const [changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');
    const toast = createStandaloneToast();

    useEffect(() => {
        if (tokenError) {
            toast({
                title: "Произошла ошибка",
                description: tokenError,
                status: "error",
                duration: 4000,
                isClosable: true,
                position: 'bottom-right'
            })
        }
        setTokenError('');
    }, [tokenError]);


    return (
        <>
            <NavBarUnregistered />
            <Box mx='auto' w='fit-content' fontSize='26px' fontWeight='bold' my={2}>Смена пароля</Box>
            <Wrapper variant='small'>
                <Formik
                    initialValues={{ newPassword: '' }}
                    onSubmit={async (values, { setErrors }) => {
                        const resp = await changePassword({
                            variables: {
                                newPassword: values.newPassword,
                                token: typeof router.query.token === 'string' ? router.query.token : ''
                            },
                            update: (cache, { data }) => {
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        __typename: 'Query',
                                        me: data?.changePassword.user,
                                    }
                                });
                                cache.evict({ fieldName: 'houses:{}' });
                            }
                        });
                        if (resp.data?.changePassword.errors) {
                            const errorMap = toErrorMap(resp.data.changePassword.errors);
                            if ('token' in errorMap) {
                                setTokenError(errorMap.token);
                            }
                            setErrors(errorMap);
                        } else if (resp.data?.changePassword.user) {
                            router.push('/');
                        }
                    }}>
                    {({ isSubmitting }) => (
                        <Form>

                            <FormikControl
                                control='input'
                                smallSize={true}
                                name='newPassword'
                                placeholder='Новый пароль'
                                label='Новый пароль'
                                type='password'
                            />
                            <Button colorScheme='airbnb' mt={5} w="100%" isLoading={isSubmitting} type='submit'>Изменить пароль</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </>
    );
}

export default withApollo({ ssr: false })(ChangePassword);