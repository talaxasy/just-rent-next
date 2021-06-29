import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { FastField, FieldProps } from 'formik';
import React, { useRef } from 'react'
import Geosuggest, { Suggest } from 'react-geosuggest';

import { Flex, FormControl, FormControlProps, FormErrorMessage, FormLabel } from '@chakra-ui/react';



// lat: -34.397, lng: 150.644

interface State {
    defaultCenter: DefaultCenter | null
}

interface DefaultCenter {
    lat: number,
    lng: number
}

interface LocationFieldProps extends FormControlProps {
    setValues: (values: React.SetStateAction<any>, shouldValidate?: boolean) => void;
    values: any;
    name: string;
    label?: string;
    description?: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

class SearchInput extends React.PureComponent<LocationFieldProps> {

    onSuggestSelect = (place: Suggest | undefined) => {
        if (place) {

            const { location: { lat, lng } } = place;
            const { values, setValues, setFieldValue } = this.props;

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
                country,
                lat, lng,
                street,
                city,
                state,
                apartment,
            });


        }


    }

    render() {

        const { description, label, ...rest } = this.props;

        return (
            <FormControl>
                <Input
                    as={Geosuggest}
                    onSuggestSelect={this.onSuggestSelect}
                    {...rest}
                    onChange={(e) => {

                    }}
                />
            </FormControl>
        );
    }
}

export default SearchInput;