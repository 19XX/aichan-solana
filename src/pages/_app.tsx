import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WalletProviderComponent } from "../components/WalletProvider";
import { Montserrat, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.className} ${montserrat.className}`}>
      <WalletProviderComponent>
        <Component {...pageProps} />
      </WalletProviderComponent>
    </div>
  );
}

export default MyApp;
