import { useDefaultAmenitiesQuery, useDefaultRulesQuery, useDefaultHouseTypesQuery, useDefaultRoomTypesQuery, useSafetyAmenitiesQuery } from "../generated/graphql";

export const getDefaultEntities = () => {
    const { data: defaultAmenities } = useDefaultAmenitiesQuery();
    const { data: defaultRules } = useDefaultRulesQuery();
    const { data: defaultHouseTypes } = useDefaultHouseTypesQuery();
    const { data: defaultRoomTypes } = useDefaultRoomTypesQuery();
    const { data: safetyAmenities } = useSafetyAmenitiesQuery();
    return {
        defaultAmenities,
        defaultRules,
        defaultHouseTypes,
        defaultRoomTypes,
        safetyAmenities,
    };
}