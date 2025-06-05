import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Password Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className="antialiased bg-grey-850">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
