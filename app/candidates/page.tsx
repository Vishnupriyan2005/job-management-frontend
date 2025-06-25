"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, TextInput, Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  job: {
    title: string;
  };
}

export default function CandidateListPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState("");

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/candidates`);
      setCandidates(res.data);
    } catch (err) {
      showNotification({
        title: "Error",
        message: "Failed to load candidates",
        color: "red",
      });
    }
  };

  const deleteCandidate = async (id: number) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/candidates/${id}`);
      showNotification({
        title: "Deleted",
        message: "Candidate deleted",
        color: "red",
      });
      fetchCandidates();
    } catch (err) {
      showNotification({
        title: "Error",
        message: "Failed to delete",
        color: "red",
      });
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p="md">
      <TextInput
        placeholder="Search candidates..."
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="md"
      />

      <Table
        sx={{
          borderCollapse: 'collapse',
          border: '1px solid #dee2e6',
          'th, td': {
            border: '1px solid #dee2e6',
            padding: '8px',
          },
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.job?.title || "N/A"}</td>
              <td>
                <Button color="red" onClick={() => deleteCandidate(candidate.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {filteredCandidates.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No candidates found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Box>
  );
}
