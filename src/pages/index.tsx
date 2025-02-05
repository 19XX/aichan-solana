import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import Head from "next/head";

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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

      const res = await fetch(`${apiUrl}/mint-reward`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userWallet: publicKey.toBase58(),
          amount: 1000000000, // 1 토큰
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white font-sans">
      <Head>
        <title>보상 토큰 발행</title>
      </Head>
      <div className="w-full max-w-xl p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20">
        <h1 className="text-4xl font-bold text-center mb-6">
          🚀 보상 토큰 발행 테스트
        </h1>

        <div className="flex justify-center mb-4">
          <WalletMultiButtonDynamic />
        </div>

        {publicKey && (
          <button
            onClick={handleReward}
            className={`w-full px-6 py-3 rounded-lg text-lg font-bold tracking-wide transition duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg"
            }`}
            disabled={loading}
          >
            {loading ? "보상 지급 중..." : "보상 받기 🎁"}
          </button>
        )}

        {txSignature && (
          <div className="mt-6 text-center">
            <p className="text-gray-400">트랜잭션 서명:</p>
            <a
              href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline transition duration-200 block"
            >
              {txSignature}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(txSignature)}
              className="mt-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              복사 📋
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
