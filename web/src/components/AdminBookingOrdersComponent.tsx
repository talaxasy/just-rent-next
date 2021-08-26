import { Box, Flex, StackDivider, Text, VStack, Image, Divider, Button, Tooltip } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react'
import { GetAdminBookingsDocument, GetAdminBookingsQuery, GetCustomerBookingsQuery, MeQuery, useChangeBookingStatusMutation, useDeleteBookingMutation } from '../generated/graphql';
import NextLink from 'next/link';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import router from 'next/router';

interface AdminBookingOrdersComponentProps {
    data: GetAdminBookingsQuery | undefined;
    meData: MeQuery | undefined;
    finished?: boolean;
}

const AdminBookingOrdersComponent: React.FC<AdminBookingOrdersComponentProps> = ({ data, meData, finished }) => {
    function datediff(first: moment.Moment, second: moment.Moment) {
        return Math.round((parseInt('' + second, 10) - parseInt('' + first, 10)) / (1000 * 60 * 60 * 24));
    }
    const [changeBookingStatus] = useChangeBookingStatusMutation();

    return (
        <VStack filter={finished ? 'grayscale(1)' : undefined} w='100%'
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
        >
            {
                data?.getAdminBookings && data?.getAdminBookings.length !== 0 ? data.getAdminBookings.map(el => (

                    <Flex w='100%' height='auto' key={`${el.id}_${el.createdAt}`}>
                        <Box w='300px'>
                            <NextLink href='/house/[id]' as={`/house/${el.house.id}`}>
                                <Box cursor='pointer' pos='relative' h='150px' borderRadius='20px' overflow='hidden'>
                                    <Image w='100%' h='100%' objectFit='cover' src={`http://localhost:4000/images/${el.house.user.id}/${el.house.pictureUrl[0]}`} />
                                </Box>
                            </NextLink>
                            <Text fontWeight='400' mt='10px'>{el.house.title}</Text>
                            <Text isTruncated fontWeight='500' mt='5px'>
                                {el.house.country !== '' && `${el.house.country}, `}
                                {el.house.city !== '' && `${el.house.city}, `}
                                {el.house.state !== '' && `${el.house.state}, `}
                                {el.house.street !== '' && `${el.house.street} `}
                                {el.house.apartment !== '' && el.house.apartment}
                            </Text>
                        </Box>
                        <Divider height='auto' orientation="vertical" opacity='.2' width='2px' bg='#333333' mx={5} />
                        <Flex w='350px'>

                            <Box fontSize='18px'>
                                <Text>Бронь: с {moment(el.startDate, 'x').format('DD.MM.YY')} по {moment(el.endDate, 'x').format('DD.MM.YY')}</Text>
                                <Text>Статус: <Text display='inline-block' color={el.status === 'в ожидании' ? '#ff8d00' : '#26bf00'}>{el.status}</Text></Text>
                                <Text>Хозяин: {el.house.user.firstName ? <Text display='inline-block' fontWeight='500'>{el.house.user.firstName} {el.house.user.secondName}</Text> : <Text display='inline-block' opacity='.7'>Неизвестно</Text>}</Text>
                                <Text>Телефон для справок: {el.house.user.phone}</Text>
                                <Text>Дата брони: {moment(el.createdAt, 'x').format('DD.MM.YY')}</Text>
                                <Text>Цена: <b>BYN {el.house.price} / ночь</b></Text>
                            </Box>
                        </Flex>
                        <Divider height='auto' orientation="vertical" opacity='.2' width='2px' bg='#333333' mx={5} />
                        <Box fontWeight='600' w={finished ? '540px' : '400px'}>
                            <Flex justifyContent='space-between' my='7px'>
                                <Box>{`BYN ${el.house.price} x ${datediff(moment(el.startDate, 'x'), moment(el.endDate, 'x'))} ночей`}</Box>
                                <Box>{`BYN ${el.house.price * datediff(moment(el.startDate, 'x'), moment(el.endDate, 'x'))}`}</Box>
                            </Flex>
                            <Flex justifyContent='space-between' my='7px'>
                                <Box>Сборы за услуги JustRent</Box>
                                <Box>{`BYN ${Math.round(14 / 100 * (el.house.price * datediff(moment(el.startDate, 'x'), moment(el.endDate, 'x'))))}`}</Box>
                            </Flex>
                            <Divider my='10px' opacity='.2' height='.5px' bg='#333333' />
                            <Flex justifyContent='space-between' my='7px'>
                                <Box>Итого</Box>
                                <Box>{`BYN ${Math.round((14 / 100 * (el.house.price * datediff(moment(el.startDate, 'x'), moment(el.endDate, 'x')))) + (el.house.price * datediff(moment(el.startDate, 'x'), moment(el.endDate, 'x'))))}`}</Box>
                            </Flex>
                        </Box>
                        {finished ? null : <><Divider height='auto' orientation="vertical" opacity='.2' width='2px' bg='#333333' mx={5} />
                            <Flex w='90px' justifyContent='center' alignItems='center' flexDir='column'>
                                {el.status != 'активирован' ?
                                    <Button
                                        mb='20px'
                                        onClick={() => {
                                            changeBookingStatus({
                                                variables: { id: el.id, active: 1 },
                                                refetchQueries: [{
                                                    query: GetAdminBookingsDocument,
                                                }]
                                            });
                                        }}
                                        fontSize='12px' aria-label="SetActive order" colorScheme='green' width='100px'>Активировать</Button>
                                    : null}
                                <Button
                                    onClick={() => {
                                        changeBookingStatus({
                                            variables: { id: el.id, finished: 2 },
                                            refetchQueries: [{ query: GetAdminBookingsDocument }]
                                        });
                                    }}
                                    fontSize='12px' aria-label="SetActive order" colorScheme='blue' width='100px'>Завершить</Button>

                            </Flex></>}

                    </Flex>
                )) : <Box fontSize='lg' opacity='.7'>{finished ? 'У вас пока нет истории заказов жилья' : 'У вас пока нет заказов брони на жильё'}</Box>
            }
        </VStack>
    );
}

export default AdminBookingOrdersComponent;