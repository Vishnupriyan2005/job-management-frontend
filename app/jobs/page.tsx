'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  Title,
  Container,
  Loader,
  Text,
  Paper,
} from '@mantine/core';

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
}

const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch('http://localhost:3000/jobs'); // Use backend API
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      const data = await fetchJobs();
      setJobs(data);
      setLoading(false);
    };

    loadJobs();
  }, []);

  return (
    <Container size="lg" py="md">
      <Title order={2} mb="md">
        Job Listings
      </Title>

      {loading ? (
        <Loader />
      ) : jobs.length === 0 ? (
        <Text>No jobs found.</Text>
      ) : (
        <Paper shadow="xs" p="md" radius="md" withBorder>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
