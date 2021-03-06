import { Box, Button, Divider, Flex, Text, FormControl, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Switch, useNumberInput, Spinner } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import FormikControl from '../components/FormikControl';
import InputFieldProps from '../components/InputFieldProps';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { useCreateHouseMutation, useDefaultAmenitiesQuery, useDefaultHouseTypesQuery, useDefaultRoomTypesQuery, useDefaultRulesQuery, useSafetyAmenitiesQuery } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useIsAuth } from '../utils/useIsAuth';
import { withApollo } from '../utils/withApollo';
import * as Yup from 'yup';
import {
    CheckboxContainer,
    CheckboxControl,
} from "formik-chakra-ui";
import CountInput from '../components/inputs/CountInput';
import TextInput from '../components/inputs/TextInput';
import SwitchInput from '../components/inputs/SwitchInput';
import { getDefaultEntities } from '../utils/getDefaultEntities';
import DropZoneField from '../components/inputs/DropZoneField';
import LocationField from '../components/LocationField';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import { canBecameArendator } from '../utils/canBecameArendator';




export interface FormValues {
    title: string,
    description: string,
    country: string,
    street: string,
    city: string,
    state: string,
    apartment: string,
    zip: string,
    bed_count: number,
    bedroom_count: number,
    bathroom_count: number,
    guests_count: number,
    booking_can_advance_checker: boolean,
    booking_can_advance_time: string,
    price: number,
    booking_min: number,
    booking_max: number,
    amenities: string[],
    rules: string[],
    safety_amenities: string[],
    disability: boolean,
    avalible_dates: string[],
    address: string,
    longitude: number,
    latitude: number,
    house_typeId: number,
    room_typeId: number,
    booking_before: string,
    availability_arrivals_start: string,
    availability_arrivals_end: string,
    file: SteroidsFileType[] | null,
}

interface SteroidsFileType extends File {
    preview: string;
}

interface DefaultCenter {
    lat: number,
    lng: number
}

const MapWithAMarker = withGoogleMap<{
    defaultCenter: DefaultCenter,
    onClick: (e: google.maps.KmlMouseEvent) => void,
    markerPosition: DefaultCenter,
}>(props =>
    <GoogleMap
        defaultZoom={17}
        defaultCenter={props.defaultCenter}
        center={props.defaultCenter}
        onClick={props.onClick}
    >
        <Marker
            position={props.markerPosition}
        />
    </GoogleMap>
);

