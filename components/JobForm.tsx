'use client';

import { TextInput, Select, Button, Group, Textarea } from '@mantine/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface Company {
  id: number;
  name: string;
}

export default function JobForm({ companies }: { companies: Company[] }) {
  const { register, handleSubmit, setValue } = useForm();

  const jobTypes = ['Full-time', 'Part-time', 'Internship', 'Contract'];

  const onSubmit = async (data: any) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, data);
      alert('Job created successfully!');
    } catch (err) {
      console.error('Job create error:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextInput label="Job Title" {...register('title')} required />
      <TextInput label="Location" {...register('location')} required />
      <TextInput label="Salary" type="number" {...register('salary')} required />

      <Select
        label="Job Type"
        placeholder="Select job type"
        data={jobTypes}
        onChange={(val) => setValue('type', val!)}
        required
      />

      <Select
        label="Company"
        placeholder="Select a company"
        data={companies.map((c) => ({
          value: c.id.toString(),
          label: c.name,
        }))}
        onChange={(val) => setValue('companyId', parseInt(val!))}
        required
      />

      <Textarea label="Job Description" {...register('description')} required />
      <Textarea label="Requirements" {...register('requirements')} required />
      <Textarea label="Responsibilities" {...register('responsibilities')} required />
      <TextInput label="Application Deadline" type="date" {...register('deadline')} required />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
