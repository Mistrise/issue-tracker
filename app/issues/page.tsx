import React from 'react';
import {Button} from "@radix-ui/themes";
import Link from "next/link";

const IssuePage = () => {
    return (
        <div>
            <Button className="m-5 p-5">
                <Link href='/issues/new'>New Issue</Link>
            </Button>
        </div>
    );
};

export default IssuePage;