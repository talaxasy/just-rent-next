import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { FastField, FieldProps } from 'formik';
import React from 'react'
import Geosuggest, { Suggest } from 'react-geosuggest';
import { FormValues } from '../pages/create-house';

import { Flex, FormControl, FormControlProps, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { TextInputProps } from './inputs/TextInput';




// lat: -34.397, lng: 150.644




interface State {
    defaultCenter: DefaultCenter | null
}

interface DefaultCenter {
    lat: number,
    lng: number
}

interface LocationFieldProps {
    setValues: (values: React.SetStateAction<any>, shouldValidate?: boolean) => void;
    values: any;
    name: string;
    label?: string;
    description?: string;
    getDefaultCenter: (val: DefaultCenter | null) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

class LocationField extends React.PureComponent<LocationFieldProps, State> {

    state: State = {
        defaultCenter: null
    }

    onSuggestSelect = (place: Suggest | undefined) => {
        if (place) {
            const { location: { lat, lng } } = place;
            const { values, setValues, getDefaultCenter, setFieldValue } = this.props;



            let country = '';
            let city = '';
            let state = '';
            let street = '';
            let apartment = '';

            if (place.gmaps) {
                for (let i = 0; i < place.gmaps.address_components.length; i++) {
                    for (let j = 0; j < place.gmaps.address_components[i].types.length; j++) {
                        if (place.gmaps.address_components[i].types[j] == "country")
                            country = place.gmaps.address_components[i].long_name
                    }
                }
                for (let i = 0; i < place.gmaps.address_components.length; i++) {
                    for (let j = 0; j < place.gmaps.address_components[i].types.length; j++) {
                        if (place.gmaps.address_components[i].types[j] == "locality")
                            city = place.gmaps.address_components[i].long_name
                    }
                }
                for (let i = 0; i < place.gmaps.address_components.length; i++) {
                    for (let j = 0; j < place.gmaps.address_components[i].types.length; j++) {
                        if (place.gmaps.address_components[i].types[j] == ('sublocality_level_1' || 'sublocality' || 'administrative_area_level_1'))
                            state = place.gmaps.address_components[i].long_name
                    }
                }
                for (let i = 0; i < place.gmaps.address_components.length; i++) {
                    for (let j = 0; j < place.gmaps.address_components[i].types.length; j++) {
                        if (place.gmaps.address_components[i].types[j] == "route")
                            street = place.gmaps.address_components[i].long_name
                    }
                }
                for (let i = 0; i < place.gmaps.address_components.length; i++) {
                    for (let j = 0; j < place.gmaps.address_components[i].types.length; j++) {
                        if (place.gmaps.address_components[i].types[j] == "street_number")
                            apartment = place.gmaps.address_components[i].long_name
                    }
                }
            }

            setValues({
                ...values,
                longitude: lng,
                latitude: lat,
                street: street,
            });

            this.setState({
                defaultCenter: {
                    lat,
                    lng,
                }
            });

            getDefaultCenter(this.state.defaultCenter);

            setFieldValue('country', country);
            setFieldValue('city', city);
            setFieldValue('state', state);
            setFieldValue('apartment', apartment);


        }
    }

    render() {

        const { description, label } = this.props;

        return (
            <FormControl>
                <FormLabel fontWeight='500' fontSize='1rem'>{label}</FormLabel>
                {description && <Box fontSize='lg' opacity='.9' mb={5}>{description}</Box>}
                <Flex flexDirection='column'>
                    <Input
                        as={Geosuggest}
                        placeholder="Улица"
                        onSuggestSelect={this.onSuggestSelect}
                    />
                    {/* <Box>longitude: {values.longitude}</Box>
                <Box>latitude: {values.latitude}</Box> */}

                </Flex>
                {/* <FormErrorMessage>{form.errors[name]}</FormErrorMessage> */}
            </FormControl>
        );
    }
}

export default LocationField