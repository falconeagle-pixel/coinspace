"use client";

import { useState, useEffect } from "react";

export function useSeedPhraseValidation() {
  const [isLoading, setIsLoading] = useState(true);
  const [wordlist, setWordlist] = useState<string[]>([]);

  // Load the BIP39 wordlist from seedphrase.txt
  useEffect(() => {
    const loadWordlist = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/seedphrase.txt");
        const text = await response.text();
        const words = text
          .trim()
          .split("\n")
          .map((word) => word.trim());
        setWordlist(words);
      } catch (error) {
        console.error("Failed to load wordlist:", error);
        // Fallback to empty array if loading fails
        setWordlist([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadWordlist();
  }, []);

  // Validate individual word
  const validateWord = (word: string): boolean => {
    if (!word || !word.trim()) return true; // Empty words are considered valid initially
    if (isLoading || wordlist.length === 0) return true; // Don't validate while loading
    return wordlist.includes(word.toLowerCase().trim());
  };

  // Validate complete seed phrase
  const validateSeedPhrase = (seedPhrase: string) => {
    const words = seedPhrase
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const errors: string[] = [];

    // Check word count
    if (words.length === 0) {
      return { isValid: false, errors: ["Please enter your seed phrase"] };
    }

    if (words.length !== 12) {
      errors.push(
        `Seed phrase must contain exactly 12 words. You have ${words.length} words.`
      );
    }

    // Only validate words if wordlist is loaded
    if (!isLoading && wordlist.length > 0) {
      // Check each word
      const invalidWords: number[] = [];
      words.forEach((word, index) => {
        if (!validateWord(word)) {
          invalidWords.push(index + 1);
        }
      });

      if (invalidWords.length > 0) {
        errors.push(`Invalid words at positions: ${invalidWords.join(", ")}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return {
    wordlist,
    isLoading,
    validateWord,
    validateSeedPhrase,
  };
}
