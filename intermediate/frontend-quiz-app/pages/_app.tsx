"use client";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import styles from "@/styles/App.module.css";
import Header from "@/components/header";
import Head from "next/head";
import data from "@/data.json";
import { useEffect, useState } from "react";
import { HeaderProps } from "@/lib/definitions";
import { ThemeProvider } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["italic", "normal"],
});

// Allows page transitions, maintain state, inject data, and global CSS
// Implement features that apply to the entire app
// _layout replaces this file and _document in /app

export default function App({ Component, pageProps }: AppProps) {
  const [headerData, setHeaderData] = useState<HeaderProps>({
    title: "",
    svgImage: "",
    bgColor: "",
  });

  const pathname = usePathname();
  const title = pathname?.replace("/results", "").replace("/", "");

  useEffect(() => {
    if (pageProps["title"] || title) {
      const quiz = data.quizzes.find(
        (q) =>
          q.title.toLowerCase() ===
            pageProps["title"]?.toString().toLowerCase() ||
          q.title.toLowerCase() === title
      );

      if (quiz) {
        setHeaderData({
          title: quiz.title,
          svgImage: quiz.icon,
          bgColor: quiz.bgColor,
        });
      }
    } else {
      // Reset header data if on main page
      setHeaderData({
        title: "",
        svgImage: "",
        bgColor: "",
      });
    }
  }, [pageProps["title"], title]);

  return (
    <ThemeProvider>
      <Head>
        <title>Frontend Quiz</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${styles.main_wrapper}`}>
        <div className={`background_img`}></div>
        <Header
          title={headerData.title}
          svgImage={headerData.svgImage}
          bgColor={headerData.bgColor}
        />
        <main className={`${styles.page_components} ${rubik.variable}`}>
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}
