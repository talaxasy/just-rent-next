import { Box, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/Layout';
import Wrapper from '../../components/Wrapper';
import { useIsAuth } from '../../utils/useIsAuth';
import { withApollo } from '../../utils/withApollo';
import NextLink from 'next/link';
import { useMeQuery } from '../../generated/graphql';




interface registerProps {

}



const OwnRoom: React.FC<registerProps> = ({ }) => {
    useIsAuth();
    const { data: meData } = useMeQuery();

    return (
        <>
            <Layout>
                <Wrapper>
                    <Flex py='20px' flexDir='column'>
                        <Text fontSize='3xl'>Аккаунт</Text>
                        <Text fontSize='md' opacity='.8'>{meData?.me?.username}, {meData?.me?.email}</Text>
                        <Flex flexWrap='wrap' mx='-10px'>
                            <NextLink href='/profile/settings'>
                                <Box width='33.33333333333333%' p='10px' cursor='pointer'>
                                    <Flex flexDir='column' height='auto' className='profile_card'>
                                        <Text mb='10px' fontSize='2xl'>🔒</Text>
                                        <Text fontSize='2xl' fontWeight='bold'>Личная информация</Text>
                                        <Text>Предоставьте личные и контактные данные</Text>
                                    </Flex>
                                </Box>
                            </NextLink>
                            <NextLink href='/profile/dashboard'>
                                <Box width='33.33333333333333%' p='10px' cursor='pointer'>
                                    <Flex flexDir='column' height='auto' className='profile_card'>
                                        <Text mb='10px' fontSize='2xl'>🏡</Text>
                                        <Text fontSize='2xl' fontWeight='bold'>Ваше Жильё</Text>
                                        <Text>Список вашего жилья</Text>
                                    </Flex>
                                </Box>
                            </NextLink>
                            <NextLink href='/profile/order-bookings'>
                                <Box width='33.33333333333333%' p='10px' cursor='pointer'>
                                    <Flex flexDir='column' height='auto' className='profile_card'>
                                        <Text mb='10px' fontSize='2xl'>🔥</Text>
                                        <Text fontSize='2xl' fontWeight='bold'>Заказы по бронированию</Text>
                                        <Text>Заказы бронирования и история заказов</Text>
                                    </Flex>
                                </Box>
                            </NextLink>
                            <NextLink href='/profile/bookings'>
                                <Box width='33.33333333333333%' p='10px' cursor='pointer'>
                                    <Flex flexDir='column' height='auto' className='profile_card'>
                                        <Text mb='10px' fontSize='2xl'>🔥</Text>
                                        <Text fontSize='2xl' fontWeight='bold'>Бронирование</Text>
                                        <Text>Список существующих бронирований и история бронирований</Text>
                                    </Flex>
                                </Box>
                            </NextLink>
                        </Flex>
                    </Flex>
                </Wrapper>
            </Layout>
        </>
    );
}

export default withApollo({ ssr: true })(OwnRoom);