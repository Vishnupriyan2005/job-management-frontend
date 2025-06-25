// Full Job Management Frontend (Next.js + Mantine + React Hook Form) with HR requirements
// Includes: Search bar, Poppins font, primary color theme, Candidate form, Jobs page

'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Table,
  Loader,
  Text,
  Paper,
  TextInput,
  Button,
  Textarea,
  Stack,
  MantineProvider
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import '@fontsource/poppins';

// ------------ Theme Wrapper ------------- //
export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Poppins, sans-serif',
        primaryColor: 'violet',
      }}
    >
      {children}
    </MantineProvider>
  );
}

// ------------ Job List with Search ------------- //
interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
}

function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error('Error loading jobs', err);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container size="lg" py="md">
      <Title order={2} mb="md">
        Job Listings
      </Title>

      <TextInput
        placeholder="Search jobs..."
        icon={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
      />

      {loading ? (
        <Loader />
      ) : filteredJobs.length === 0 ? (
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
              {filteredJobs.map((job) => (
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

// ------------ Candidate Form Component ------------- //
interface Candidate {
  id: string;
  name: string;
  skills: string;
}

function CandidateForm({ onCandidateCreated }: { onCandidateCreated: (c: Candidate) => void }) {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/candidates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, skills })
    });
    const newCandidate: Candidate = await res.json();
    onCandidateCreated(newCandidate);
    setName('');
    setSkills('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label="Candidate Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Textarea label="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} required />
        <Button type="submit">Add Candidate</Button>
      </Stack>
    </form>
  );
}

// ------------ Dashboard Page Placeholder ------------- //
function DashboardPage() {
  return (
    <Container>
      <Title>Dashboard</Title>
      <Text>Welcome to the dashboard!</Text>
    </Container>
  );
}

// ------------ App Export (Example for _app.tsx or page.tsx) ------------- //
export default function App() {
  return (
    <ThemeWrapper>
      <JobsPage />
      {/* <CandidateForm onCandidateCreated={(c) => console.log(c)} /> */}
      {/* <DashboardPage /> */}
    </ThemeWrapper>
  );
}
