import React from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {Box} from "@radix-ui/themes";

const IssueFormSkeleton = () => {
    return (
        <Box className='max-w-xl p-4 mx-auto text-center'>
            <Skeleton height='2rem'/>
            <Skeleton height='6rem'/>
        </Box>
    );
};

export default IssueFormSkeleton;