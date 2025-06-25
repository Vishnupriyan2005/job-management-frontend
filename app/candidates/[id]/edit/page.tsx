"use client";

import {
  Button,
  Container,
  TextInput,
  Title,
  Loader,
  Group,
} from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
});

export default function EditCandidate() {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
          name: "",
          email: "",
          phone: "",
        },
      });
      

  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchCandidate = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/candidates/${params.id}`
      );
      const data = res.data;
      setValue("name", data.name);
      setValue("email", data.email);
      setValue("phone", data.phone);
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to load candidate",
        color: "red",
      });
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/candidates/${params.id}`,
        data
      );
      notifications.show({
        title: "Success",
        message: "Candidate updated successfully!",
        color: "green",
      });
      router.push("/candidates");
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Failed to update candidate",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Container size="sm" mt="lg">
        <Group justify="center">
          <Loader />
        </Group>
      </Container>
    );
  }

  return (
    <Container size="sm" mt="lg">
      <Title order={2} mb="md">
        Edit Candidate
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Name"
              placeholder="Enter name"
              {...field}
              error={errors.name?.message}
              mb="sm"
              required
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Email"
              placeholder="Enter email"
              {...field}
              error={errors.email?.message}
              mb="sm"
              required
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Phone"
              placeholder="Enter phone number"
              {...field}
              error={errors.phone?.message}
              mb="md"
              required
            />
          )}
        />

        <Button type="submit" loading={loading}>
          Update
        </Button>
      </form>
    </Container>
  );
}
