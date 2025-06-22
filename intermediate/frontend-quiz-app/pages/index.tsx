import styles from "@/styles/Home.module.css";
import Link from "next/link";
import fonts from "@/styles/Fonts.module.css";
import SecondaryBtn from "@/components/secondaryBtn";
import data from "@/data.json";

export default function Home() {
  return (
    <div className={`${styles.home_container}`}>
      <section className={styles.title_container}>
        <h1 className={`${fonts.txt_preset_2_l} ${styles.title}`}>
          Welcome to the{" "}
          <span className={`${fonts.txt_preset_2_med}`}>Frontend Quiz!</span>
        </h1>
        <p className={`${fonts.txt_preset_5_i}`}>
          Pick a subject to get started.
        </p>
      </section>

      <div className={styles.main}>
        {data["quizzes"].map((quiz) => (
          <Link href={`/${quiz.title.toLowerCase()}`} key={quiz.title}>
            <SecondaryBtn
              content={quiz.title}
              svgImage={quiz.icon}
              bgColor={quiz.bgColor}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
