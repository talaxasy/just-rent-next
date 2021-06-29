import { useApolloClient } from '@apollo/client';
import { CloseIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { Avatar, Box, Image, Button, Flex, Text, IconButton, Input, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import FormikControl from './FormikControl';
import { Form, Formik } from 'formik';
import SearchComponent from './SearchComponent';


interface NavBar {

}

const NavBar: React.FC<NavBar> = ({ }) => {
    const router = useRouter();

    const { data, loading } = useMeQuery({
        skip: isServer(), // видеть запросы
    });

    const apolloClient = useApolloClient();
    const [logout] = useLogoutMutation();

    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <>
            <Box display='flex' justifyContent='center' boxShadow='lg' bg='#fff' width='100%' position='relative'>
                <Box maxW='1300px' w='100%' px={4} display='flex' className=''>
                    <Box display='flex' justifyContent='space-between' alignItems='center' width='100%' py={3}>
                        <NextLink href='/'>
                            <Link lineHeight='0'><Image src="/system/logo2.svg" alt="logo" width={175} height={43} /></Link>
                        </NextLink>


                        <SearchComponent />

                        <Menu>
                            <MenuButton as={Button} borderRadius='30px' bg='transparent' border='solid 0.5px #3333335e' h='auto' py='5px'>
                                <Flex alignItems='center'>
                                    <HamburgerIcon w={6} h={6} mr='10px' />
                                    <Flex alignItems='center'>
                                        <Avatar size='sm' src={!data?.me ? "" : "https://bit.ly/sage-adebayo"} />
                                    </Flex>
                                </Flex>
                            </MenuButton>
                            <MenuList>
                                {!data?.me ? (
                                    <MenuGroup title="Профиль">
                                        <NextLink href='/login'>
                                            <MenuItem>Войти</MenuItem>
                                        </NextLink>
                                        <NextLink href='/register'>
                                            <MenuItem>Регистрация</MenuItem>
                                        </NextLink>
                                    </MenuGroup>
                                ) : (
                                    <MenuGroup title="Профиль">
                                        <MenuItem onClick={async () => { await logout(); await apolloClient.resetStore(); }}>Выйти</MenuItem>
                                        <NextLink href='/profile'>
                                            <MenuItem>Аккаунт</MenuItem>
                                        </NextLink>
                                    </MenuGroup>
                                )}
                                <MenuDivider />
                                <MenuGroup title="Помощь">
                                    <NextLink href='/help'>
                                        <MenuItem>Помощь</MenuItem>
                                    </NextLink>
                                    <NextLink href='/about'>
                                        <MenuItem>О нас</MenuItem>
                                    </NextLink>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                    </Box>
                </Box>
            </Box >

        </>

    );
}

export default NavBar;