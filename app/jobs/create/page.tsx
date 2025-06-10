'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Stack,
  Container,
  Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';

interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description?: string;
  requirements?: string;
  responsibilities?: string;
  deadline?: Date | null;
}

export default function CreateJobPage() {
  const { register, handleSubmit, reset } = useForm<JobFormData>();

  const onSubmit = (data: JobFormData) => {
    // Clean salary to numeric string (remove all non-digit chars)
    const salaryNumeric = data.salary ? data.salary.replace(/[^\d]/g, '') : undefined;

    // Prepare payload
    const payload = {
      ...data,
      salary: salaryNumeric,
      deadline: data.deadline ? data.deadline.toISOString() : null,
    };

    // Replace with your actual backend API URL
    fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert('Error: ' + res.message);
        } else {
          alert('✅ Job Created Successfully!');
          reset();
        }
      })
      .catch((err) => {
        alert('Failed to submit: ' + err.message);
      });
  };

  return (
    <Container size="md" py="lg">
      <Title order={2} mb="md">
        Create New Job
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="md">
          <TextInput
            label="Job Title"
            placeholder="e.g. Full Stack Developer"
            {...register('title', { required: 'Job Title is required' })}
          />

          <TextInput
            label="Company Name"
            placeholder="e.g. Cybermind Works"
            {...register('company', { required: 'Company Name is required' })}
          />

          <TextInput
            label="Location"
            placeholder="e.g. Chennai"
            {...register('location', { required: 'Location is required' })}
          />

          <Select
            label="Job Type"
            placeholder="Select job type"
            data={['Full-time', 'Part-time', 'Contract', 'Internship']}
            {...register('type', { required: 'Job Type is required' })}
          />

          <TextInput
            label="Salary Range"
            placeholder="e.g. ₹50k - ₹80k"
            {...register('salary')}
          />

          <Textarea
            label="Job Description"
            placeholder="Brief description of the job"
            minRows={3}
            {...register('description')}
          />

          <Textarea
            label="Requirements"
            placeholder="List required skills/experience"
            minRows={2}
            {...register('requirements')}
          />

          <Textarea
            label="Responsibilities"
            placeholder="What will the candidate do?"
            minRows={2}
            {...register('responsibilities')}
          />

          <DatePickerInput
            label="Application Deadline"
            placeholder="Pick a deadline"
            {...register('deadline')}
            clearable
          />

          <Group position="right">
            <Button type="submit">Post Job</Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}
