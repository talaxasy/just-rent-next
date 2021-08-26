import { Box, Divider, Flex, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AdminBookingOrdersComponent from '../../../components/AdminBookingOrdersComponent';
import GetCustomerBookings from '../../../components/GetCustomerBookings';
import Layout from '../../../components/Layout';
import OwnHousesComponent from '../../../components/OwnHousesComponent';
import Wrapper from '../../../components/Wrapper';
import { useGetAdminBookingsQuery, useGetCustomerBookingsQuery, useHousesQuery, useMeQuery } from '../../../generated/graphql';
import { useIsAuth } from '../../../utils/useIsAuth';
import { withApollo } from '../../../utils/withApollo';

interface indexProps {

}

const Bookings: React.FC<indexProps> = ({ }) => {
    useIsAuth();
    const { data: meData, loading: meLoading } = useMeQuery();

    const { data: dataCustomer, loading: loadingCustomer } = useGetCustomerBookingsQuery();
    const { data: dataCustomerHistory, loading: loadingCustomerHistory } = useGetCustomerBookingsQuery({
        variables: {
            finished: true
        }
    });


    const [customerList, setCustomerList] = useState<any>(undefined);
    const [customerListHistory, setCustomerListHistory] = useState<any>(undefined);

    useEffect(() => {
        if (loadingCustomer && !dataCustomer?.getCustomerBookings) {
            setCustomerList(<Box><Spinner /></Box>)
        } else if (dataCustomer?.getCustomerBookings && !loadingCustomer) {
            setCustomerList(<GetCustomerBookings meData={meData} getCustomerBookings={dataCustomer} />)
        }
    }, [loadingCustomer, dataCustomer]);


    useEffect(() => {
        if (loadingCustomerHistory && !dataCustomerHistory?.getCustomerBookings) {
            setCustomerListHistory(<Box><Spinner /></Box>)
        } else if (dataCustomerHistory?.getCustomerBookings && !loadingCustomerHistory) {
            setCustomerListHistory(<GetCustomerBookings meData={meData} getCustomerBookings={dataCustomerHistory} finished />)
        }
    }, [loadingCustomerHistory, dataCustomerHistory]);



    if (meLoading) {
        return (
            <Wrapper>
                <Box>Загрузка...</Box>
            </Wrapper>
        );
    }

    return (
        <Layout footer>
            <Wrapper>
                <Text mt='30px' fontSize='4xl' fontWeight='bold'>Забронированное жильё</Text>
                <Divider opacity='.2' height='2px' bg='#333333' my={5} />
                <Flex mb='40px' w='100%'>
                    {customerList}
                </Flex>

                <Text mt='30px' fontSize='4xl' fontWeight='bold'>История бронирования</Text>
                <Divider opacity='.2' height='2px' bg='#333333' my={5} />
                {customerListHistory}
                <Box h='30px'></Box>
            </Wrapper>
        </Layout>
    );
}

export default withApollo({ ssr: true })(Bookings);