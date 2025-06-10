"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Title,
  Stack,
} from "@mantine/core";
import CandidateForm from "../../components/CandidateForm";


// ✅ Define the Candidate type
interface Candidate {
  id: string;
  name: string;
  skills: string;
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch candidates from your API
  const fetchCandidates = async () => {
    try {
      const res = await fetch("/api/candidates");
      const data: Candidate[] = await res.json();
      setCandidates(data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleCandidateCreated = (newCandidate: Candidate) => {
    setCandidates((prev) => [newCandidate, ...prev]);
    setShowForm(false);
  };

  return (
    <Container>
      <Title order={2} mb="md">Candidates</Title>

      <Button onClick={() => setShowForm((prev) => !prev)} mb="md">
        {showForm ? "Close Form" : "Add Candidate"}
      </Button>

      {showForm && <CandidateForm onCandidateCreated={handleCandidateCreated} />}

      {loading ? (
        <p>Loading candidates...</p>
      ) : (
        <Stack>
          {candidates.map((candidate) => (
            <Card key={candidate.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4}>{candidate.name}</Title>
              <p>{candidate.skills}</p>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}
