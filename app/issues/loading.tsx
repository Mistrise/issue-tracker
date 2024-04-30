import React from 'react';
import {Table} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssuesAction from "@/app/issues/IssuesAction";

const LoadingIssuesPage = () => {
    const issues = [1,2,3,4,5]

    return (
        <>
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
                    {issues.map((issue) => (
                        <Table.Row key={issue}>
                            <Table.Cell>
                                <Skeleton/>
                                <div className="block md:hidden">
                                    <Skeleton/>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton/>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <Skeleton/>
                            </Table.Cell>
                        </Table.Row>)
                    )}
                </Table.Body>
            </Table.Root>
        </>
    );
};

export default LoadingIssuesPage;