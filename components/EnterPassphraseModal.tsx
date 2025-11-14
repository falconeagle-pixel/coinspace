"use client";
import { useState } from "react";

export default function EnterPassphraseModal({
  open = true,
  onClose,
  onBack,
  onConfirm,
}: {
  open?: boolean;
  onClose?: () => void;
  onBack?: () => void;
  onConfirm?: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  if (!open) return null;

  const words = value.trim().split(/\s+/).filter(Boolean);
  const isValid = words.length === 12;

  const handleConfirm = () => {
    if (isValid) onConfirm?.(value.trim());
  };

  return (
    <div className="fixed inset-0 z-60 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-9 w-9 grid place-items-center rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Back"
          >
            ←
          </button>
          <h2 className="text-slate-900 font-semibold text-lg">
            Enter passphrase
          </h2>
        </div>

        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700 text-sm font-medium"
        >
          ✕ Close
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8">
        <div className="max-w-2xl mx-auto">
          <label className="block text-sm text-slate-600 mb-2">
            Passphrase (12 words)
          </label>
          <textarea
            rows={5}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 resize-none"
            placeholder="Enter your 12-word passphrase separated by spaces"
          />
          <p
            className={`mt-2 text-sm ${
              isValid ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {words.length} / 12 words
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 sm:px-10 py-6 border-t border-slate-200">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleConfirm}
            disabled={!isValid}
            className="w-full h-12 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>

          <button
            className="mt-4 block mx-auto text-emerald-600 hover:text-emerald-700 text-sm"
            onClick={() =>
              window.open(
                "https://support.coin.space/hc/en-us/articles/115001633527-What-is-a-passphrase?tf_24464158=v6.19.0%40web+%28b2d7bc7%29",
                "_blank"
              )
            }
          >
            What is a passphrase?
          </button>
        </div>
      </div>
    </div>
  );
}
