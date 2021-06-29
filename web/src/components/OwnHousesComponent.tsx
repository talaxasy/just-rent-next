import { Box, Flex, StackDivider, Text, VStack, Image, Divider, Button, Tooltip, IconButton } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react'
import { GetCustomerBookingsQuery, HousesQuery, MeQuery, useDeleteBookingMutation, useDeleteHouseMutation } from '../generated/graphql';
import NextLink from 'next/link';
import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface OwnHousesComponentProps {
    data: HousesQuery | undefined;
    meData: MeQuery | undefined;
}

const OwnHousesComponent: React.FC<OwnHousesComponentProps> = ({ data, meData }) => {
    const [deleteHouse] = useDeleteHouseMutation();
    return (
        <Flex flexWrap='wrap' mx={data?.houses.houses.length ? '-10px' : '0'} mb='30px'>
            {
                data?.houses.houses.length && data?.houses.houses.length !== 0 ? data.houses.houses.map(el => !el ? null : (
                    <Box key={el.id} borderRadius='8px' p='10px' width='300px'>
                        <NextLink href='/house/[id]' as={`/house/${el.id}`}>
                            <Box cursor='pointer' pos='relative' h='150px' borderRadius='20px' overflow='hidden'>
                                {(el.user.id !== meData?.me?.id) ? null : <Box>
                                    <IconButton
                                        aria-label="Delete house"
                                        colorScheme='red'
                                        position='absolute'
                                        right='10px'
                                        bottom='45px'
                                        icon={<DeleteIcon />}
                                        onClick={() => {
                                            deleteHouse({
                                                variables: { id: el.id }, update: (cache) => {
                                                    cache.evict({ id: 'House:' + el.id });
                                                }
                                            });
                                        }} />
                                    <NextLink href='/house/edit/[id]' as={`/house/edit/${el.id}`}>
                                        <Button fontSize='12px' aria-label="Edit house" colorScheme='teal' position='absolute' right='10px' top='10px' rightIcon={<EditIcon />}>Редактировать</Button>
                                    </NextLink>
                                </Box>}
                                <Image w='100%' h='100%' objectFit='cover' src={`http://localhost:4000/images/${el.user.id}/${el.pictureUrl[0]}`} alt={el.title} />
                                {el.user.id !== meData?.me?.id ? null : <Box borderRadius='5px' fontSize='10px' bg='#fff' pos='absolute' right='10px' bottom='10px' fontWeight='600' padding='5px 10px'>Это ваше жильё</Box>}
                            </Box>
                        </NextLink>
                    </Box>
                )) : <Box fontSize='lg' opacity='.7'>У вас нет пока жилья</Box>
            }
        </Flex>
    );
}

export default OwnHousesComponent;