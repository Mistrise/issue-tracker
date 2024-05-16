'use client'
import React from 'react';
import { FaBugs } from "react-icons/fa6";
import Link from "next/link";
import classnames from "classnames"
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import {Avatar, Box, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";

const NavBar = () => {
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues/list'},
    ]
    const {status, data: session} = useSession()
    const pathName = usePathname()

    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
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
                    </Flex>
                    <Box>
                        {status === 'authenticated' &&
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar className='cursor-pointer' fallback='?' src={session.user!.image!} size='2' radius='full'/>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size='2'>
                                            {session.user!.email}
                                        </Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href={'/api/auth/signout'}>Log out</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        }
                        {status === 'unauthenticated' && <Link href={'/api/auth/signin'}>Login</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
);
};

export default NavBar;