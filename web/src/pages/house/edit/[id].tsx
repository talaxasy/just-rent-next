import { Box, Button, Flex } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import FormikControl from '../../../components/FormikControl';
import InputFieldProps from '../../../components/InputFieldProps';
import Layout from '../../../components/Layout';
import Wrapper from '../../../components/Wrapper';
import { useHouseQuery, useUpdateHouseMutation } from '../../../generated/graphql';
import { useGetHouseId } from '../../../utils/useGetHouseId';
import { withApollo } from '../../../utils/withApollo';

const EditHouse: React.FC = ({ }) => {
    const router = useRouter();
    const houseId = useGetHouseId();
    const [updateHouse] = useUpdateHouseMutation();
    const { data, loading } = useHouseQuery({
        skip: houseId === -1,
        variables: {
            id: houseId
        }
    });

    if (loading) {
        return (
            <Wrapper>
                <Box>Загрузка...</Box>
            </Wrapper>
        );
    }

    if (!data?.house) {
        return (
            <Box>
                Такого дома не существует!
            </Box>
        );
    }

    return (
        <>
            <Layout>
                <Wrapper variant='average'>
                    <Box mx='auto' w='fit-content' fontSize='26px' fontWeight='bold' my={10}>Редактирование жилья</Box>
                    <Formik
                        initialValues={{
                            title: data.house?.title,
                        }}
                        onSubmit={async (values, { setErrors }) => {
                            try {
                                await updateHouse({ variables: { id: houseId, ...values } });
                                router.back();
                            } catch (error) {
                                setErrors(error);
                            }
                        }}>
                        {({ isSubmitting }) => (
                            <Form>
                                <Flex flexDirection='column'>
                                    <FormikControl
                                        control='input'
                                        smallSize={true}
                                        name='title'
                                        placeholder='Название'
                                        label='Название дома'
                                    />
                                </Flex>
                                <Button colorScheme='teal' mt={5} w="100%" isLoading={isSubmitting} type='submit'>Сохранить</Button>
                            </Form>
                        )}
                    </Formik>
                </Wrapper>
            </Layout>
        </>
    );
}

export default withApollo({ ssr: false })(EditHouse);