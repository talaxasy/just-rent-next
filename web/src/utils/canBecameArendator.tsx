import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const canBecameArendator = () => {
    const { data, loading } = useMeQuery();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !data?.me?.phone) {
            router.replace('/message');
        }

    }, [loading, data, router]);
}
