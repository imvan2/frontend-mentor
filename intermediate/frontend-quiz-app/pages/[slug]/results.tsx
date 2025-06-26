"use client";

import { useSearchParams } from "next/navigation";
import styles from "@/styles/Home.module.css";
import fonts from "@/styles/Fonts.module.css";
import { useRouter } from "next/navigation";
import PrimaryBtn from "@/components/primaryBtn";
import { HeaderProps } from "@/lib/definitions";
import { useState, useEffect } from "react";
import data from "@/data.json";
import Image from "next/image";
import results from "@/styles/Results.module.css";
import { usePathname } from "next/navigation";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pathname = usePathname();
  const title = pathname?.replace("/results", "").replace("/", "");

  const [headerData, setHeaderData] = useState<HeaderProps>({
    title: "",
    svgImage: "",
    bgColor: "",
  });

  useEffect(() => {
    if (title) {
      const quiz = data.quizzes.find(
        (q) => q.title.toLowerCase() === title.toString().toLowerCase()
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
  }, [title]);

  const score = searchParams.get("score");
  const maxQ = searchParams.get("maxQ");

  const handlePlayAgain = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <section className={`${results.page}`}>
      <h1 className={`${results.title} ${fonts.txt_preset_2_l}`}>
        Quiz completed <br />{" "}
        <span className={`${fonts.txt_preset_2_med}`}>You scored...</span>
      </h1>

      <div className={`${results.results_container}`}>
        <div className={`${styles.icon_container}`}>
          <div style={{ backgroundColor: `${headerData.bgColor}` }}>
            {headerData.svgImage && headerData.svgImage.length > 0 ? (
              <Image
                src={headerData.svgImage}
                alt={`${title} icon`}
                width={29}
                height={29}
              />
            ) : (
              ""
            )}
          </div>

          <span className={`${fonts.txt_preset_4}`}>{headerData.title}</span>
        </div>

        <div className={`${results.score_container}`}>
          <p className={`${results.score} ${fonts.txt_preset_1}`}>{score}</p>
          <p className={`${results.maxQ}`}>out of {maxQ}</p>
        </div>
      </div>

      <PrimaryBtn content="Play Again" handleClick={handlePlayAgain} />
    </section>
  );
}
