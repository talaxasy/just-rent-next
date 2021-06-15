import { FormControl, FormLabel, Box, Input, Text, Textarea, FormErrorMessage, Select, Flex } from '@chakra-ui/react';
import { FastField, Field } from 'formik';
import React, { useState } from 'react'
import { TextInputProps } from './TextInput';

const SelectInput: React.FC<TextInputProps> = ({ name, label, array, getRoomType, ...rest }) => {
    const [objData, setObjData] = useState(array?.find(el => el.id === 1));
    return (
        <FastField name={name}>
            {({ field, form }: any) => {
                return (
                    <FormControl isInvalid={form.errors[name] && form.touched[name]}>
                        <FormLabel htmlFor={name}>{label}</FormLabel>
                        <Select id={name} {...field} onChange={(e) => {
                            form.setFieldValue(field.name, parseInt(e.target.value, 10));
                            if (getRoomType) {
                                getRoomType(parseInt(e.target.value, 10));
                            }
                            setObjData(array?.find(el => el.id === parseInt(e.target.value, 10)));

                        }} {...rest}  >
                            {array?.map(el => (
                                <option key={el.id} value={el.id}>
                                    {el.name}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                        {objData?.description && <Box fontSize='12px' opacity='.8' mt={5}>{'' + objData.name + ': ' + objData.description}</Box>}
                    </FormControl>
                );
            }}
        </FastField>
    );
}

export default SelectInput;