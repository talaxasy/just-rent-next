import { Box, Button, Checkbox, CheckboxGroup, ComponentWithAs, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputProps, Select, Textarea, TextareaProps, useControllableState } from '@chakra-ui/react';
import React, { InputHTMLAttributes, useEffect, useState } from 'react'
import { useField } from 'formik'

//HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

type InputFieldProps = InputHTMLAttributes<any> & {
    name: string;
    label: string;
    typeField?: 'input' | 'textarea' | 'select' | 'count' | 'checkbox' | null | undefined;
    selectArr?: Array<number | string>;
    markForCount?: 'guests' | 'bedrooms' | 'beds' | 'baths';
    description?: string;
    prelabel?: string;
    updateDataRoomType?: (val: string) => void
};

const InputFieldProps: React.FC<InputFieldProps> = ({ updateDataRoomType, size: _, label, typeField, selectArr, markForCount, description, prelabel, ...props }) => {
    const [field, { error, value }] = useField(props);
    const [val, setVal] = useState('hello');
    if (updateDataRoomType) {
        updateDataRoomType(val);
    }

    const [guests, setGuests] = useState(1);
    const [internalGuests, setInternalGuests] = useControllableState({
        value: guests,
        onChange: setGuests,
    })

    const [bedrooms, setBedrooms] = useState(1);
    const [internalBedrooms, setInternalBedrooms] = useControllableState({
        value: bedrooms,
        onChange: setBedrooms,
    })

    const [beds, setBeds] = useState(1);
    const [internalBeds, setInternalBeds] = useControllableState({
        value: beds,
        onChange: setBeds,
    })

    const [baths, setBaths] = useState(1);
    const [internalBaths, setInternalBaths] = useControllableState({
        value: baths,
        onChange: setBaths,
    })


    const checkMinMax = (mark: string, fieldC: string) => {

        switch (fieldC) {
            case 'guests':
                if (mark === '+' && guests >= 1 && guests <= 9) {
                    setInternalGuests(guests + 1)
                } else if (mark === '-' && guests >= 2 && guests <= 10) {
                    setInternalGuests(guests - 1)
                }
                { field.value = guests }
                break;
            case 'bedrooms':
                if (mark === '+' && bedrooms >= 1 && bedrooms <= 9) {
                    setInternalBedrooms(bedrooms + 1)
                } else if (mark === '-' && bedrooms >= 2 && bedrooms <= 10) {
                    setInternalBedrooms(bedrooms - 1)
                }
                { field.value = bedrooms }
                break;
            case 'beds':
                if (mark === '+' && beds >= 1 && beds <= 9) {
                    setInternalBeds(beds + 1)
                } else if (mark === '-' && beds >= 2 && beds <= 10) {
                    setInternalBeds(beds - 1)
                }
                { field.value = beds }
                break;
            case 'baths':
                if (mark === '+' && baths >= 1 && baths <= 9) {
                    setInternalBaths(baths + 1)
                } else if (mark === '-' && baths >= 2 && baths <= 10) {
                    setInternalBaths(baths - 1)
                }
                { field.value = baths }
                break;
            default:
                break;
        }
    }

    let internalComponent: number;
    switch (markForCount!) {
        case 'guests':
            internalComponent = internalGuests;
            break;
        case 'bedrooms':
            internalComponent = internalBedrooms;
            break;
        case 'beds':
            internalComponent = internalBeds;
            break;
        case 'baths':
            internalComponent = internalBaths;
            break;
        default:
            break;
    }



    const renderSwitch = (typeF: any) => {
        switch (typeF) {
            case 'checkbox':
                return (
                    <CheckboxGroup defaultValue={['Wifi']}>
                        <Flex flexDirection='column'>
                            {selectArr?.map((el, idx) => {
                                return <Checkbox colorScheme='teal' size="lg" name={field.name} key={idx} value={el.toString()}>{el}</Checkbox>
                            })}
                        </Flex>
                    </CheckboxGroup>
                );
            case 'count':
                return (

                    <Box id={field.name} display='flex' alignItems='center'>
                        {prelabel && <Box mr={75}>{prelabel}:</Box>}
                        <Button onClick={() => checkMinMax('+', markForCount!)}>+</Button>
                        <Box as="span" px={3} mx="24px">
                            {internalComponent}
                        </Box>
                        <Button onClick={() => checkMinMax('-', markForCount!)}>-</Button>
                    </Box>

                );
            case 'select':
                return (
                    <Select {...field} {...props} id={field.name} isRequired>
                        {selectArr?.map((el, idx) => {
                            return <option key={idx} value={el.toString()}>{el}</option>
                        })}

                    </Select>
                );
            case 'textarea':
                return <Textarea {...field} {...props} id={field.name} />;
            default:
                return <Input {...field} {...props} id={field.name} />;
        }
    }

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            {description && <Box fontSize='14px' opacity='.8' mb={5}>{description}</Box>}
            {renderSwitch(typeField)}
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}

export default InputFieldProps