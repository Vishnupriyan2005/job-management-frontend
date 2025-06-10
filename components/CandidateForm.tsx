"use client";

import { useState } from "react";
import { TextInput, Textarea, Button, Stack } from "@mantine/core";

interface Candidate {
  id: string;
  name: string;
  skills: string;
}

interface CandidateFormProps {
  onCandidateCreated: (candidate: Candidate) => void;
}

export default function CandidateForm({ onCandidateCreated }: CandidateFormProps) {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/candidates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, skills }),
    });

    const newCandidate: Candidate = await res.json();
    onCandidateCreated(newCandidate);
    setName("");
    setSkills("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          label="Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
        <Button type="submit">Add Candidate</Button>
      </Stack>
    </form>
  );
}
