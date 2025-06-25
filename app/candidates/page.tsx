// app/candidates/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Candidate {
  id: string;
  name: string;
  email: string;
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    async function fetchCandidates() {
      // Replace this URL with your backend API URL
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates`);
      const data = await res.json();
      setCandidates(data);
    }

    fetchCandidates();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Candidates List</h1>
      {candidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.id}>
              {candidate.name} - {candidate.email}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
