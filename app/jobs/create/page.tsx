'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Button,
  Container,
  Stack,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';

type JobFormValues = {
  title: string;
  description: string;
  location: string;
};

export default function CreateJobPage() {
  const { register, handleSubmit, reset } = useForm<JobFormValues>();
  const router = useRouter();

  const onSubmit = async (data: JobFormValues) => {
    try {
      const response = await fetch('http://localhost:3001/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
        router.push('/jobs');
      }
    } catch (error) {
      console.error('Failed to create job', error);
    }
  };

  return (
    <Container>
      <Title order={2} mb="lg">
        Create New Job
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Job Title"
            placeholder="e.g. Full Stack Developer"
            {...register('title', { required: true })}
          />
          <Textarea
            label="Job Description"
            placeholder="Enter job responsibilities..."
            {...register('description', { required: true })}
          />
          <TextInput
            label="Location"
            placeholder="e.g. Remote, Chennai"
            {...register('location', { required: true })}
          />
          <Button type="submit">Create Job</Button>
        </Stack>
      </form>
    </Container>
  );
}
