'use client'


import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React from 'react';
import {FaBugs} from "react-icons/fa6";
import Link from "next/link";
import classnames from "classnames"
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import {Avatar, Box, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";

const NavBar = () => {
    return (<nav className='border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href='/'>
                            <FaBugs/>
                        </Link>
                        <NavLinks/>
                    </Flex>
                    <AuthStatus/>
                </Flex>
            </Container>
        </nav>);
};

const AuthStatus = () => {
    const {status, data: session} = useSession()

    if (status === 'loading') return <Skeleton width='3rem'/>

    if (status === "unauthenticated") return <Link className='nav-link' href={'/api/auth/signin'}>Login</Link>

    return (<Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar className='cursor-pointer' fallback='?' src={session!.user!.image!} size='2' radius='full'/>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size='2'>
                            {session!.user!.email}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href={'/api/auth/signout'}>Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>)
}

const NavLinks = () => {
    const links = [{label: 'Dashboard', href: '/'}, {label: 'Issues', href: '/issues/list'},]
    const pathName = usePathname()
    return (<ul className='flex space-x-6'>
            {links.map(link => <li key={link.href}>
                <Link
                    className={classnames({
                        "nav-link": true,
                        '!text-zinc-900': pathName === link.href,
                    })}
                    href={link.href}>
                    {link.label}
                </Link>
            </li>)}
        </ul>)
}

export default NavBar;