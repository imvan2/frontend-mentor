import styles from "@/styles/Home.module.css";
import fonts from "@/styles/Fonts.module.css";
import SecondaryBtn from "@/components/secondaryBtn";
import data from "@/data.json";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleQuizSelection = (quizTitle: string) => {
    router.push(`/${quizTitle.toLowerCase()}`);
  };
  return (
    <div className={`${styles.home_container}`}>
      {/* Title */}
      <section className={styles.title_container}>
        <h1 className={`${fonts.txt_preset_2_light} ${fonts.font_styles_1}`}>
          Welcome to the{" "}
          <span className={`${fonts.txt_preset_2_med} ${fonts.font_styles_1}`}>
            Frontend Quiz!
          </span>
        </h1>
        <p className={`${fonts.txt_preset_5_i} ${fonts.font_styles_3}`}>
          Pick a subject to get started.
        </p>
      </section>

      <div className={styles.main}>
        {data["quizzes"].map((quiz) => (
          <SecondaryBtn
            key={quiz.title}
            content={quiz.title}
            svgImage={quiz.icon}
            bgColor={quiz.bgColor}
            handleClick={() => handleQuizSelection(quiz.title)}
          />
        ))}
      </div>
    </div>
  );
}
