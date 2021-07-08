import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { withApollo } from '../utils/withApollo';




interface registerProps {

}



const Help: React.FC<registerProps> = ({ }) => {
    return (
        <>
            <Layout>
                <Wrapper>
                    <Box w='100%' px={4} display='flex' flexDirection='column' my={10}>
                        <Box mx='auto' w='fit-content' fontSize='26px' fontWeight='bold' my={2}><Heading>Помощь</Heading></Box>
                        <Flex>
                            <Flex w='50%'>
                                <Image src='/system/home_1.jpg' w={600} borderRadius='20px' my={7} />
                            </Flex>
                            <Flex flexDirection='column' w='50%' justifyContent='center' alignItems='center'>
                                <Heading fontSize='24px'>Как правильно размещать жильё?</Heading>
                                <Text>
                                    Важно изначально выбрать правильную планировку квартиры, учитывая объёмно-пространственные габариты, компоновку и комбинаторику помещений. Если говорить кратко, то объёмно-пространственные габариты квартиры — это когда площадь коридора, холла и прихожей составляет не более 20% общей квадратуры, а размеры комнат по ширине — не менее 3,5 метра.

                                    Мало кто задумывается о планировании пространства перед покупкой жилья, думая, что всё можно перекроить позже. Потом перед дизайнером ставится подчас невыполнимая задача, например перенести «мокрую зону» на жилую или увеличить количество спален за счёт помещений без окон.
                                </Text>
                            </Flex>

                        </Flex>
                        <Flex mt={5} flexDirection='row-reverse'>
                            <Flex w='50%' justifyContent='flex-end'>
                                <Image src='/system/home_5.jpg' w={600} borderRadius='20px' my={7} />
                            </Flex>
                            <Flex flexDirection='column' w='50%' justifyContent='center' alignItems='center'>
                                <Heading fontSize='24px'>Критерии продвижения жилья</Heading>
                                <Text>
                                    Маркетинговые отделы строительных компаний часто не имеют четкой стратегии продвижения, и потому у них нет возможности оптимизировать затраты без потери эффективности. В такой ситуации для застройщика оптимальным решением является обращение в комплексное маркетинговое агентство, которое поможет выстроить и реализовать пошаговый индивидуальный план достижения девелопером своих бизнес-целей.
                                </Text>
                            </Flex>

                        </Flex>
                    </Box>
                </Wrapper>
            </Layout>
        </>
    );
}

export default withApollo({ ssr: true })(Help);