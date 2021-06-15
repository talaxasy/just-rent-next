import { FormControl, FormLabel, Box, Input, Textarea, FormErrorMessage, Switch } from '@chakra-ui/react';
import { FastField, Field } from 'formik';
import React from 'react';
import { TextInputProps } from './TextInput';

const SwitchInput: React.FC<TextInputProps> = ({ name, label, description, textarea, ...rest }) => {
    return (
        <FastField name={name}>
            {({ field, form }: any) => {
                return (
                    <FormControl display='flex' alignItems='center' isInvalid={form.errors[name] && form.touched[name]}>
                        <FormLabel fontSize='18px' mr='25px' htmlFor={name}>{label}</FormLabel>
                        {description && <Box fontSize='14px' opacity='.8' mb={5}>{description}</Box>}
                        <Switch id={name} {...rest} {...field} />
                        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                    </FormControl>
                );
            }}
        </FastField>
    );
}

export default SwitchInput;