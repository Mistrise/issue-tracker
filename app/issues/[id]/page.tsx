import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {param} from "ts-interface-checker";


interface Props {
    params: {id: string}
}

const IssueDetailPage = async ({params} :Props) => {
    if (typeof params.id !== 'number') {
        return notFound()
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue) {
        return notFound()
    }
    return (
        <div>
            <p>title is {issue.title}</p>
            <p>description is {issue.description}</p>
            <p>status is {issue.status}</p>
            <p>created at {issue.createdAt.toDateString()}</p>
        </div>
    );
};

export default IssueDetailPage;