'use client';

import { useEffect, useState } from 'react';
import JobForm from '@/components/JobForm';

export default function CreateJobPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`);
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        console.error('Company fetch failed:', err);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create Job</h2>
      <JobForm companies={companies} />
    </div>
  );
}
