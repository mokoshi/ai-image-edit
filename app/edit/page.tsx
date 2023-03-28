"use client";

import {
  Button,
  Container,
  Grid,
  GridItem,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

async function generateImage(prompt: string) {
  const response = await fetch("/api/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  return data.urls as string[];
}

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);

  return (
    <Container w={"80%"} p={16}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsFetching(true);
          const generated = await generateImage(prompt).finally(() =>
            setIsFetching(false)
          );
          setUrls([...generated, ...urls]);
        }}
      >
        <VStack spacing={4}>
          <Textarea
            placeholder="Enter prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button type="submit" isLoading={isFetching}>
            生成
          </Button>
        </VStack>
      </form>

      <Grid mt={8} templateColumns="repeat(4, 1fr)" gap={2}>
        {urls.map((url) => (
          <GridItem key={url}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={url} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}
