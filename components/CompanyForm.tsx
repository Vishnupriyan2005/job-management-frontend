// frontend/components/CompanyForm.tsx
'use client';
import React, { useState } from 'react';
import { TextInput, Textarea, Button, Stack } from '@mantine/core';
import axios from 'axios';

interface CompanyFormProps {
  onSuccess: () => void;
}

const CompanyForm = ({ onSuccess }: CompanyFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/companies', { name, description });
    setName('');
    setDescription('');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label="Company Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <Button type="submit">Add Company</Button>
      </Stack>
    </form>
  );
};

export default CompanyForm;
