import "../styles/globals.css";
import type { AppProps } from "next/app";
import WalletProviderComponent from "../components/WalletProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProviderComponent>
      <Component {...pageProps} />
    </WalletProviderComponent>
  );
}
