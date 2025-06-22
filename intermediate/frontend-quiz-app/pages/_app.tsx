"use client";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";
import Head from "next/head";
import { useRouter } from "next/router";
import data from "@/data.json";
import { useEffect, useState } from "react";
import { HeaderProps } from "@/lib/definitions";
import { ThemeProvider } from "@/context/ThemeContext";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["italic", "normal"],
});

// Allows page transitions, maintain state, inject data, and global CSS
// Implement features that apply to the entire app
// _layout replaces this file and _document in /app

// TODO: Fix the header for this when url changes
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [headerData, setHeaderData] = useState<HeaderProps>({
    title: "",
    svgImage: "",
    bgColor: "",
  });

  useEffect(() => {
    const { slug } = router.query;

    if (slug) {
      const quiz = data.quizzes.find(
        (q) => q.title.toLowerCase() === slug.toString().toLowerCase()
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
  }, [router.isReady, router.query]);

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
        <main className={`${styles.page} ${rubik.variable}`}>
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}
