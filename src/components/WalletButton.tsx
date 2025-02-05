import { useWallet } from "@solana/wallet-adapter-react";

const WalletButton = () => {
  const wallet = useWallet();

  if (!wallet) return <button>Loading...</button>;

  const { connect, disconnect, publicKey } = wallet;

  return (
    <button
      onClick={publicKey ? disconnect : connect}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {publicKey ? "Disconnect Wallet" : "Connect Wallet"}
    </button>
  );
};

export default WalletButton;
