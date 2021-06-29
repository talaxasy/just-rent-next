import { CheckCircleIcon, CheckIcon, StarIcon, UnlockIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, SimpleGrid, Image, Badge, Avatar, Divider, List, ListItem, ListIcon, Input, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DateRangePicker, isSameDay } from 'react-dates';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import FormikControl from '../../components/FormikControl';
import CountInput from '../../components/inputs/CountInput';
import Layout from '../../components/Layout';
import Wrapper from '../../components/Wrapper';
import { GetBookingsQuery, HouseQuery, useDoBookingMutation, useGetBookingsQuery } from '../../generated/graphql';
import { useGetHouseFromUrl } from '../../utils/useGetHouseFromUrl';
import { withApollo } from '../../utils/withApollo';

interface HouseProps {

}

interface DefaultCenter {
    lat: number,
    lng: number
}

const MapWithAMarker = withGoogleMap<{
    defaultCenter: DefaultCenter,
    markerPosition: DefaultCenter,
}>(props => {


    return (
        <GoogleMap
            defaultZoom={17}
            defaultCenter={props.defaultCenter}
        >
            <Marker

                position={props.defaultCenter}
            />
        </GoogleMap>
    )
}
);


const House: React.FC<HouseProps> = ({ }) => {
    const router = useRouter();
    const [arrayDates, setArrayDates] = useState<moment.Moment[]>([]);
    const [doBooking] = useDoBookingMutation();
    const [startDate, setStartDate] = useState<moment.Moment | null>(null);
    const [endDate, setEndDate] = useState<moment.Moment | null>(null);
    const [focusedInput, setFocusedInput] = useState<any | null>(null);
    const { data, loading } = useGetHouseFromUrl();
    const [booooking, setBooooking] = useState<GetBookingsQuery | undefined>(undefined);
    const { data: bookingData } = useGetBookingsQuery({ variables: { houseId: data?.house ? data.house.id : 0 } });

    useEffect(() => {
        if (bookingData?.getBookings) {
            setArrayDates(bookingData.getBookings.map(el => moment(el, 'DD-MM-YY')));
        }
    }, [bookingData]);





    if (loading) {
        return (
            <Layout>Загрузка...</Layout>
        );
    }

    if (!data?.house) {
        return (<Layout>
            Такого дома не существует!
        </Layout>);
    }

    function datediff(first: moment.Moment, second: moment.Moment) {
        return Math.round((parseInt('' + second, 10) - parseInt('' + first, 10)) / (1000 * 60 * 60 * 24));
    }

    return (
        <Layout>
            <Wrapper>
                <Flex flexDir='column' mt='20px' mb='50px'>
                    <Box>
                        <Text fontWeight='bold' fontSize='4xl'>{data.house.title}</Text>
                        <Box display='flex' alignItems='center' mb='5px'>
                            <StarIcon mr='5px' color={data.house.rating > 0 ? "airbnb.500" : "gray.300"} />
                            <Box mr='5px'>{data.house.rating}</Box>
                            <Box>{`(${data.house.reviewCount} отзывов)`}</Box>
                            {new Date() > new Date((new Date(parseInt(data.house.createdAt))).setDate(new Date(parseInt(data.house.createdAt)).getDate() + 7)) ? null : <Box fontSize='26px' mx='10px'>·</Box>}
                            {new Date() > new Date((new Date(parseInt(data.house.createdAt))).setDate(new Date(parseInt(data.house.createdAt)).getDate() + 7)) ? null : <Badge borderRadius="full" px="2" colorScheme="airbnb">
                                Новый
                            </Badge>}
                            <Box fontSize='26px' mx='10px'>·</Box>
                            <Box fontWeight='500'>
                                {data.house.country !== '' && `${data.house.country}, `}
                                {data.house.city !== '' && `${data.house.city}, `}
                                {data.house.state !== '' && `${data.house.state}, `}
                                {data.house.street !== '' && `${data.house.street} `}
                                {data.house.apartment !== '' && data.house.apartment}
                            </Box>
                        </Box>
                        <SimpleGrid mt='20px' mb='40px' minChildWidth="450px" spacing="10px">
                            {
                                data.house.pictureUrl.map(pic => {
                                    return (
                                        <Box key={pic} borderWidth="1px" h='300px' borderRadius="lg" position='relative' overflow="hidden">
                                            <Image w='100%' h='100%' objectFit='cover' src={`http://localhost:4000/images/${data.house?.userId}/${pic}`} />
                                        </Box>
                                    );
                                })
                            }
                        </SimpleGrid>
                    </Box>
                    <Flex my={10}>

                        <Flex pos='relative' flexDir='column' width='58.333333333333336%'>
                            <Flex>
                                <Flex flexDir='column' flex='0 1 100%'>
                                    <Text fontSize='2xl' fontWeight='600'>{data.house.house_type.name}, хозяин: {data.house.user.username}</Text>
                                    <Flex fontSize='md' fontWeight='400' alignItems='center'>
                                        {/* 6 гостей · 2 спальни · 3 кровати · 1,5 ванной */}
                                        <Box>{`${data.house.guests_count} гостей`}</Box>
                                        <Box fontSize='26px' mx='5px'>·</Box>
                                        <Box>{data.house.bedroom_count > 0 && `${data.house.bedroom_count} спальни`}</Box>
                                        {data.house.bedroom_count > 0 && <Box fontSize='26px' mx='5px'>·</Box>}
                                        <Box>{`${data.house.bed_count} кровати`}</Box>
                                        <Box fontSize='26px' mx='5px'>·</Box>
                                        <Box>{`${data.house.bathroom_count} ванных`}</Box>
                                    </Flex>
                                </Flex>
                                <Flex alignItems='center'>
                                    <Avatar size='lg' src="https://bit.ly/sage-adebayo" />
                                </Flex>
                            </Flex>
                            <Divider my={5} opacity='.2' border='1' height='.5px' bg='#333333' />
                            <List spacing={3}>
                                {

                                    data.house.amenities.map(el => {
                                        return (
                                            <ListItem key={el} display='flex' alignItems='center'>
                                                <ListIcon as={CheckCircleIcon} color="green.500" />
                                                <Text fontSize='18px'>{el}</Text>
                                            </ListItem>
                                        );
                                    })
                                }
                            </List>
                            <Divider my={5} opacity='.2' height='.5px' bg='#333333' />
                            <Text>
                                {data.house.description}
                            </Text>
                            <Divider my={5} opacity='.2' height='.5px' bg='#333333' />
                            <Text fontSize='xl' mb='15px' fontWeight='bold'>Какие правила вас ждут</Text>
                            <List spacing={3}>
                                {

                                    data.house.rules.map(el => {
                                        return (
                                            <ListItem key={el} display='flex' alignItems='center'>
                                                <ListIcon as={CheckIcon} color="green.500" />
                                                <Text fontSize='18px'>{el}</Text>
                                            </ListItem>
                                        );
                                    })
                                }
                            </List>
                            {data.house.safety_amenities && <>
                                <Box height='20px' />
                                <Text fontSize='xl' mb='15px' fontWeight='bold'>Удобства для безопасности</Text>
                                <List spacing={3}>
                                    {
                                        data.house.safety_amenities.map(el => {
                                            return (
                                                <ListItem key={el} display='flex' alignItems='center'>
                                                    <ListIcon as={UnlockIcon} color="green.500" />
                                                    <Text fontSize='18px'>{el}</Text>
                                                </ListItem>
                                            );
                                        })
                                    }
                                </List>
                            </>}

                        </Flex>
                        <Flex pos='relative' ml='8.333333333333332%' width='33.33333333333333%'>
                            <Box pos='sticky' height='fit-content' zIndex='1' top='50' display='inline-block' width='100%'>
                                <Box paddingBottom='50px' display='flex' flexDir='column' width='100%'>
                                    <Box border='1px solid rgb(221, 221, 221)' borderRadius='12px' padding='24px' boxShadow='rgb(0 0 0 / 12%) 0px 6px 16px'>
                                        <Formik
                                            initialValues={{ startDate: '', endDate: '', guests_count: '' }}
                                            onSubmit={async (values) => {
                                                if (typeof values.guests_count !== 'string') {
                                                    const { data: myData } = await doBooking({
                                                        variables: {
                                                            startDate: values.startDate,
                                                            endDate: values.endDate,
                                                            guests_count: values.guests_count,
                                                            houseId: data.house!.id,
                                                        }
                                                    });
                                                    if (myData?.doBooking) {
                                                        setArrayDates(myData.doBooking.map(el => moment(el, 'DD-MM-YY')));
                                                        setStartDate(null);
                                                        setEndDate(null);
                                                    }
                                                    router.push('/profile/dashboard');
                                                }

                                            }}>
                                            {({ isSubmitting, setValues, values }) => (
                                                <Form>
                                                    <Box fontWeight='600px' mb='20px' fontSize='22px'><Text display='inline-block' fontWeight='700'>{`BYN ${data.house?.price}`}</Text>{` / ночь`}</Box>
                                                    <Box mb='20px' width='100%' display='flex' flexDir='column' alignContent='stretch' justifyContent='stretch'>
                                                        <DateRangePicker
                                                            startDate={startDate} // momentPropTypes.momentObj or null,
                                                            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                                            endDate={endDate} // momentPropTypes.momentObj or null,
                                                            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                                            onDatesChange={({ startDate, endDate }) => {

                                                                setStartDate(startDate);
                                                                setEndDate(endDate);
                                                                setValues({
                                                                    ...values,
                                                                    startDate: '' + startDate,
                                                                    endDate: '' + endDate,
                                                                });

                                                            }} // PropTypes.func.isRequired,
                                                            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                                            onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                                                            readOnly={true}
                                                            daySize={50}
                                                            hideKeyboardShortcutsPanel={true}
                                                            withPortal={true}
                                                            startDatePlaceholderText='Прибытие'
                                                            endDatePlaceholderText='Выезд'
                                                            isDayBlocked={day1 => arrayDates.some(day2 => isSameDay(day1, day2))}
                                                        />
                                                    </Box>

                                                    <CountInput
                                                        width='100%'
                                                        name='guests_count'
                                                        placeholder='Гости'
                                                        max={data.house!.guests_count}
                                                    />
                                                    <Button colorScheme='airbnb' mt={5} w="100%" isLoading={isSubmitting} type='submit'>Забронировать</Button>

                                                    {startDate && endDate && <Box fontWeight='600'>

                                                        <Flex justifyContent='space-between' my='7px'>
                                                            <Box>{`BYN ${data.house!.price} x ${datediff(startDate, endDate)} ночей`}</Box>
                                                            <Box>{`BYN ${data.house!.price * datediff(startDate, endDate)}`}</Box>
                                                        </Flex>
                                                        <Flex justifyContent='space-between' my='7px'>
                                                            <Box>Сборы за услуги JustRent</Box>
                                                            <Box>{startDate && endDate && `BYN ${Math.round(14 / 100 * (data.house!.price * datediff(startDate, endDate)))}`}</Box>
                                                        </Flex>
                                                        <Divider my='10px' opacity='.2' height='.5px' bg='#333333' />
                                                        <Flex justifyContent='space-between' my='7px'>
                                                            <Box>Итого</Box>
                                                            <Box>{`BYN ${Math.round((14 / 100 * (data.house!.price * datediff(startDate, endDate))) + (data.house!.price * datediff(startDate, endDate)))}`}</Box>
                                                        </Flex>

                                                    </Box>}

                                                </Form>
                                            )}
                                        </Formik>
                                    </Box>
                                </Box>
                            </Box>
                        </Flex>
                    </Flex>
                    <Box>
                        {data.house.latitude && data.house.longitude &&
                            <>
                                <Divider my={5} mt='30px' opacity='.2' height='.5px' bg='#333333' />
                                <Text fontSize='xl' fontWeight='bold' mb='10px'>Где вы будете</Text>

                                <MapWithAMarker
                                    containerElement={<div style={{ height: `400px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                    defaultCenter={{ lat: data.house.latitude, lng: data.house.longitude }}
                                    markerPosition={{ lat: data.house.latitude, lng: data.house.longitude }}

                                />
                            </>}
                    </Box>
                </Flex>

            </Wrapper>
        </Layout>
    );
}

export default withApollo({ ssr: true })(House);