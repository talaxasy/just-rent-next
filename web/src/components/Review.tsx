import { Box, Button, FormControl, FormErrorMessage, FormLabel, Link, Select } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import NextLink from 'next/link';

import { HouseSnippetFragment, useLeaveReviewMutation, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import InputFieldProps from './InputFieldProps';
import NavBarUnregistered from './NavBar';
import Wrapper from './Wrapper';

interface ReviewProps {
    house: HouseSnippetFragment
}

const Review: React.FC<ReviewProps> = ({ house }) => {
    const [leaveReview] = useLeaveReviewMutation();
    const router = useRouter();
    return (
        <>
            <Box mx='auto' w='fit-content' fontSize='26px' fontWeight='bold' my={2}>Оставить отзыв</Box>
            <Box>
                <Formik
                    initialValues={{ mark: '', text: '' }}
                    onSubmit={async (values) => {
                        await leaveReview({
                            variables: {
                                houseId: house.id,
                                mark: parseInt(values.mark),
                                text: values.text,
                            }
                        });
                        // if (resp.data?.login.errors) {
                        //     setErrors(toErrorMap(resp.data.login.errors));
                        // } else if (resp.data?.login.user) {
                        //     if (typeof router.query.next === 'string') {
                        //         router.push(router.query.next);
                        //     } else {
                        //         router.push('/');
                        //     }
                        // }
                        router.reload();
                    }}>
                    {({ isSubmitting }) => (
                        <Form>
                            <InputFieldProps
                                name='mark'
                                placeholder='Поставить оценку'
                                label='Поставьте оценку'
                                typeField='select'
                                selectArr={[1, 2, 3, 4, 5]}
                            />
                            <Box mt={5}></Box>
                            <InputFieldProps
                                name='text'
                                placeholder='Отзыв'
                                label='Отзыв'
                                typeField='textarea'
                            />
                            <Button colorScheme='teal' mt={5} w="100%" isLoading={isSubmitting} type='submit'>Оставить отзыв</Button>
                        </Form>
                    )}
                </Formik>

            </Box>
        </>
    );
}

export default Review;