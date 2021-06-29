import { Box, Flex, SimpleGrid, Text, Image, Button, Divider, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, withGoogleMap, } from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import Layout from '../../components/Layout';
import ListOfHouses from '../../components/ListOfHouses';
import Wrapper from '../../components/Wrapper';
import { useHousesQuery, useMeQuery, useSearchListingsQuery } from '../../generated/graphql';
import { useGetSearchParamsFromUrl } from '../../utils/useGetSearchParamsFromUrl';
import { withApollo } from '../../utils/withApollo';
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
import NextLink from 'next/link';

interface SearchListingProps {

}

interface DefaultCenter {
    lat: number,
    lng: number,
    title: string,
    price: number,
    id: number,
    img: string,
}

const MapWithAMarker = withGoogleMap<{
    defaultCenter: Array<DefaultCenter>,
    markerPosition: Array<DefaultCenter>,
}>(props => {
    let lat: number | undefined = 0; let lng: number | undefined = 0;
    if (props.markerPosition.length > 0) {
        lat = props.markerPosition.find((el) => el)!.lat;
        lng = props.markerPosition.find((el) => el)!.lng;
    } else {
        lat = 0;
        lng = 0;
    }
    let wholeMap = 25;
    if (lat === 0 && lng === 0) {
        wholeMap = 500;
    }

    console.log(wholeMap);

    return (
        <GoogleMap
            defaultZoom={wholeMap}
            defaultCenter={{ lat, lng }}
            center={{ lat, lng }}

        >
            <MarkerClusterer

                averageCenter
                enableRetinaIcons

                gridSize={60}

            >
                {
                    props.markerPosition.map((el, idx) => {
                        return (
                            // <Marker
                            //     key={idx}
                            //     position={{ lat: el.lat, lng: el.lng }}

                            // >
                            //     {/* <InfoBox
                            //         options={{ closeBoxURL: ``, enableEventPropagation: true }}
                            //     >
                            //         <Box style={{ backgroundColor: `#fff`, padding: `20px` }}>
                            //             <Box style={{ fontSize: `16px`, color: `#08233B` }}>
                            //                 {el.title}
                            //             </Box>
                            //         </Box>
                            //     </InfoBox> */}

                            // </Marker>
                            <MarkerWithLabel
                                key={idx}
                                position={{ lat: el.lat, lng: el.lng }}
                                labelAnchor={new google.maps.Point(180, 350)}
                                labelStyle={{ backgroundColor: "transperent", padding: "50px" }}
                            >

                                <Box boxShadow='rgb(0 0 0 / 28%) 0px 8px 28px' width='250px' bg='#fff' borderRadius='12px' p='20px'>
                                    <NextLink href='/house/[id]' as={`/house/${el.id}`}>
                                        <Box pos='relative' h='150px' overflow='hidden'>
                                            <Image w='100%' h='100%' objectFit='cover' src={`http://localhost:4000/images/${el.id}/${el.img}`} alt={el.title} />
                                        </Box>
                                    </NextLink>
                                    <Text isTruncated my='10px' fontSize='20px'>
                                        {el.title}
                                    </Text>
                                    <Text fontWeight='500' fontSize='18px'>
                                        {el.price} / ночь
                                    </Text>
                                </Box>


                            </MarkerWithLabel>
                        );
                    })
                }
            </MarkerClusterer>
        </GoogleMap>
    )
}
);



const SearchListing: React.FC<SearchListingProps> = ({ }) => {
    const router = useRouter();
    const searchParams = useGetSearchParamsFromUrl();
    if (searchParams === -1) {
        return (<Box>
            Такого дома не существует!
        </Box>);
    }
    let obj = JSON.parse(searchParams);


    const { data: listingsData, loading: loadingListings } = useSearchListingsQuery({
        variables: { input: { city: obj.city, country: obj.country, state: obj.state, street: obj.street, guests_count: obj.guests_count } },
        notifyOnNetworkStatusChange: true,
    });

    let massiveOfLatLng: Array<DefaultCenter> = [];
    let dataList;
    if (((listingsData?.searchListings?.length === 0) || (listingsData?.searchListings === undefined) || (listingsData.searchListings === null)) && loadingListings) {
        dataList = <><Spinner /></>
    } else if (((listingsData?.searchListings?.length === 0) || (listingsData?.searchListings === undefined) || (listingsData.searchListings === null)) && !loadingListings) {
        dataList = <Box fontSize='20px'>Ничего не найдено </Box>
    } else {
        listingsData?.searchListings?.map(el => {
            massiveOfLatLng.push({ lat: el.latitude, lng: el.longitude, title: el.title, price: el.price, id: el.userId, img: el.pictureUrl[0] });
        });
        dataList = <ListOfHouses listingsData={listingsData} searchComponent={true} />
    }




    return (
        <Layout>
            <Wrapper variant='infinite'>
                <Box pos='relative'>
                    <Flex flexDir='column' w='45vw' overflow='auto' height='calc(100vh - 68px)' padding='20px'>
                        {/* <Text fontSize='md'>{listingsData?.searchListings?.length && `${listingsData?.searchListings?.length} вариантов жилья`} {obj.guests_count && ` · ${obj.guests_count} гостей`}</Text> */}
                        <Text fontSize='4xl' mb='40px'>Результаты поиска</Text>
                        {dataList}
                    </Flex>
                    <Box pos='absolute' width='calc(100% - 45vw)' left='auto' top='0' right='0' height='calc(100vh - 68px)'>
                        <MapWithAMarker
                            containerElement={<div style={{ height: `100%` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            defaultCenter={massiveOfLatLng}
                            markerPosition={massiveOfLatLng}
                        />
                    </Box>
                </Box>
            </Wrapper>
        </Layout>
    );
}

export default withApollo({ ssr: true })(SearchListing);