import { CheckIcon } from '@chakra-ui/icons';
import { FormControl, Text, FormLabel, Box, FormErrorMessage, Input, FormControlProps, Textarea, InputGroup, InputLeftElement, InputRightElement, Flex } from '@chakra-ui/react';
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
    sightInput?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
    name,
    label,
    description,
    textarea,
    smallSize,
    type,
    sightInput,
    ...rest
}) => {



    return (
        <FastField name={name}>
            {({ field, form }: any) => {

                let input;
                if (textarea) {
                    input = <Textarea minHeight='200px' id={field.name} {...rest} {...field} />;
                }
                if (!textarea) {
                    input = <Input id={name} type={type} {...rest} {...field} />;
                }
                if (!textarea && sightInput) {
                    input =
                        <Flex width='fit-content' alignItems='center'>
                            <InputGroup>
                                <InputLeftElement
                                    ml='10px'
                                    pointerEvents="none"
                                    fontSize="1.2em"
                                    children="BYN"
                                />
                                <Input pl='60px' id={name} type='number' {...rest} {...field} />
                            </InputGroup>
                            <Text width='100px' fontSize='xl'>/ ночь</Text>
                        </Flex>;
                }

                return (
                    <FormControl isInvalid={form.errors[name] && form.touched[name]}>
                        <FormLabel fontWeight={smallSize ? '500' : 'bold'} fontSize={smallSize ? '1rem' : 'xl'} htmlFor={name}>{label}</FormLabel>
                        {description && <Box fontSize='lg' opacity='.9' mb={5}>{description}</Box>}

                        {input}

                        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                    </FormControl>
                );
            }}
        </FastField>
    );
}

export default TextInput