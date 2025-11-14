"use client";
import { useState } from "react";
import { useSeedPhraseValidation } from "../hooks/useSeedPhraseValidation";

export default function SeedPhraseModal({
  open = true,
  seedPhrase = [],
  onClose,
  onContinue,
  mode = "display", // "display" or "input"
  onRestoreWallet,
}: {
  open?: boolean;
  seedPhrase?: string[];
  onClose?: () => void;
  onContinue?: () => void;
  mode?: "display" | "input";
  onRestoreWallet?: (seedPhrase: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const { wordlist, isLoading, validateWord, validateSeedPhrase } =
    useSeedPhraseValidation();
  const [seedWords, setSeedWords] = useState(Array(12).fill(""));
  const [wordValidationStates, setWordValidationStates] = useState(
    Array(12).fill(true)
  );
  const [seedPhraseErrors, setSeedPhraseErrors] = useState<string[]>([]);

  if (!open) return null;

  // Handle word changes with real-time validation
  const handleWordChange = (index: number, value: string) => {
    const newWords = [...seedWords];
    newWords[index] = value;
    setSeedWords(newWords);

    // Validate individual word
    if (value.trim() && !isLoading) {
      const isValid = validateWord(value);
      const newValidationStates = [...wordValidationStates];
      newValidationStates[index] = isValid;
      setWordValidationStates(newValidationStates);
    }

    // Validate entire seed phrase
    const seedPhrase = newWords.join(" ");
    if (seedPhrase.trim()) {
      const validation = validateSeedPhrase(seedPhrase);
      setSeedPhraseErrors(validation.errors);
    } else {
      setSeedPhraseErrors([]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const text = e.clipboardData.getData("text") || "";
    const parts = text.trim().split(/\s+/).slice(0, 12);

    if (parts.length === 0) return;

    // Fill all 12 boxes
    const newWords = [...seedWords];
    parts.forEach((word, i) => {
      if (i < 12) newWords[i] = word.toLowerCase();
    });

    setSeedWords(newWords);

    // Validate each word individually
    const newValidation = [...wordValidationStates];
    newWords.forEach((w, i) => {
      newValidation[i] = validateWord(w);
    });
    setWordValidationStates(newValidation);

    // Validate total phrase
    const phrase = newWords.join(" ");
    const validation = validateSeedPhrase(phrase);
    setSeedPhraseErrors(validation.errors);
  };

  const handleCopy = () => {
    if (seedPhrase.length) {
      navigator.clipboard.writeText(seedPhrase.join(" "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <h2 className="text-slate-900 font-semibold text-lg">
          {mode === "display"
            ? "Your 12-word seed phrase"
            : "Enter your seed phrase"}
        </h2>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700 text-sm font-medium"
        >
          ✕ Close
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-scroll px-6 sm:px-10 py-10">
        <div className="max-w-2xl mx-auto">
          <p className="text-slate-600 text-center">
            {mode === "display"
              ? "Write down these words in order and keep them safe. They are the only way to recover your wallet."
              : "Enter your 12-word seed phrase to restore your wallet."}
          </p>

          {mode === "display" ? (
            <>
              {/* Display mode - show generated seed phrase */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {seedPhrase.map((word, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-slate-100 rounded-xl text-slate-900 flex items-center justify-between text-sm font-medium"
                  >
                    <span>{index + 1}.</span>
                    <span>{word}</span>
                  </div>
                ))}
              </div>

              {/* Copy confirmation */}
              <div className="mt-4 text-center text-sm text-slate-500">
                {copied ? (
                  <span className="text-emerald-600 font-medium">
                    Copied to clipboard ✓
                  </span>
                ) : (
                  "Make sure no one is watching your screen."
                )}
              </div>
            </>
          ) : (
            <>
              {/* Input mode - allow user to enter seed phrase */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Array.from({ length: 12 }, (_, index) => (
                  <div key={index} className="relative">
                    <div className="px-2 py-1 text-xs text-slate-500 mb-1">
                      {index + 1}.
                    </div>
                    <input
                      type="text"
                      value={seedWords[index]}
                      onChange={(e) => handleWordChange(index, e.target.value)}
                      onPaste={handlePaste}
                      className={`w-full px-3 py-2 rounded-xl border text-sm font-medium transition-colors text-black placeholder:text-slate-400 ${
                        wordValidationStates[index]
                          ? "border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                          : "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      }`}
                      placeholder={`Word ${index + 1}`}
                    />
                    {!wordValidationStates[index] &&
                      seedWords[index].trim() && (
                        <div className="absolute -bottom-5 left-0 text-xs text-red-500">
                          Invalid word
                        </div>
                      )}
                  </div>
                ))}
              </div>

              {/* Validation errors */}
              {seedPhraseErrors.length > 0 && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <h4 className="text-red-800 font-medium text-sm mb-2">
                    Please fix the following errors:
                  </h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    {seedPhraseErrors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 sm:px-10 py-6 border-t border-slate-200">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
          {mode === "display" ? (
            <>
              <button
                onClick={handleCopy}
                className="flex-1 h-12 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
              >
                {copied ? "Copied!" : "Copy Seed Phrase"}
              </button>

              <button
                onClick={onContinue}
                className="flex-1 h-12 rounded-xl border border-emerald-500 text-emerald-500 font-semibold hover:bg-emerald-50 transition-colors"
              >
                Continue
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                console.log("Button clicked!");
                const seedPhrase = seedWords.join(" ");
                console.log("Seed phrase:", seedPhrase);
                const validation = validateSeedPhrase(seedPhrase);
                console.log("Validation result:", validation);

                if (validation.isValid) {
                  // Restore wallet logic
                  console.log("Restoring wallet with seed phrase:", seedPhrase);
                  if (onRestoreWallet) {
                    onRestoreWallet(seedPhrase);
                  }
                } else {
                  console.log("Validation errors:", validation.errors);
                  setSeedPhraseErrors(validation.errors);
                }
              }}
              // disabled={seedPhraseErrors.length > 0 || seedWords.some(word => !word.trim())}
              className="flex-1 h-10 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Restore Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
