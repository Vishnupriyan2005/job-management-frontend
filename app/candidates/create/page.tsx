// app/candidates/create/page.tsx
"use client";

import { useState } from "react";

export default function CreateCandidatePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Replace with your backend API URL
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      setMessage("Candidate created successfully!");
      setName("");
      setEmail("");
    } else {
      setMessage("Failed to create candidate.");
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Create Candidate</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Name: <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Email: <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit">Create</button>
      </form>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </main>
  );
}
