import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Text, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, Flex } from "@chakra-ui/react";
//import Image from 'next/image';
import NextLink from 'next/link';
import React from "react";
import Layout from "../components/Layout";
import ListOfHouses from "../components/ListOfHouses";
import Wrapper from "../components/Wrapper";
import { useHousesQuery, useMeQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";




const Index: React.FC = () => {

  const { data, loading, fetchMore, variables } = useHousesQuery({
    variables: { limit: 8, cursor: null },
    notifyOnNetworkStatusChange: true,
  });
  const { data: meData } = useMeQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  let dataList;
  if (!data && loading) {
    dataList = <><Spinner /></>
  } else if (!data && !loading) {
    dataList = <Box>Уууооопс... что-то пошло не по плану</Box>
  } else {
    dataList = <ListOfHouses data={data} />
  }

  let buttonCreate;
  if (meData?.me && meData?.me.phone) {
    buttonCreate =
      <NextLink href='/create-house'>
        <Button color='#fff' size="sm" colorScheme='airbnb' width='max-content' px={10} py={5} fontSize={15}>
          Разместить жильё
        </Button>
      </NextLink>;
  } else if (meData?.me?.phone === '') {
    buttonCreate =
      <>
        <Button colorScheme='airbnb' color='#fff' size="sm" width='max-content' onClick={onOpen} px={10} py={5} fontSize={15}>
          Разместить жильё
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent paddingBottom='20px'>
            <ModalHeader display='flex' justifyContent='center' alignItems='center' color='tomato' fontSize='xl'><InfoOutlineIcon mr='10px' />Внимание</ModalHeader>
            <ModalCloseButton />
            <ModalBody display='flex' flexDir='column' alignItems='center'>
              <Flex flexDir='column' justifyContent='center' alignItems='center'>
                <Text fontSize='lg' >Чтобы разместить жильё, пожалуйста, укажите свой номер телефона в профиле.</Text>
                <NextLink href='/profile/settings'>
                  <Button colorScheme='airbnb' mt={5} w="100%" maxW='250px' type='submit'>Редактировать профиль</Button>
                </NextLink>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>;
  } else {
    buttonCreate =
      <NextLink href='/create-house'>
        <Button color='#fff' size="sm" colorScheme='airbnb' width='max-content' px={10} py={5} fontSize={15}>
          Разместить жильё
        </Button>
      </NextLink>;
  }


  return (
    <>
      <Layout footer>
        <Wrapper variant='infinite'>
          <Box display='flex' justifyContent='center' boxShadow='lg' width='100%' bg='url(/system/home_7_croped.jpg) center no-repeat' backgroundSize='cover'>
            <Box maxW='1300px' mx='auto' w='100%' px={4} display='flex'>
              <Box h='70vh' minH='400px' display='flex' justifyContent='center' flexDirection='column' alignItems='left' width='100%'>
                <Box display='flex' flexDirection='column' justifyContent='space-between'>
                  <Heading as="h1" size="2xl" color="#fff" isTruncated mb={10}>
                    Разместить жильё <br />прямо сейчас
                  </Heading>
                  {buttonCreate}
                </Box>
              </Box>
            </Box>
          </Box>
        </Wrapper>
        <Wrapper>
          <Box w='100%' px={4} display='flex' flexDirection='column' my={20}>
            {dataList}
            {data && data.houses.hasMore ?
              (
                <><Divider colorScheme='blackFuel' my={35} />
                  <Button onClick={() => {
                    fetchMore({
                      variables: {
                        limit: variables?.limit,
                        cursor: data.houses.houses[data.houses.houses.length - 1].createdAt
                      },
                    })
                  }} mx='auto' isLoading={loading} px={20} width='max-content' colorScheme='blackFuel' size='lg'>Показать ещё</Button>
                </>
              )
              : null}
          </Box>
        </Wrapper>
      </Layout>
    </>
  );
};

export default withApollo({ ssr: true })(Index);
