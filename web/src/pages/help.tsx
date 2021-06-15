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
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga necessitatibus magni alias delectus quidem, cumque inventore eaque corporis ex nobis. Rem amet magnam laborum ut reiciendis eos nemo molestiae blanditiis exercitationem quisquam, fuga vero sed consequuntur quidem perspiciatis voluptatem consectetur laudantium non? Corrupti magni aut fugit repudiandae provident aperiam dignissimos.
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
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, voluptas debitis? Rerum doloribus harum magni cupiditate est. Nam id laboriosam quisquam rerum laborum voluptatum repellat iusto facere ipsum blanditiis fugiat, est cupiditate inventore? Beatae a temporibus assumenda veniam suscipit dolorum tempore vitae impedit. Quos, corrupti rem itaque nesciunt possimus beatae obcaecati asperiores facilis pariatur quia eveniet ex error molestiae vitae dolores adipisci officiis recusandae. Cupiditate, dolorem optio. Accusamus sapiente doloribus aut. Molestias maiores neque et ex perferendis dolor quos adipisci hic minima suscipit. Nostrum maxime accusantium, debitis id natus illo deleniti non modi ad! Sit voluptates placeat cupiditate soluta nostrum.
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