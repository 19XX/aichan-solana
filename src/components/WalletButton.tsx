import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const WalletButton = () => {
  return (
    <div className="flex justify-center">
      <WalletMultiButtonDynamic />
    </div>
  );
};

export default WalletButton;
