'use client'
import React from 'react';
import { FaBugs } from "react-icons/fa6";
import Link from "next/link";
import classnames from "classnames"
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import {Box} from "@radix-ui/themes";

const NavBar = () => {
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues/list'},
    ]
    const {status, data: session} = useSession()
    const pathName = usePathname()

    return (
        <nav
            className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
                <Link href='/'>
                    <FaBugs/>
                </Link>
                <ul className='flex space-x-6'>
                    {links.map(link =>
                        <li key={link.href}>
                            <Link
                                  className={
                                    classnames({
                                        'text-zinc-500': pathName !== link.href,
                                        'text-zinc-900': pathName === link.href,
                                        'hover:text-zinc-800 transition-colors': true
                                    })
                                  }
                                  href={link.href}>
                                {link.label}
                            </Link>
                        </li>
                    )}
                </ul>
            <Box>
                {status === 'authenticated' && <Link href={'/api/auth/signout'}>Logout</Link>}
                {status === 'unauthenticated' && <Link href={'/api/auth/signin'}>Login</Link>}
            </Box>
        </nav>
);
};

export default NavBar;