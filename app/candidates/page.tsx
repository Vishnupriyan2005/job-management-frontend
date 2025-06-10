'use client';
import { useEffect, useState } from 'react';
import { Container, Title, Card, TextInput, Button, Textarea } from '@mantine/core';
import axios from 'axios';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:3000/candidates');
      setCandidates(response.data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const addCandidate = async () => {
    try {
      await axios.post('http://localhost:3000/candidates', {
        name,
        skills,
      });
      setName('');
      setSkills('');
      fetchCandidates(); // reload candidates list
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <Container>
      <Title order={1} mb="lg">Candidates</Title>

      <TextInput
        label="Candidate Name"
        placeholder="Enter name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        mb="sm"
      />

      <Textarea
        label="Skills"
        placeholder="Enter skills"
        value={skills}
        onChange={(event) => setSkills(event.currentTarget.value)}
        mb="sm"
      />

      <Button onClick={addCandidate} mb="lg">Add Candidate</Button>

      {candidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        candidates.map((candidate) => (
          <Card key={candidate.id} shadow="sm" padding="lg" mb="sm" radius="md">
            <Title order={4}>{candidate.name}</Title>
            <p>{candidate.skills}</p>
          </Card>
        ))
      )}
    </Container>
  );
}
