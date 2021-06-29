import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, IconButton, Image, SimpleGrid } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { HouseQuery, HousesQuery, SearchListingsQuery, useDeleteHouseMutation, useMeQuery, useReviewsQuery } from '../generated/graphql';
import { convertToMoneyFormat } from '../utils/convertToMoneyFormat';
import Review from './Review';

interface ListOfHousesProps {
    data?: HousesQuery | undefined;
    searchComponent?: boolean;
    listingsData?: SearchListingsQuery | undefined | null;
}

const ListOfHouses: React.FC<ListOfHousesProps> = ({ data, searchComponent, listingsData }) => {

    const [deleteHouse] = useDeleteHouseMutation();
    const { data: meData } = useMeQuery();

    return (
        <SimpleGrid minChildWidth="250px" spacing="40px">
            {!searchComponent ? data!.houses.houses.map((el) => !el ? null : (

                <Box key={el.id} borderWidth="1px" borderRadius="lg" position='relative' overflow="hidden" cursor='pointer' userSelect='none'>

                    <NextLink href='/house/[id]' as={`/house/${el.id}`}>
                        <Box pos='relative' h='200px' overflow='hidden'>
                            <Image w='100%' h='100%' objectFit='cover' src={`http://localhost:4000/images/${el.user.id}/${el.pictureUrl[0]}`} alt={el.title} />
                            {el.user.id !== meData?.me?.id ? null : <Box borderRadius='5px' fontSize='10px' bg='#fff' pos='absolute' right='10px' bottom='10px' fontWeight='600' padding='5px 10px'>Это ваше жильё</Box>}
                        </Box>
                    </NextLink>
                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            {new Date() > new Date((new Date(parseInt(el.createdAt))).setDate(new Date(parseInt(el.createdAt)).getDate() + 7)) ? null : <Badge borderRadius="full" mr="2" px="2" colorScheme="airbnb">
                                Новый
                            </Badge>}
                            <Box
                                color="gray.500"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                            >
                                {el.bed_count} кроватей &bull; {el.bathroom_count} ванных
                            </Box>
                        </Box>

                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {el.title}
                        </Box>

                        <Box>
                            BYN {el.price.toLocaleString('ru')}
                            <Box as="span" color="gray.600" fontSize="sm">
                                &nbsp;/ день
                                <br />{el.user.username}

                            </Box>
                        </Box>

                        <Box d="flex" mt="2" alignItems="center">
                            {Array(5)
                                .fill("")
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={i < Math.round(el.rating) ? "airbnb.500" : "gray.300"}
                                    />
                                ))}
                            <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                {el.reviewCount} отзывов

                            </Box>
                        </Box>
                    </Box>
                    {/* <Review house={el} /> */}

                    {(el.user.id !== meData?.me?.id) || searchComponent ? null : <Box>
                        <IconButton
                            aria-label="Delete house"
                            colorScheme='red'
                            position='absolute'
                            right='10px'
                            bottom='10px'
                            icon={<DeleteIcon />}
                            onClick={() => {
                                deleteHouse({
                                    variables: { id: el.id }, update: (cache) => {
                                        cache.evict({ id: 'House:' + el.id });
                                    }
                                });
                            }} />
                        <NextLink href='/house/edit/[id]' as={`/house/edit/${el.id}`}>
                            <Button aria-label="Edit house" colorScheme='teal' position='absolute' right='10px' top='10px' rightIcon={<EditIcon />}>Редактировать</Button>
                        </NextLink>
                    </Box>}
                </Box>


            )
            ) : listingsData!.searchListings!.map((el) => !el ? null : (

                <Box key={el.id} borderWidth="1px" borderRadius="lg" position='relative' overflow="hidden" cursor='pointer' userSelect='none'>

                    <NextLink href='/house/[id]' as={`/house/${el.id}`} >
                        <Box pos='relative' h='200px' overflow='hidden'>
                            <Image w='100%' h='100%' objectFit='cover' src={`http://localhost:4000/images/${el.userId}/${el.pictureUrl[0]}`} alt={el.title} />
                            {el.userId !== meData?.me?.id ? null : <Box borderRadius='5px' fontSize='10px' bg='#fff' pos='absolute' right='10px' bottom='10px' fontWeight='600' padding='5px 10px'>Это ваше жильё</Box>}
                        </Box>
                    </NextLink>
                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            {new Date() > new Date((new Date(parseInt(el.createdAt))).setDate(new Date(parseInt(el.createdAt)).getDate() + 7)) ? null : <Badge borderRadius="full" mr="2" px="2" colorScheme="airbnb">
                                Новый
                            </Badge>}
                            <Box
                                color="gray.500"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                            >
                                {el.bed_count} кроватей &bull; {el.bathroom_count} ванных
                            </Box>
                        </Box>

                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {el.title}
                        </Box>

                        <Box>
                            BYN {el.price.toLocaleString('ru')}
                            <Box as="span" color="gray.600" fontSize="sm">
                                &nbsp;/ день

                            </Box>
                        </Box>

                        <Box d="flex" mt="2" alignItems="center">
                            {Array(5)
                                .fill("")
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={i < Math.round(el.rating) ? "airbnb.500" : "gray.300"}
                                    />
                                ))}
                            <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                {el.reviewCount} отзывов

                            </Box>
                        </Box>
                    </Box>
                </Box>


            )
            )


            }
        </SimpleGrid>
    );
}

export default ListOfHouses;
