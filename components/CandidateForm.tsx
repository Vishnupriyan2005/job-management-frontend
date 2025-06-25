'use client'

import { useForm } from 'react-hook-form'
import { TextInput, Button, Select } from '@mantine/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { notifications } from '@mantine/notifications'

type Job = { id: number; title: string }
type Company = { id: number; name: string }

export default function CandidateForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()

  const [jobs, setJobs] = useState<Job[]>([])
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    axios.get('/api/jobs').then((res) => setJobs(res.data))
    axios.get('/api/companies').then((res) => setCompanies(res.data))
  }, [])

  const onSubmit = async (data: any) => {
    try {
      await axios.post('/api/candidates', {
        name: data.name,
        email: data.email,
        jobId: Number(data.jobId),
        companyId: Number(data.companyId),
      })
      notifications.show({
        title: 'Success',
        message: 'Candidate created successfully!',
        color: 'green',
      })
      reset()
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Something went wrong!',
        color: 'red',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <TextInput
        label="Name"
        placeholder="Enter name"
        {...register('name', { required: 'Name is required' })}
        error={
          typeof errors.name?.message === 'string'
            ? errors.name.message
            : undefined
        }
      />
      <TextInput
        label="Email"
        placeholder="Enter email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email format',
          },
        })}
        error={
          typeof errors.email?.message === 'string'
            ? errors.email.message
            : undefined
        }
      />
      <Select
        label="Select Job"
        placeholder="Choose a job"
        data={jobs.map((job) => ({ value: String(job.id), label: job.title }))}
        onChange={(value) => setValue('jobId', value || '')}
        error={
          typeof errors.jobId?.message === 'string'
            ? errors.jobId.message
            : undefined
        }
      />
      <Select
        label="Select Company"
        placeholder="Choose a company"
        data={companies.map((c) => ({ value: String(c.id), label: c.name }))}
        onChange={(value) => setValue('companyId', value || '')}
        error={
          typeof errors.companyId?.message === 'string'
            ? errors.companyId.message
            : undefined
        }
      />

      <Button type="submit" loading={isSubmitting}>
        Add Candidate
      </Button>
    </form>
  )
}
