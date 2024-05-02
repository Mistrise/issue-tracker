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
import Spinner from "@/app/components/Spinner";
import {Issue} from "@prisma/client";

interface Props {
    issue?: Issue
}

type IssueFormData =  z.infer<typeof createIssueSchema>
const IssueForm = ({issue}: Props) => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(createIssueSchema)
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = handleSubmit( async (data) => {
        try {
            setIsSubmitting(true)
            if (issue)
                await axios.patch('/api/issues/' + issue.id, data)
            else
                await axios.post('/api/issues', data)
            router.push('/issues')
        } catch (e) {
            setIsSubmitting(false)
            setError('A unexpected error occurred')
        }
    })


    return (
        <div className='max-w-xl p-4 mx-auto text-center'>
            {error && <Callout.Root size="3" color="red" className='mb-2'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root defaultValue={issue?.title} placeholder='title' {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <TextArea size="3" defaultValue={issue?.description} placeholder='description' {...register('description')}/>
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>{issue ? 'Update issue' : 'Submit New Issue'}{isSubmitting && <Spinner></Spinner>}</Button>
            </form>
        </div>
    );
};

export default IssueForm;