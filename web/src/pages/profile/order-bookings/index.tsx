import { Box, Divider, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AdminBookingOrdersComponent from '../../../components/AdminBookingOrdersComponent';
import Layout from '../../../components/Layout';
import Wrapper from '../../../components/Wrapper';
import { useGetAdminBookingsQuery, useMeQuery } from '../../../generated/graphql';
import { useIsAuth } from '../../../utils/useIsAuth';
import { withApollo } from '../../../utils/withApollo';

interface indexProps {

}

const OrderBookings: React.FC<indexProps> = ({ }) => {
    useIsAuth();
    const { data: meData, loading: meLoading } = useMeQuery();

    const { data: dataAdmin, loading: loadingAdmin } = useGetAdminBookingsQuery();
    const [renderBookings, setRenderBookings] = useState<any>(undefined);

    useEffect(() => {
        if (loadingAdmin && !dataAdmin?.getAdminBookings) {
            setRenderBookings(<Box><Spinner /></Box>)
        } else if (dataAdmin?.getAdminBookings && !loadingAdmin) {
            setRenderBookings(<AdminBookingOrdersComponent data={dataAdmin} meData={meData} />)
        }
    }, [dataAdmin, loadingAdmin])



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
                <Text mt='30px' fontSize='4xl' fontWeight='bold'>Заказы жилья</Text>
                <Divider opacity='.2' height='2px' bg='#333333' my={5} />
                {renderBookings}
                <Text mt='30px' fontSize='4xl' fontWeight='bold'>История Заказов жилья</Text>
                <Divider opacity='.2' height='2px' bg='#333333' my={5} />
                <Box h='200px'><Box fontSize='lg' opacity='.7'>У вас пока нет истории заказов жилья</Box></Box>
            </Wrapper>
        </Layout>
    );
}

export default withApollo({ ssr: true })(OrderBookings);