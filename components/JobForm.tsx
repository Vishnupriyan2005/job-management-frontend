'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { TextInput, Textarea, Button, Box } from '@mantine/core';

interface JobFormProps {
  onSuccess: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3002/jobs', {
        title,
        description,
        company,
      });

      setTitle('');
      setDescription('');
      setCompany('');
      onSuccess(); // refresh the job list after success
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb="md">
      <TextInput
        label="Job Title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        required
        mb="sm"
      />
      <TextInput
        label="Company"
        value={company}
        onChange={(e) => setCompany(e.currentTarget.value)}
        required
        mb="sm"
      />
      <Textarea
        label="Job Description"
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        required
        mb="sm"
      />
      <Button type="submit">Add Job</Button>
    </Box>
  );
};

export default JobForm;
