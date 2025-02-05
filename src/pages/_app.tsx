import "../styles/globals.css";
import type { AppProps } from "next/app";
import WalletProviderComponent from "../components/WalletProvider";
import { Montserrat, Inter } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProviderComponent>
      <main className={`${montserrat.className} ${inter.className}`}>
        <Component {...pageProps} />
      </main>
    </WalletProviderComponent>
  );
}

export default MyApp;
