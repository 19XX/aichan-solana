import { ReactNode, useMemo } from "react";
import dynamic from "next/dynamic";

const WalletProviderComponent = dynamic(() => {
  return import("@solana/wallet-adapter-react").then(
    ({ ConnectionProvider, WalletProvider }) => {
      return import("@solana/wallet-adapter-react-ui").then(({ WalletModalProvider }) => {
        return import("@solana/wallet-adapter-phantom").then(({ PhantomWalletAdapter }) => {
          return import("@solana/web3.js").then(({ clusterApiUrl }) => {
            const WalletProviderWrapper = ({ children }: { children: ReactNode }) => {
              const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
              const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

              return (
                <ConnectionProvider endpoint={endpoint}>
                  <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>{children}</WalletModalProvider>
                  </WalletProvider>
                </ConnectionProvider>
              );
            };

            // ✅ `displayName` 추가 (ESLint 오류 해결)
            WalletProviderWrapper.displayName = "WalletProviderComponent";

            return WalletProviderWrapper;
          });
        });
      });
    }
  );
}, { ssr: false });

export default WalletProviderComponent;
