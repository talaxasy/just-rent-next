import { Box, Flex, SimpleGrid, Image } from '@chakra-ui/react';
import React from 'react';
import Layout from '../../components/Layout';
import Wrapper from '../../components/Wrapper';
import { useGetHouseFromUrl } from '../../utils/useGetHouseFromUrl';
import { withApollo } from '../../utils/withApollo';

interface HouseProps {

}

const House: React.FC<HouseProps> = ({ }) => {
    const { data, loading } = useGetHouseFromUrl();

    if (loading) {
        return (
            <Box>Загрузка...</Box>
        );
    }

    if (!data?.house) {
        return (<Box>
            Такого дома не существует!
        </Box>);


    }

    return (
        <Layout>
            <Wrapper>
                <Flex flexDirection='column' my={20}>
                    <SimpleGrid minChildWidth="250px" spacing="40px">
                        {
                            data.house.pictureUrl.map(pic => {
                                return (
                                    <Box key={pic} borderWidth="1px" h='300px' borderRadius="lg" position='relative' overflow="hidden">
                                        <Image w='100%' h='100%' objectFit='cover' src={`http://localhost:4000/images/${data.house?.userId}/${pic}`} />
                                    </Box>
                                );
                            })
                        }
                    </SimpleGrid>
                    Название дома: {data.house.title}
                    <br />
                    Описание: {data.house.description}
                    <br />
                    Хозяин: {data.house.user.username}
                </Flex>
            </Wrapper>
        </Layout>
    );
}

export default withApollo({ ssr: true })(House);