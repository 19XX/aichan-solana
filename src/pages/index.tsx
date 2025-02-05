import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  const handleReward = async () => {
    if (!publicKey) {
      alert("지갑이 연결되지 않았습니다!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/mint-reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userWallet: publicKey.toBase58(),
          amount: 1000000000,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setTxSignature(data.signature);
        alert("보상이 성공적으로 지급되었습니다!");
      } else {
        alert(`보상 지급 실패: ${data.error}`);
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      alert("보상 지급 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-6">
          보상 토큰 발행
        </h1>
        <div className="flex justify-center mb-4">
          <WalletMultiButtonDynamic />
        </div>
        {publicKey && (
          <button
            onClick={handleReward}
            className={`w-full py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "보상 지급 중..." : "보상 받기"}
          </button>
        )}
        {txSignature && (
          <div className="mt-4 text-center">
            <p>트랜잭션 서명:</p>
            <p className="text-blue-400">{txSignature}</p>
          </div>
        )}
      </div>
    </div>
  );
}
