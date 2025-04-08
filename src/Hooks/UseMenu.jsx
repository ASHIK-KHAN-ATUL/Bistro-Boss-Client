import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import UseAxiosPublic from "./UseAxiosPublic";

const useMenu = () => {

    const axiosPublic = UseAxiosPublic();

    const {data: menu = [], isPending: loadind, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async() => {
            const res = await axiosPublic.get('/menu');
            return res.data;
        }
    })

        return [menu, refetch , loadind];
}

export default useMenu;