const CreateHouse: React.FC = ({ }) => {
    useIsAuth();

    const router = useRouter();
    const { data: defaultAmenities, loading: loadingAmenities } = useDefaultAmenitiesQuery();
    const { data: defaultRules, loading: loadingRules } = useDefaultRulesQuery();
    const { data: defaultHouseTypes, loading: loadingHouse } = useDefaultHouseTypesQuery();
    const { data: defaultRoomTypes, loading: loadingRoom } = useDefaultRoomTypesQuery();
    const { data: safetyAmenities, loading: loadingSafety } = useSafetyAmenitiesQuery();
    const [createHouse] = useCreateHouseMutation();
    const [roomType, setRoomType] = useState(1);
    const [defaultCenterForeign, setDefaultCenterForeign] = useState<DefaultCenter | null>(null);

    const getRoomType = (val: number) => {
        setRoomType(val);
    }

    const getDefaultCenter = (val: DefaultCenter | null) => {
        setDefaultCenterForeign(val);
    }


    let defHouseTypes: Array<{ id: number, name: string, description: string }> = [];
    let defRoomTypes: Array<{ id: number, name: string, description: string }> = [];
    let defAmenities: Array<{ name: string, description: string }> = [];
    let defRules: Array<{ name: string, description: string }> = [];
    let safAmenities: Array<{ name: string, description: string }> = [];

    defaultHouseTypes?.defaultHouseTypes.map((el) => {
        defHouseTypes.push({ id: el.id, name: el.name, description: el.description });
    });
    defaultRoomTypes?.defaultRoomTypes.map((el) => {
        defRoomTypes.push({ id: el.id, name: el.name, description: el.description });
    });
    defaultAmenities?.defaultAmenities.map((el) => {
        defAmenities.push({ name: el.name, description: el.description });
    });
    defaultRules?.defaultRules.map((el) => {
        defRules.push({ name: el.name, description: el.description });
    });
    safetyAmenities?.safetyAmenities.map((el) => {
        safAmenities.push({ name: el.name, description: el.description });
    });

    const validationSchema = Yup.object({
        amenities: Yup.array().min(1, '???????????? ???????? ?????????????? ???????? ????????????????'),
        title: Yup.string().min(5, '?????????? ???????????????? ???????????? ???????? ?????????????? 5 ??????????????????').required('?????? ???????? ??????????????????????'),
    });




    const initialValues: FormValues = {
        title: '',
        description: '',
        country: '',
        street: '',
        city: '',
        state: '',
        apartment: '',
        zip: '',
        bed_count: 1,
        bedroom_count: 1,
        bathroom_count: 1,
        guests_count: 1,
        booking_can_advance_checker: false,
        booking_can_advance_time: '',
        price: 0,
        booking_min: 0,
        booking_max: 0,
        amenities: [],
        rules: [],
        safety_amenities: [],
        disability: false,
        avalible_dates: [],
        address: '',
        longitude: 0,
        latitude: 0,
        house_typeId: 1,
        room_typeId: 1,
        booking_before: '',
        availability_arrivals_start: '',
        availability_arrivals_end: '',
        file: null,
    };



    return (
        <>
            <Layout>
                <Wrapper variant='average'>
                    <Box mx='auto' w='fit-content' fontSize='26px' fontWeight='bold' my={10}>???????????????????? ???????????? ??????????</Box>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setErrors }) => {
                            if (roomType === 3) {
                                values.bedroom_count = 0;
                            }

                            if (values.file?.length === 0) {
                                values.file = null;
                            }
                            values.price = parseInt('' + values.price, 10) ? parseInt('' + values.price, 10) : 1;

                            const resp = await createHouse({
                                variables: { input: values },
                                update: (cache) => {
                                    cache.evict({
                                        fieldName: 'houses:{}'
                                    })
                                }
                            });
                            if (resp.data?.createHouse.errors) {
                                setErrors(toErrorMap(resp.data.createHouse.errors));
                                console.log(resp.data.createHouse.errors);
                            } else if (resp.data?.createHouse.house) {
                                console.log(resp.data.createHouse.house);
                                router.push('/');
                            }
                            console.log(values);
                        }}>
                        {({ isSubmitting, values, setFieldValue, setValues }) => (
                            <Form style={{ position: 'relative', marginBottom: '30px' }}>
                                <Flex flexDirection='column'>
                                    <Flex>
                                        <FormikControl
                                            control='input'
                                            name='title'
                                            label='???????????????? ????????????????????'
                                            placeholder='????????????????'
                                            description='???????????? ?????????????????? ????????????????, ???????????????????? ???????????????????????? ??????????'
                                        />
                                    </Flex>
                                    <Box h={5}></Box>
                                    <Flex>
                                        <FormikControl
                                            control='input'
                                            name='description'
                                            placeholder='???????????????????? ???????????? ?? ??????????'
                                            label='???????????????????? ???????????? ?? ??????????'
                                            description='????????????????????, ?????? ?????????????????? ?????? ??????????, ?? ?????????????? ?????????????????????? ??????????, ???????????????? ?????????????? Wi-Fi ?????? ????????????????.'
                                            textarea={true}
                                        />
                                    </Flex>
                                    <Divider my={10} />
                                    <DropZoneField
                                        name='file'
                                        setFieldValue={setFieldValue}
                                        label='?????????????? ???????????????????? ?? ?????????????? ????????'
                                        description='???????????????? ?????????????????? ?????? ??????????????????????????. ?????? ???????????????????? ???????????????????? ?????????? ???????? ???? ???????? ????????. ???????????????????????? ??????????????????????, ???????????????????? ???? ?? ???????????? ??????????????. ?????????????????????????????? ???????? ?????? ???????????????? ?????????? ?????????? ??????????.'
                                    />

                                    <Divider my={10} />
                                    <Text fontSize='xl' fontWeight='bold' mb='40px'>?????????? ?????????? ???? ?????????????</Text>
                                    <Flex>
                                        {!loadingHouse ? <FormikControl
                                            control='select'
                                            name='house_typeId'
                                            label='???????????????? ?????? ??????????'
                                            array={defHouseTypes}
                                        /> : <Spinner />}

                                        <Box w={20}></Box>
                                        {!loadingRoom ? <FormikControl
                                            control='select'
                                            name='room_typeId'
                                            label='?????????? ??????????'
                                            array={defRoomTypes}
                                            getRoomType={getRoomType}
                                        /> : <Spinner />}

                                    </Flex>
                                    <Divider my={10} />
                                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
                                    <Flex>
                                        <FormikControl
                                            control='input'
                                            smallSize={true}
                                            name='country'
                                            placeholder='????????????'
                                            label='????????????'
                                        />
                                        <Box w={20}></Box>
                                        {/* <FormikControl
                                            control='input'
                                            smallSize={true}
                                            name='street'
                                            placeholder='??????????'
                                            label='??????????'
                                        /> */}
                                        <LocationField
                                            name='tmp'
                                            label='??????????'
                                            values={values}
                                            setValues={setValues}
                                            getDefaultCenter={getDefaultCenter}
                                            setFieldValue={setFieldValue}
                                        />
                                    </Flex>
                                    <Box my={3}></Box>
                                    <Flex>
                                        <FormikControl
                                            control='input'
                                            smallSize={true}
                                            name='apartment'
                                            placeholder='????????????????'
                                            label='????????????????/????????????'
                                        />
                                        <Box w={20}></Box>
                                        <FormikControl
                                            control='input'
                                            smallSize={true}
                                            name='state'
                                            placeholder='????????'
                                            label='????????/????????????'
                                        />
                                    </Flex>
                                    <Box my={3}></Box>
                                    <Flex mb='40px'>
                                        <FormikControl
                                            control='input'
                                            smallSize={true}
                                            name='city'
                                            placeholder='??????????'
                                            label='??????????'
                                        />
                                        <Box w={20}></Box>
                                        <FormikControl
                                            control='input'
                                            smallSize={true}
                                            name='zip'
                                            placeholder='???????????????? ????????????'
                                            label='???????????????? ????????????'
                                        />
                                    </Flex>
                                    {defaultCenterForeign &&
                                        <MapWithAMarker
                                            containerElement={<div style={{ height: `400px` }} />}
                                            mapElement={<div style={{ height: `100%` }} />}
                                            defaultCenter={defaultCenterForeign}
                                            markerPosition={{ lat: values.latitude, lng: values.longitude }}
                                            onClick={async (x) => {
                                                const lat = x.latLng?.lat();
                                                const lng = x.latLng?.lng();

                                                let country = '';
                                                let city = '';
                                                let state = '';
                                                let street = '';
                                                let apartment = '';

                                                if (lat && lng) {

                                                    // let placeFromLarLng: any = null;
                                                    let geocoder = new google.maps.Geocoder();
                                                    const placeFrom = await geocoder.geocode({
                                                        location: new google.maps.LatLng(lat, lng)
                                                    }, function (results, status) {
                                                        if (status == google.maps.GeocoderStatus.OK && results) {
                                                            return results;
                                                        }
                                                    });

                                                    let placeFromLarLng = placeFrom?.results[0];


                                                    if (placeFromLarLng) {
                                                        for (let i = 0; i < placeFromLarLng.address_components.length; i++) {
                                                            for (let j = 0; j < placeFromLarLng.address_components[i].types.length; j++) {
                                                                if (placeFromLarLng.address_components[i].types[j] == "country")
                                                                    country = placeFromLarLng.address_components[i].long_name
                                                            }
                                                        }
                                                        for (let i = 0; i < placeFromLarLng.address_components.length; i++) {
                                                            for (let j = 0; j < placeFromLarLng.address_components[i].types.length; j++) {
                                                                if (placeFromLarLng.address_components[i].types[j] == "locality")
                                                                    city = placeFromLarLng.address_components[i].long_name
                                                            }
                                                        }
                                                        for (let i = 0; i < placeFromLarLng.address_components.length; i++) {
                                                            for (let j = 0; j < placeFromLarLng.address_components[i].types.length; j++) {
                                                                if (placeFromLarLng.address_components[i].types[j] == ('sublocality_level_1' || 'sublocality' || 'administrative_area_level_1'))
                                                                    state = placeFromLarLng.address_components[i].long_name
                                                            }
                                                        }
                                                        for (let i = 0; i < placeFromLarLng.address_components.length; i++) {
                                                            for (let j = 0; j < placeFromLarLng.address_components[i].types.length; j++) {
                                                                if (placeFromLarLng.address_components[i].types[j] == "route")
                                                                    street = placeFromLarLng.address_components[i].long_name
                                                            }
                                                        }
                                                        for (let i = 0; i < placeFromLarLng.address_components.length; i++) {
                                                            for (let j = 0; j < placeFromLarLng.address_components[i].types.length; j++) {
                                                                if (placeFromLarLng.address_components[i].types[j] == "street_number")
                                                                    apartment = placeFromLarLng.address_components[i].long_name
                                                            }
                                                        }
                                                    }


                                                    setValues({
                                                        ...values,
                                                        longitude: lng,
                                                        latitude: lat,
                                                        street
                                                    });
                                                    setFieldValue('country', country);
                                                    setFieldValue('city', city);
                                                    setFieldValue('state', state);
                                                    setFieldValue('apartment', apartment);
                                                }
                                            }}
                                        />
                                    }
                                    <Divider my={10} />
                                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
                                    <Flex flexDirection='column'>
                                        {/* <FormControl isInvalid={!!error}>
                                            <FormLabel htmlFor={field.name}>{label}</FormLabel>
                                            <HStack maxW="320px">
                                                <Button {...dec}>-</Button>
                                                <Input id={ } {...input} />
                                                <Button {...inc}>+</Button>
                                            </HStack>
                                        </FormControl> */}
                                        {/* <Box mt={10}></Box> */}
                                        {/* <InputFieldProps
                                            name='guests_count'
                                            label='?????????????? ???????????? ?????????????? ???????? ???????????'
                                            typeField='count'
                                            markForCount='guests'
                                            description='?? ?????????????? ?????????? ???????????? ???????? ???????? ???????????????????? ???????????????? ??????????.'
                                            prelabel='??????????'
                                        /> */}
                                        <Text fontSize='xl' mb='5px' fontWeight='bold' >?????????????? ???????????? ?????????????? ???????? ???????????</Text>
                                        <Text fontSize='lg' mb='30px' opacity='.9'>?? ?????????????? ?????????? ???????????? ???????? ???????? ???????????????????? ???????????????? ??????????.</Text>
                                        <FormikControl
                                            control='count'
                                            name='guests_count'
                                            label='?????????????????? ?????????????????? ?????????? ???????????????????????? ???????????'
                                            preLabel='??????????'
                                            maxW='100px'
                                        />
                                        <Box mt={10}></Box>
                                        <FormikControl
                                            control='count'
                                            name='bed_count'
                                            label='?????????????????? ?????????????????? ?????????? ???????????????????????? ???????????'
                                            preLabel='??????????????'
                                            maxW='100px'
                                        />


                                        {roomType !== 3 ? <>
                                            <Box mt={10}></Box>
                                            <FormikControl
                                                control='count'
                                                name='bedroom_count'
                                                label='?????????????????? ?????????????????? ?????????? ???????????????????????? ???????????'
                                                preLabel='??????????????'
                                                maxW='100px'
                                            />
                                        </> : null}

                                    </Flex>
                                    <Divider my={10} />
                                    <Flex>
                                        <FormikControl
                                            control='count'
                                            name='bathroom_count'
                                            label='???????????????????? ?????????????? ????????????'
                                            preLabel='?????????????? ??????????????'
                                            maxW='100px'
                                        />
                                    </Flex>
                                    <Divider my={10} />
                                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
                                    <Flex>
                                        <Box w='55%'>
                                            {!loadingAmenities ? <CheckboxContainer stackProps={{ pl: 0, mt: 0, spacing: 5 }} variant='teal' name="amenities">
                                                <Text fontSize='xl' fontWeight='bold'>
                                                    ?????????? ???????????????? ???? ???????????????????????
                                                </Text>
                                                <Text mb='20px' fontSize='lg' opacity='.9'>
                                                    ?????????? ???????????? ???????????????????????? ???? ?????? ????????????????, ???? ?????????? ???????????????????? ?????????? ???????????????? ????????????.
                                                </Text>
                                                {
                                                    defAmenities ? defAmenities.map(el => {
                                                        return <CheckboxControl
                                                            key={el.name}
                                                            display='flex'
                                                            alignItems='flex-start'
                                                            colorScheme='teal'
                                                            size="lg"
                                                            name="amenities"
                                                            value={el.name}
                                                        >
                                                            <Box pl='10px'>
                                                                <Text lineHeight='1.4' mt='-3px' >{el.name}</Text>
                                                                {el.description ? <span style={{
                                                                    fontSize: '14px',
                                                                    opacity: '.9',
                                                                    lineHeight: '1.2',
                                                                    display: 'inline-flex'
                                                                }}>{el.description}</span> : null}
                                                            </Box>
                                                        </CheckboxControl>
                                                    }) : <Box>?????? ????, ?????????? ??????-???? ?????????? ?????? ??????</Box>
                                                }
                                            </CheckboxContainer> : <Spinner />}

                                        </Box>
                                        <Box w='50px' />
                                        <Box w='45%'>
                                            {!loadingSafety ? <CheckboxContainer mb='50px' stackProps={{ pl: 0, mt: 0, spacing: 5 }} variant='teal' name="safety_amenities">
                                                <Text fontSize='xl' mb='20px' fontWeight='bold'>
                                                    ???????????????????????? ?????? ????????????????????????
                                                </Text>
                                                {
                                                    safAmenities ? safAmenities.map(el => {
                                                        return <CheckboxControl
                                                            key={el.name}
                                                            colorScheme='teal'
                                                            display='flex'
                                                            alignItems='flex-start'
                                                            size="lg"
                                                            name="safety_amenities"
                                                            value={el.name}
                                                        >
                                                            <Box pl='10px'>
                                                                <Text lineHeight='1.4' mt='-3px'>{el.name}</Text>
                                                                {el.description ? <span style={{
                                                                    fontSize: '14px',
                                                                    opacity: '.9',
                                                                    lineHeight: '1.2',
                                                                    display: 'inline-flex'
                                                                }}>{el.description}</span> : null}
                                                            </Box>

                                                        </CheckboxControl>
                                                    }) : <Box>?????? ????, ?????????? ??????-???? ?????????? ?????? ??????</Box>
                                                }
                                            </CheckboxContainer> : <Spinner />}

                                            {!loadingRules ? <CheckboxContainer stackProps={{ pl: 0, mt: 0, spacing: 5 }} variant='teal' name="rules">
                                                <Text fontSize='xl' mb='20px' fontWeight='bold'>
                                                    ?????????????? ????????
                                                </Text>
                                                {
                                                    defRules ? defRules.map(el => {
                                                        return <CheckboxControl
                                                            key={el.name}
                                                            colorScheme='teal'
                                                            display='flex'
                                                            alignItems='flex-start'
                                                            size="lg"
                                                            name="rules"
                                                            value={el.name}
                                                        >
                                                            <Box pl='10px'>
                                                                <Text lineHeight='1.4' mt='-3px'>{el.name}</Text>
                                                                {el.description ? <span style={{
                                                                    fontSize: '14px',
                                                                    opacity: '.9',
                                                                    lineHeight: '1.2',
                                                                    display: 'inline-flex'
                                                                }}>{el.description}</span> : null}
                                                            </Box>

                                                        </CheckboxControl>
                                                    }) : <Box>?????? ????, ?????????? ??????-???? ?????????? ?????? ??????</Box>
                                                }
                                            </CheckboxContainer> : <Spinner />}
                                        </Box>
                                    </Flex>
                                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
                                    <Divider my={10} />
                                    <Flex flexDir='column'>
                                        <Text fontSize='xl' fontWeight='bold' mb='10px'>
                                            ?????????? ???????????????? ???????????????????? ?????? ?????????? ?? ?????????????? ???????????????????????????
                                        </Text>
                                        <Text fontSize='lg' mb='20px' opacity='.9'>
                                            ???????????? ?????????? ???????????? ???????????? ???????? ?????????? ?? ???????????????????? ?????? ?????????? ?? ?????????????? ??????????????????????????. ???????????????? ????, ?????????? ???????????????? ???????????????? ?? ???????????????????? ?? ?????????????? ?????????????????????? ?????????? ???????????????????? ?????? ????????.
                                            <br /><br />
                                            ?????????????????????? ????????????????????. ???????????????? ?????? ?????????? ?? ?????????????? ?????????????????????????? ???????????????? ??????????. ???? ???????????????? ???? ???????? ?? ??????????????????, ?????? ???? ????????????????????????????????.
                                        </Text>
                                        <FormikControl
                                            control='switch'
                                            colorScheme="teal"
                                            size="lg"
                                            name="disability"
                                            label="?????????????????? ???? ?????????????????? ?????? ?????????? ?? ?????????????? ??????????????????????????"
                                        />
                                    </Flex>
                                    <Divider my={10} />
                                    <Flex flexDir='column'>
                                        <Text fontSize='xl' fontWeight='bold' mb='10px'>?????????????? ???????? ??????????</Text>
                                        <Text fontSize='lg' mb='10px'>???????????????????? ?????????????? ???????? ?????? ???????????? ????????</Text>
                                        <Text fontSize='md' opacity='.8' mb='20px'>?? ????????, ?????????????????????????? ????????????????, ?????????????????????? 14% ?????????? ???? ????????????, ???? ???????????? ?????? ?????????? ?????????????? ???? ?????????????????????????????????? ??????????????.</Text>
                                        <FormikControl
                                            control='input'
                                            name='price'
                                            label='?????????????? ????????'
                                            description='?????? ???????? ???????? ???? ??????????????????.'
                                            sightInput={true}
                                            maxW='250px'
                                        />
                                    </Flex>
                                </Flex>
                                <Button colorScheme='teal' maxWidth='300px' mt='40px' mx='auto' w="100%" h='50px' fontSize='xl' isLoading={isSubmitting} type='submit'>????????????????</Button>
                                {/* <pre style={{ userSelect: 'none', position: 'fixed', top: 0, right: 0, fontSize: '12px' }}>
                                    {JSON.stringify(values, null, 2)}
                                </pre> */}
                            </Form>
                        )}
                    </Formik>
                </Wrapper>
            </Layout>
        </>
    );
}

export default withApollo({ ssr: false })(CreateHouse);