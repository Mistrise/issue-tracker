import React from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {Box, Card, Flex } from "@radix-ui/themes";


const Loading = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton width='3rem'/>
            <Flex gap='3' my='2'>
                <Skeleton width='5rem'/>
                <Skeleton width='8rem'/>
            </Flex>
            <Card mt='4'>
                <Skeleton count={3}/>
            </Card>
        </Box>
    );
};

export default Loading;