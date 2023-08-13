import Link from "next/link";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <nav>
        <Link href="/" passHref>
          Alexis CONIA
        </Link>
        <Link href="/about" passHref>
          about
        </Link>
      </nav>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>2023 - Alexis CONIA - Software Engineer - Microsoft MVP</footer>
    </div>
  );
}

export default MyApp;
