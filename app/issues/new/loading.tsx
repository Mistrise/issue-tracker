import React from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {Box} from "@radix-ui/themes";

const Loading = () => {
    return (
        <Box className='max-w-xl p-4 mx-auto text-center'>
                <Skeleton/>
                <Skeleton height='20rem'/>
        </Box>
    );
};

export default Loading;