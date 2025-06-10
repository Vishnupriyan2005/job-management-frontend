import Link from 'next/link';
import { Button, Container, Title } from '@mantine/core';

export default function Home() {
  return (
    <Container>
      <Title>Welcome to Job Management</Title>
      <Link href="/jobs">
        <Button mt="md">Go to Job Board</Button>
      </Link>
    </Container>
  );
}
