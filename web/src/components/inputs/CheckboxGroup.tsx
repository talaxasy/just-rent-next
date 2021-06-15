import { FormControl, CheckboxGroup as CheckboxGroupChackra, FormLabel, Box, Input, FormErrorMessage, Flex, Checkbox } from '@chakra-ui/react';
import { Field, useField } from 'formik';
import React from 'react'
import { TextInputProps } from './TextInput';

const CheckboxGroup: React.FC<TextInputProps> = ({ name, label, description, options, ...rest }) => {
    const [field, { error, touched }] = useField(name);
    console.log(options);
    return (
        <FormControl isInvalid={!!error && touched} {...rest}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            {description && <Box mb={5}>{description}</Box>}
            <Flex flexDirection='column'>
                {
                    options!.map(option => {
                        return (
                            <Checkbox
                                key={option}
                                name={name}
                                isInvalid={!!error && touched}
                                isChecked={field.value.includes(option) ?? false}
                                value={option}
                                {...rest}
                            >{option}</Checkbox>
                        );
                    })
                }
            </Flex>

            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    );
}

export default CheckboxGroup