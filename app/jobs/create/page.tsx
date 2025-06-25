"use client";

import {
  Box,
  Button,
  TextInput,
  Textarea,
  Select,
  NumberInput,
  Group,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";

export default function CreateJobPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      companyName: "",
      location: "",
      jobType: "",
      salary: 0,
      description: "",
      requirements: "",
      responsibilities: "",
      applicationDeadline: null,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        ...data,
        applicationDeadline: dayjs(data.applicationDeadline).toISOString(),
      });

      showNotification({
        title: "Success",
        message: "Job created successfully",
        color: "green",
      });

      router.push("/jobs");
    } catch (err) {
      showNotification({
        title: "Error",
        message: "Failed to create job",
        color: "red",
      });
    }
  };

  return (
    <Box p="md" maw={600} mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput label="Job Title" {...field} error={!!errors.title} mb="sm" />
          )}
        />
        <Controller
          name="companyName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput label="Company Name" {...field} error={!!errors.companyName} mb="sm" />
          )}
        />
        <Controller
          name="location"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput label="Location" {...field} error={!!errors.location} mb="sm" />
          )}
        />
        <Controller
          name="jobType"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              label="Job Type"
              placeholder="Select job type"
              data={[
                { label: "Full-time", value: "Full-time" },
                { label: "Part-time", value: "Part-time" },
                { label: "Contract", value: "Contract" },
                { label: "Internship", value: "Internship" },
              ]}
              value={field.value}
              onChange={field.onChange}
              error={!!errors.jobType}
              mb="sm"
              searchable
              clearable
              withCheckIcon={false}
              nothingFoundMessage="No options"
            />
          )}
        />
        <Controller
          name="salary"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <NumberInput
              label="Salary Range"
              {...field}
              error={!!errors.salary}
              mb="sm"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea label="Job Description" {...field} error={!!errors.description} mb="sm" />
          )}
        />
        <Controller
          name="requirements"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea label="Requirements" {...field} error={!!errors.requirements} mb="sm" />
          )}
        />
        <Controller
          name="responsibilities"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea label="Responsibilities" {...field} error={!!errors.responsibilities} mb="sm" />
          )}
        />
        <Controller
          name="applicationDeadline"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DateInput
              label="Application Deadline"
              {...field}
              value={field.value}
              onChange={field.onChange}
              error={!!errors.applicationDeadline}
              mb="sm"
            />
          )}
        />

        <Group mt="md" style={{ justifyContent: "flex-end" }}>
          <Button type="submit">Create Job</Button>
        </Group>
      </form>
    </Box>
  );
}
