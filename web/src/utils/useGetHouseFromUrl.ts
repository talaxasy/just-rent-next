import { useHouseQuery } from "../generated/graphql";
import { useGetHouseId } from "./useGetHouseId";

export const useGetHouseFromUrl = () => {
    const intId = useGetHouseId();
    return useHouseQuery({
        skip: intId === -1,
        variables: {
            id: intId
        }
    });
}