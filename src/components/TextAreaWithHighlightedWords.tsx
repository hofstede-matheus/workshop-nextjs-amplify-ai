import { forwardRef, useEffect, useState } from "react";

interface ISelectTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  wordToSelect: string;
}

const TextAreaWithHighlightedWords = forwardRef<
  HTMLTextAreaElement,
  ISelectTextAreaProps
>(({ wordToSelect }, itemRef) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [text, setText] = useState<string>("This text has NOT been updated.");

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

  function findStartAndEndOfWordFromText(
    text: string,
    word: string
  ): [number, number] {
    const start = text.indexOf(word);
    const end = start + word.length;
    return [start, end];
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
      id="text-box"
      value={text}
      style={{ minWidth: "50vw", minHeight: "30vh" }}
      onClick={handleClick}
      ref={itemRef}
    />
  );
});

TextAreaWithHighlightedWords.displayName = "TextAreaWithHighlightedWords";

export default TextAreaWithHighlightedWords;
