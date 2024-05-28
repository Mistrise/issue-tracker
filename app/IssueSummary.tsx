import React from 'react';
import {Card, Flex, Text} from "@radix-ui/themes";
import {Status} from "@prisma/client";
import NextLink from "next/link";


interface Props {
    open: number,
    inProgress: number,
    closed: number
}
const IssueSummary = ({open, closed, inProgress}: Props) => {
    const containers: {
        label: string,
        value: number,
        status: Status
    }[] = [
        {label: 'Open issues', value: open, status: 'OPEN'},
        {label: 'In progress issues', value: inProgress, status: 'IN_PROGRESS'},
        {label: 'Closed issues', value: closed, status: 'CLOSED'},
    ]
    return (
        <Flex gap='4'>
            {containers.map(container =>
                <Card key={container.label}>
                    <Flex direction='column' gap='1'>
                        <NextLink className='text-sm font-medium' href={`/issues/list?status=${container.status}`}>{container.label}</NextLink>
                        <Text size='5' className='font-bold'>{container.value}</Text>
                    </Flex>
                </Card>)}
        </Flex>
    );
};

export default IssueSummary;