import React from 'react';
import {Button} from "@radix-ui/themes";
import Link from "next/link";

const IssuesAction = () => {
    return (
        <div className='mb-5'>
            <Button className="m-5 p-5">
                <Link href='/issues/new'>New Issue</Link>
            </Button>
        </div>
    );
};

export default IssuesAction;