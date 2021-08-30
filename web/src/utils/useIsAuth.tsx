import {Spinner} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useMeQuery} from '../generated/graphql';

export const useIsAuth = (obj: {redirectTo: string}) => {
  const {data, loading} = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace(obj.redirectTo);
    }
    return () => {};
  }, [loading, data, router]);

  return {loading, data};
};
