import { useEffect, useState } from "react";
import { findStartAndEndOfWordFromText } from "../app/helpers";

interface ISelectTextAreaProps {
  wordToSelect: string;
  text: string;
  setText: (text: string) => void;
}

export default function TextAreaWithHighlightedWords({
  wordToSelect,
  text,
  setText,
}: ISelectTextAreaProps) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    if (!isInputFocused) {
      const input: HTMLTextAreaElement | null = document.getElementById(
        "text-box"
      ) as HTMLTextAreaElement;
      input?.focus();
      const [start, end] = findStartAndEndOfWordFromText(text, wordToSelect);
      try {
        input?.setSelectionRange(start, end);
      } catch (error) {
        console.error(error);
      }
    }
  }, [isInputFocused, text, wordToSelect]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  function handleClickOutside(event: MouseEvent) {
    const input: HTMLTextAreaElement | null = document.getElementById(
      "text-box"
    ) as HTMLTextAreaElement;
    if (input && !input.contains(event.target as Node)) {
      setIsInputFocused(false);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function handleClick() {
    setIsInputFocused(true);
  }

  return (
    <textarea
      onChange={handleChange}
      onClick={handleClick}
      id="text-box"
      value={text}
      style={{ minWidth: "50vw", minHeight: "30vh" }}
    />
  );
}
