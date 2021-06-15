import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useNumberInput } from '@chakra-ui/react';
import { FastField, Field, useField } from 'formik';
import React from 'react';
import { TextInputProps } from './TextInput';

const CountInput: React.FC<TextInputProps> = ({ name, label, description, preLabel, placeholder, ...rest }) => {
    // const [field, { error, touched }] = useField(name);
    // const {
    //     getInputProps,
    //     getIncrementButtonProps,
    //     getDecrementButtonProps,
    // } = useNumberInput({
    //     step: 1,
    //     defaultValue: 1,
    //     min: 1,
    //     max: 10,
    //     precision: 0,
    // })

    // const inc = getIncrementButtonProps();
    // const dec = getDecrementButtonProps();
    // const input = getInputProps({ ...field });


    return (
        <FastField name={name}>
            {({ field, form }: any) => (
                <FormControl width={undefined} isInvalid={form.errors[name] && form.touched[name]}>
                    {label && <FormLabel htmlFor={name} mb={description ? '1' : '5'} p='0' >{label}</FormLabel>}
                    {description && <Box fontSize='14px' opacity='.8' mb={5}>{description}</Box>}
                    <Box display='flex' alignItems='center'>
                        {preLabel && <Box mr={75}>{preLabel}:</Box>}
                        <NumberInput
                            id={name}
                            {...field}
                            onChange={(val) =>
                                form.setFieldValue(field.name, parseInt(val, 10))
                            }
                            {...rest}
                            max={10}
                            min={1}
                        >
                            <NumberInputField placeholder={placeholder} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                    </Box>
                </FormControl>
            )}
        </FastField>
        // <Field name={name}>
        //     {({ form }: any) => {
        //         return (
        //             <FormControl isInvalid={form.errors[name] && form.touched[name]}>
        //                 <FormLabel htmlFor={name}>{label}</FormLabel>
        //                 {description && <Box mb={5}>{description}</Box>}
        //                 <HStack maxW="320px">
        //                     <Button {...dec}>-</Button>
        //                     <Input id={name} onChange={(val) => form.setFieldValue(field.name, val)} {...input} />
        //                     <Button {...inc}>+</Button>
        //                 </HStack>
        //                 <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        //             </FormControl>
        //         );
        //     }}
        // </Field>
    );
}

export default CountInput