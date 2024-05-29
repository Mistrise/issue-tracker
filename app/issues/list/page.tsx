import React from 'react';
import prisma from "@/prisma/client";
import IssuesAction from "@/app/issues/list/IssuesAction";
import {Status} from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, {columnNames, IssueQuery} from "@/app/issues/list/IssueTable";
import {Flex} from "@radix-ui/themes";
import {Metadata} from "next";

const IssuePage = async ({searchParams}: {searchParams: IssueQuery}) => {


    const statuses = Object.values(Status)
    const status = statuses.includes(searchParams.status) ?
        searchParams.status :
        undefined;
    const where = { status }

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const orderBy = columnNames
        .includes(searchParams.orderBy) ? { [ searchParams.orderBy]: 'asc'}
        : undefined


    const issues = await prisma.issue.findMany(
        {
            where,
            orderBy,
            skip: (page - 1) * pageSize,
            take: pageSize,
        }
    )

    const issueCount = await prisma.issue.count({ where })

    return (
        <Flex direction="column" gap='3'>
            <IssuesAction/>
            <IssueTable searchParams={searchParams} issues={issues}/>
            <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page}/>
        </Flex>
    );
};

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Issue tracker - Issue List',
    description: 'View all project issues'
}

export default IssuePage;