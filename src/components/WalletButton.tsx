import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const WalletAdapterReact = dynamic(
  async () => (await import("@solana/wallet-adapter-react")).useWallet,
  { ssr: false }
);

export const WalletButton = () => {
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    async function loadWallet() {
      const { useWallet } = await import("@solana/wallet-adapter-react");
      setWallet(useWallet);
    }
    loadWallet();
  }, []);

  if (!wallet) return <button>Loading...</button>;

  const { connect, disconnect, publicKey } = wallet();

  return (
    <button
      onClick={publicKey ? disconnect : connect}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {publicKey ? "Disconnect Wallet" : "Connect Wallet"}
    </button>
  );
};
