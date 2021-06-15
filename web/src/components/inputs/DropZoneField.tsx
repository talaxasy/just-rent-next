import React, { useEffect, useState } from 'react';
import { DropzoneRootProps, useDropzone } from 'react-dropzone';
import { FieldProps, useField } from "formik"
import { FormErrorMessage, Image, FormControl, Text, Flex, Box, SimpleGrid, AspectRatio, Button, IconButton } from '@chakra-ui/react';
import { CloseIcon, PlusSquareIcon, WarningIcon } from '@chakra-ui/icons'

interface SteroidsFileType extends File {
    preview: string;
}

const DropZoneField: React.FC<{
    name: string;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    label?: string;
    description?: string;
}> = ({
    name,
    setFieldValue,
    label,
    description,
    ...props
}) => {

        const [files, setFiles] = useState<SteroidsFileType[]>([]);
        const [, { error }] = useField(name);
        const {
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
            fileRejections,
        } = useDropzone({
            accept: 'image/jpeg, image/png',
            maxSize: 5242880,
            maxFiles: 10,
            minSize: 0,
            onDrop: acceptedFiles => {
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));
                setFieldValue(name, acceptedFiles);
            },
            ...props
        });

        const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > 5242880;

        const thumbs = files.map(file => (
            <Box pos='relative' overflow='hidden' key={file.name} borderRadius='8px' m='10px' bg='#F5F5F5' justifyContent='center' display='flex' width='200px' h='150px'>
                <Image src={file.preview} objectFit="cover" />
                <IconButton
                    pos='absolute'
                    aria-label="Delete img"
                    colorScheme='red'
                    right='10px'
                    top='10px'
                    opacity='.8'
                    icon={<CloseIcon />}
                    onClick={() => {
                        const newFiles = files.filter(el => el.name !== file.name);
                        setFiles(newFiles);
                        setFieldValue(name, newFiles);
                    }} />
            </Box>
        ));
        useEffect(() => () => {

            files.forEach(file => URL.revokeObjectURL(file.preview));

        }, [files]);


        return (
            <FormControl isInvalid={!!error}>
                <Flex flexDirection='column' className="container">
                    {label && <Box fontWeight='bold' mb='10px' fontSize='xl' >{label}</Box>}
                    {description && <Box fontSize='lg' opacity='.9' mb={5}>{description}</Box>}
                    <Box w='100%' h='250px' borderRadius='10px'
                        border='2px dashed rgb(187, 187, 187)' padding='20px' cursor='pointer'
                        {...getRootProps()}>

                        <Flex justifyContent='center' alignItems='center' bgImg='url(https://a0.muscache.com/airbnb/static/packages/upload-photos-ghosts.56fe723d.png)'
                            h='100%' w='100%' boxShadow='rgb(234 234 234 / 70%) 0px -20px 35px 0px inset' backgroundRepeat='no-repeat'
                            bgSize='100% 100%' flexDirection='column'>

                            <input {...getInputProps()} />

                            <Flex minW='270px' minH='70px' justifyContent='center' alignItems='center' bg='#FF5A5F' color='#fff' mb='10px'
                                borderRadius='5px' fontWeight='bold' fontSize='xl'><PlusSquareIcon mr='10px' />Загрузить фото</Flex>


                            {!isDragActive && <Text fontSize='lg' opacity='.9'>или перетащите их сюда</Text>}
                            {isDragActive && !isDragReject && <Text fontSize='lg' opacity='.9'>тащите его сюда!</Text>}
                            {isDragReject && <Text fontSize='lg' opacity='.9'>такой файл не доступен</Text>}
                            {isFileTooLarge && <Text fontSize='xl' opacity='.9' mt='10px' color='tomato'><WarningIcon mr='10px' />один из файлов был слишком большой</Text>}
                            {fileRejections.length > 10 && <Text fontSize='xl' opacity='.9' mt='10px' color='tomato'><WarningIcon mr='10px' />максимум можно 10 файлов</Text>}

                        </Flex>
                    </Box>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                    <Flex mx='-10px' flexWrap='wrap'>
                        {thumbs}
                    </Flex>
                </Flex>
            </FormControl>

        );
    }

export default DropZoneField;