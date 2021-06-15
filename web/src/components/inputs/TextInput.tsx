import { FormControl, FormLabel, Box, FormErrorMessage, Input, FormControlProps, Textarea } from '@chakra-ui/react';
import { FastField, Field } from 'formik';
import React from 'react'

export interface TextInputProps extends FormControlProps {
    name: string;
    label?: string;
    description?: string;
    options?: string[];
    preLabel?: string;
    textarea?: boolean;
    smallSize?: boolean;
    array?: Array<{ id: number, name: string, description?: string }>;
    getRoomType?: (val: number) => void;
    type?: string;
    placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ name, label, description, textarea, smallSize, type, ...rest }) => {
    return (
        <FastField name={name}>
            {({ field, form }: any) => {
                return (
                    <FormControl isInvalid={form.errors[name] && form.touched[name]}>
                        <FormLabel fontWeight={smallSize ? '500' : 'bold'} fontSize={smallSize ? '1rem' : 'xl'} htmlFor={name}>{label}</FormLabel>
                        {description && <Box fontSize='lg' opacity='.9' mb={5}>{description}</Box>}
                        {!textarea ? <Input id={name} type={type} {...rest} {...field} /> : <Textarea minHeight='200px' id={field.name} {...rest} {...field} />}
                        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                    </FormControl>
                );
            }}
        </FastField>
    );
}

export default TextInput