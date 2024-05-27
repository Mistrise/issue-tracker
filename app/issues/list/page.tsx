import React from 'react';
import {Table} from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import IssuesAction from "@/app/issues/list/IssuesAction";
import Link from '@/app/components/Link'
import {Status} from "@prisma/client";

const IssuePage = async ({searchParams}: {searchParams: {status: Status}}) => {
    const statuses = Object.values(Status)
    const status = statuses.includes(searchParams.status) ?
        searchParams.status :
        undefined
    const issues = await prisma.issue.findMany(
        {
            where: {
                status
            }
        }
    )

    return (
        <div>
            <IssuesAction/>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.RowHeaderCell>
                            Issue
                        </Table.RowHeaderCell>
                        <Table.RowHeaderCell className="hidden md:table-cell">Status</Table.RowHeaderCell>
                        <Table.RowHeaderCell className="hidden md:table-cell">Created </Table.RowHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issue.status}/>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={issue.status}/>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>)
                    )}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export const dynamic = 'force-dynamic'

export default IssuePage;