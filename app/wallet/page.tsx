"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SeedPhraseModal from "../../components/SeedPhraseModal";

export default function WalletPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);

  const mode = useMemo(() => {
    const qp = searchParams?.get("mode");
    return qp === "input" ? "input" : "display";
  }, [searchParams]);

  useEffect(() => {
    if (mode === "display") {
      try {
        const stored =
          typeof window !== "undefined"
            ? localStorage.getItem("seedPhrase")
            : null;
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setSeedPhrase(parsed as string[]);
          }
        }
      } catch {}
    }
  }, [mode]);

  const handleClose = () => {
    router.push("/");
  };

  const handleContinue = () => {
    router.push("/");
  };

  const handleRestored = (phrase: string) => {
    try {
      localStorage.setItem("restoredSeedPhrase", JSON.stringify(phrase));
    } catch {}
    router.push("/");
  };

  const AnySeedPhraseModal = SeedPhraseModal as any;

  return (
    <main className="min-h-dvh bg-[#2c3832] text-white">
      <AnySeedPhraseModal
        open={true}
        seedPhrase={seedPhrase}
        onClose={handleClose}
        onContinue={handleContinue}
        onRestoreWallet={handleRestored}
        mode={mode as "display" | "input"}
      />
    </main>
  );
}
