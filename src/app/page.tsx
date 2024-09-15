"use client";
import TextAreaWithHighlightedWords from "../components/TextAreaWithHighlightedWords";
import styles from "./page.module.css";
import { useRef, useState } from "react";

interface TimeStampedWord {
  time: number;
  type: string;
  start: number;
  end: number;
  value: string;
}

export default function Home() {
  const [wordToSelect, setWordToSelect] = useState<string>("");
  const textAreaWithHighlightedWordsRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = textAreaWithHighlightedWordsRef.current?.value;

    const speechSynthesisPromise = fetch("/api/aws-polly/synthesize", {
      method: "POST",
      body: JSON.stringify({ text }),
    }).catch((error) => console.error(error));

    const speechMarksPromise = fetch("/api/aws-polly/speech-marks", {
      method: "POST",
      body: JSON.stringify({ text }),
    }).catch((error) => console.error(error));

    const [speechSynthesisResponse, speechMarksResponse] = (await Promise.all([
      speechSynthesisPromise,
      speechMarksPromise,
    ])) as [Response, Response];

    const speechMarks: { speechMarks: TimeStampedWord[] } =
      await speechMarksResponse.json();

    const audio = new Audio(
      URL.createObjectURL(await speechSynthesisResponse.blob())
    );

    audio.onplay = () => {
      speechMarks.speechMarks.forEach((word) => {
        setTimeout(() => {
          setWordToSelect(word.value);
        }, word.time);
      });
    };

    audio.play();
  }

  return (
    <main className={styles.main}>
      <TextAreaWithHighlightedWords
        ref={textAreaWithHighlightedWordsRef}
        wordToSelect={wordToSelect}
      />
      <form onSubmit={handleSubmit}>
        <button type="submit">Read</button>
      </form>
    </main>
  );
}
