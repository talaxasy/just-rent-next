import { Avatar, Box, Button, Flex, Table, TableCaption, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
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

const Reports: React.FC<indexProps> = ({ }) => {
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
            <Wrapper variant='average'>
                <Box my='40px' w='100%'>
                    <Text fontSize='xl' fontWeight='bold'>Статистика по бронированиям:</Text>
                    <Box my='20px' border='1px solid #00000333' borderRadius='8px' overflow='hidden'>
                        <Table variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>Название жилья</Th>
                                    <Th>Кол-во бронирований</Th>
                                    <Th isNumeric>Период</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>inches</Td>
                                    <Td>millimetres (mm)</Td>
                                    <Td isNumeric>25.4</Td>
                                </Tr>
                                <Tr>
                                    <Td>feet</Td>
                                    <Td>centimetres (cm)</Td>
                                    <Td isNumeric>30.48</Td>
                                </Tr>
                                <Tr>
                                    <Td>yards</Td>
                                    <Td>metres (m)</Td>
                                    <Td isNumeric>0.91444</Td>
                                </Tr>
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>Название жилья</Th>
                                    <Th>Кол-во бронирований</Th>
                                    <Th isNumeric>Период</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </Box>

                </Box>
            </Wrapper>
        </Layout>
    );
}

export default withApollo({ ssr: true })(Reports);