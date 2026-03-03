import "@/src/styles/global.scss";
import type { AppProps } from "next/app";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
