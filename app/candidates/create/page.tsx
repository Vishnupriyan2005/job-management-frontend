"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Select, TextInput, Button, Box } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifications, showNotification } from "@mantine/notifications"; // ✅ FIX: Added showNotification
import * as z from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  jobId: z.string().min(1),
});

export default function CreateCandidate() {
  const router = useRouter();
  const [jobOptions, setJobOptions] = useState<{ value: string; label: string }[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
        console.log("Loaded Jobs:", res.data);
        const options = res.data.map((job: any) => ({
          value: job.id.toString(),
          label: job.title,
        }));
        setJobOptions(options); // ✅ dynamically loaded from backend
      } catch (err) {
        console.error("Job fetch failed", err);
        notifications.show({
          title: "Error",
          message: "Failed to load jobs",
          color: "red",
        });
      }
    }

    fetchJobs();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          jobId: Number(data.jobId),
          companyId: 1, // ✅ hardcoded for now
        }),
      });

      if (!response.ok) throw new Error("Failed to create candidate");

      showNotification({
        title: "Success",
        message: "Candidate created successfully",
        color: "green",
      });

      router.push("/candidates"); // ✅ Optional: redirect after creation
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to create candidate",
        color: "red",
      });
    }
  };

  return (
    <Box maw={450} mx="auto" p="lg" bg="white" shadow="md" radius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Name"
          {...register("name")}
          error={errors.name?.message}
          required
        />
        <TextInput
          label="Email"
          {...register("email")}
          error={errors.email?.message}
          required
        />
        <TextInput
          label="Phone"
          {...register("phone")}
          error={errors.phone?.message}
          required
        />
        <Select
          label="Job Role"
          placeholder="Select a job"
          data={jobOptions} // ✅ used dynamic jobs from backend
          value={watch("jobId") || ""}
          onChange={(value) => setValue("jobId", value ?? "")}
          error={errors.jobId?.message}
          required
          searchable
        />
        <Button type="submit" mt="md" color="blue" fullWidth>
          Create
        </Button>
      </form>
    </Box>
  );
}
