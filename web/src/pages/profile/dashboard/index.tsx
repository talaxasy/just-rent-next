import {Box, Divider, Spinner, Text} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import Layout from '../../../components/Layout';
import OwnHousesComponent from '../../../components/OwnHousesComponent';
import Wrapper from '../../../components/Wrapper';
import {useHousesQuery, useMeQuery} from '../../../generated/graphql';
import {useIsAuth} from '../../../utils/useIsAuth';
import {withApollo} from '../../../utils/withApollo';

interface indexProps {}

const Dashboard: React.FC<indexProps> = ({}) => {
  useIsAuth();
  const {data: meData, loading: meLoading} = useMeQuery();
  const {data, loading} = useHousesQuery({
    variables: {limit: 1000, housesById: true},
    fetchPolicy: 'no-cache',
  });
  const [ownHouses, setOwnHouses] = useState<any>(undefined);

  useEffect(() => {
    if (loading && !data?.houses.houses) {
      setOwnHouses(
        <Box>
          <Spinner />
        </Box>,
      );
    } else if (data?.houses.houses && !loading) {
      setOwnHouses(<OwnHousesComponent data={data} meData={meData} />);
    }
  }, [data, loading]);

  if (meLoading) {
    return (
      <Wrapper>
        <Box>Загрузка...</Box>
      </Wrapper>
    );
  }

  return (
    <Layout footer>
      <Wrapper>
        <Text mt="30px" fontSize="4xl" fontWeight="bold">
          Моё жильё
        </Text>
        <Divider opacity=".2" height="2px" bg="#333333" my={5} />
        {ownHouses}
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ssr: true})(Dashboard);
