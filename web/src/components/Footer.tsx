import { Flex, Text } from '@chakra-ui/react';
import React from 'react'
import Wrapper from './Wrapper';

interface FooterProps {

}

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <Wrapper variant='infinite'>
            <Flex borderTop='1px #00000024 solid' py='30px' alignItems='center' justifyContent='center'>
                <Text opacity='.7'>ДП 2021 «Разработка онлайн площадки для арендаторов частного жилья»</Text>
            </Flex>
        </Wrapper>
    );
}

export default Footer