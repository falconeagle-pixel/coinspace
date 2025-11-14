"use client";
export default function GeneratePassphraseModal({
  open = true,
  onBack,
  onClose,
  onGenerate,
}: {
  open?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  onGenerate?: () => void;
}) {
  if (!open) return null;

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
          <h2 className="text-slate-900 font-semibold text-lg">New wallet</h2>
        </div>

        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-700 text-sm font-medium"
        >
          ✕ Close
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="h-12 w-12 rounded-xl bg-emerald-50 grid place-items-center text-emerald-600 text-xl">
            🪙
          </div>

          <h3 className="mt-6 text-2xl font-semibold text-slate-900 leading-snug">
            We are about to generate your
            <br /> very own passphrase
          </h3>

          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            This allows you to open your wallet on multiple devices and keeps it
            secure.
          </p>

          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            It is{" "}
            <span className="font-semibold text-slate-900">very important</span>{" "}
            to write down the passphrase and store it somewhere safe. Losing it
            means losing access to your wallet permanently.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 sm:px-10 py-6 border-t border-slate-200">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onGenerate}
            className="w-full h-12 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
          >
            Generate passphrase
          </button>
        </div>
      </div>
    </div>
  );
}
