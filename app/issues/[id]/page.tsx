import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";



interface Props {
    params: {id: string}
}

const IssueDetailPage = async ({params} :Props) => {


    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue) {
        return notFound()
    }
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue.status}/>
                <Text>created at {issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card mt='4'>
                <p>description is {issue.description}</p>
            </Card>
        </>
    );
};

export default IssueDetailPage;