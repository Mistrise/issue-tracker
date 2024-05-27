import React from 'react';
import {Button, Flex} from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "@/app/issues/list/IssueStatusFilter";

const IssuesAction = () => {
    return (
        <Flex mb='5' justify='between'>
            <Button className="m-5 p-5">
                <Link href='/issues/new'>New Issue</Link>
            </Button>
            <IssueStatusFilter/>
        </Flex>
    );
};

export default IssuesAction;