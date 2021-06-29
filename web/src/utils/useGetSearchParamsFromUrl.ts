import { useRouter } from "next/router";
import { useHouseQuery } from "../generated/graphql";
import { useGetHouseId } from "./useGetHouseId";

export const useGetSearchParamsFromUrl = () => {
    const router = useRouter();
    const searchParams = typeof router.query.data === 'string' ? router.query.data : -1;
    return searchParams;
}