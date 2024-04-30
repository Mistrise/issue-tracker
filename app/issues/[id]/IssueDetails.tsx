import React from 'react';
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import {Issue} from "@prisma/client";


const IssueDetails = ({issue}: { issue: Issue }) => {
    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue.status}/>
                <Text>created at {issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card mt='4'>
                <p>description is {issue.description}</p>
            </Card>
        </div>
    );
};

export default IssueDetails;