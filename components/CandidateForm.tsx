// frontend/components/CandidateForm.tsx
'use client';
import React, { useState } from 'react';
import { TextInput, Textarea, Button, Stack } from '@mantine/core';
import axios from 'axios';

interface CandidateFormProps {
  onSuccess: () => void;
}

const CandidateForm = ({ onSuccess }: CandidateFormProps) => {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/candidates', { name, skills });
    setName('');
    setSkills('');
    onSuccess();
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
};

export default CandidateForm;
