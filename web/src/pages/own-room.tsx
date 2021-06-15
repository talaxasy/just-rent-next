import { Box, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { withApollo } from '../utils/withApollo';




interface registerProps {

}



const OwnRoom: React.FC<registerProps> = ({ }) => {
    return (
        <>
            <Layout>
                <Wrapper>
                    <Text mt='30px' fontSize='xl' fontWeight='bold'>Моя недвижимость</Text>
                    <Divider opacity='.2' height='2px' bg='#333333' my={10} />
                    <Box h='200px'></Box>
                    <Text fontSize='xl' fontWeight='bold'>Арендованные дома</Text>
                    <Divider opacity='.2' height='2px' bg='#333333' my={10} />
                    <Box h='200px'></Box>
                </Wrapper>
            </Layout>
        </>
    );
}

export default withApollo({ ssr: true })(OwnRoom);