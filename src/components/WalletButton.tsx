import { useWallet } from "@solana/wallet-adapter-react";

export const WalletButton = () => {
  const { connect, disconnect, publicKey } = useWallet();

  return (
    <div>
      {publicKey ? (
        <button
          onClick={disconnect}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Disconnect Wallet
        </button>
      ) : (
        <button
          onClick={connect}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};
