'use client'
import React, {useState} from 'react';
import {Button, Callout, TextArea, TextField} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/app/validationSchema";
import {z} from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";


type IssueForm =  z.infer<typeof createIssueSchema>
const NewIssuePage = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const [error, setError] = useState('')

    return (
        <div className='max-w-xl p-4 mx-auto text-center'>
            {error && <Callout.Root size="3" color="red" className='mb-2'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/issues', data)
                    router.push('/issues')
                } catch (e) {
                    setError('A unexpected error occurred')
                }
            })}>
                <TextField.Root placeholder='title' {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <TextArea placeholder='description' {...register('description')}/>
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;