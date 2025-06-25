"use client";

import {
  Box,
  TextInput,
  Select,
  RangeSlider,
  Card,
  Text,
  Group,
  Stack,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  salary: number;
}

export default function JobListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 100000]);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [titleFilter, locationFilter, jobTypeFilter, salaryRange, jobs]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
      console.log("Jobs from backend:", res.data);
      setJobs(res.data || []);
      setFilteredJobs(res.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const applyFilters = () => {
    const filtered = jobs.filter((job) => {
      const matchesTitle = job?.title?.toLowerCase().includes(titleFilter.toLowerCase());
      const matchesLocation = job?.location?.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesType = jobTypeFilter ? job?.jobType === jobTypeFilter : true;
      const matchesSalary = job?.salary >= salaryRange[0] && job?.salary <= salaryRange[1];
      return matchesTitle && matchesLocation && matchesType && matchesSalary;
    });

    setFilteredJobs(filtered);
  };

  return (
    <Box p="md">
      <Text size="xl" mb="sm" fw={600}>
        Filter Jobs
      </Text>

      <Group grow mb="lg">
        <TextInput
          label="Job Title"
          placeholder="Search by title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.currentTarget.value)}
        />
        <TextInput
          label="Location"
          placeholder="Search by location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.currentTarget.value)}
        />
        <Select
          label="Job Type"
          placeholder="Select type"
          data={[
            { label: "Full-time", value: "Full-time" },
            { label: "Part-time", value: "Part-time" },
            { label: "Contract", value: "Contract" },
            { label: "Internship", value: "Internship" },
          ]}
          value={jobTypeFilter}
          onChange={(value) => setJobTypeFilter(value || "")}
          clearable
          searchable
        />
      </Group>

      <Box mb="lg">
        <Text>
          Salary Range: ₹{salaryRange[0]} - ₹{salaryRange[1]}
        </Text>
        <RangeSlider
          min={0}
          max={200000}
          step={5000}
          value={salaryRange}
          onChange={(value) => setSalaryRange(value || [0, 100000])}
          marks={[
            { value: 0, label: "0" },
            { value: 100000, label: "1L" },
            { value: 200000, label: "2L" },
          ]}
          mt="xs"
        />
      </Box>

      <Stack>
        {filteredJobs.map((job) => (
          <Card key={job.id} shadow="sm" padding="lg" withBorder>
           <Group justify="space-between" mb="xs">
              <Text fw={500}>{job.title}</Text>
              <Text size="sm" c="dimmed">
                {job.jobType}
              </Text>
            </Group>
            <Text size="sm">
              {job.companyName} • {job.location}
            </Text>
            <Text size="sm">₹{job.salary}</Text>
          </Card>
        ))}
        {filteredJobs.length === 0 && <Text>No jobs found.</Text>}
      </Stack>
    </Box>
  );
}
