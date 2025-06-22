"use client";

import PrimaryBtn from "@/components/primaryBtn";
import data from "@/data.json";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import shuffleArray from "@/utils/shuffleArray";
import buttons from "@/styles/Buttons.module.css";
import ThirdBtn from "@/components/thirdBtn";
import fonts from "@/styles/Fonts.module.css";
import styles from "@/styles/QuizPage.module.css";
import Image from "next/image";

// Option letters
const letters = ["A", "B", "C", "D"];

// Set HTML for the correct icons
const incorrectIcon =
  "<Image src='../images/icon-incorrect.svg' alt='icon' width={50} height={50}/>";
const correctIcon =
  "<Image src='../images/icon-correct.svg' alt='icon' width={50} height={50}/>";

export default function QuizPage({
  questions,
}: {
  questions: { question: string; options: string[]; answer: string }[];
}) {
  // Question state
  const [options, setOptions] = useState([]);
  const [currentQ, setCurrentQ] = useState<number>(0);

  // Keeping track of user actions
  // Whether or not the user submitted an answer
  const [submitAnswer, setSubmitAnswer] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const [progess, setProgress] = useState<number>(1);
  const [disableBtns, setDisableBtns] = useState<boolean>(false);
  const maxQuestions = questions.length;

  // Need to keep track of the answer the user selected AND the correct answer
  // Need to keep track of whether or not the user was correct
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [ifUserIsCorrect, setIfUserIsCorrect] = useState<boolean>(false);

  // Shuffle question options every time
  useEffect(() => {
    const shuffledArray = shuffleArray(questions[currentQ].options);
    setOptions(shuffledArray);
  }, [currentQ]);

  // Handle option selection
  // Keep track of the answer selected
  // Keep track of the correct answer
  const handleSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;

    setSelectedOption(value);
    setCorrectAnswer(questions[currentQ].answer);
    setError("");
  };

  // Handles submitting the question
  // Handles setting styles depending on user actions
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("selectedOption", selectedOption);
    if (selectedOption === "") {
      setError("Please select an answer");
      return;
    }

    setSubmitAnswer(!submitAnswer);

    // get answer from the selection
    // check if answer is correct
    // if it is, change the border color to green
    // if not, change the border color to red

    // Boolean check if the user is correct
    const ifCorrectAnswer = correctAnswer === selectedOption;
    setIfUserIsCorrect(ifCorrectAnswer);
    setScore(ifCorrectAnswer ? score + 1 : score);
    if (ifCorrectAnswer) {
      // Set the selected button styles to green
      document.getElementById(`${selectedOption}`)?.classList.add("correct");
    } else {
      // Set the selected button styles to red
      // Set the correct answer to green
      document.getElementById(`${selectedOption}`)?.classList.add("incorrect");
      document.getElementById(`${correctAnswer}`)?.classList.add("correct");
    }

    setDisableBtns(true);
  };

  const handleNextQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSubmitAnswer(!submitAnswer);
    setCurrentQ(currentQ + 1);
    setProgress(((currentQ + 1) / maxQuestions) * 100);
    setSelectedOption("");
    setDisableBtns(false);
  };

  // keep track of the question
  // map over the options
  // save the number of correct answers
  return (
    <div className={`${styles.quiz_page}`}>
      <div className={`${styles.question_container}`}>
        <div className={`${styles.question}`}>
          <p className={`${fonts.txt_preset_5_i}`}>
            Question {currentQ + 1} of {questions.length}
          </p>
          <h1 className={`${fonts.txt_preset_3}`}>
            {questions[currentQ].question}
          </h1>
        </div>
        <div className={`${styles.progress_bar}`}>
          <div
            className={`${styles.progress}`}
            style={{ width: `${progess}%` }}
          ></div>
        </div>
      </div>
      <div className={`${buttons.btn_container}`}>
        <div className={`${buttons.option_btns}`}>
          {options.map((option: string, key: number) => (
            <ThirdBtn
              key={option}
              content={option}
              letter={letters[key]}
              id={option}
              handleClick={(e) => handleSelection(e)}
              value={option}
              correctIcon={correctIcon}
              incorrectIcon={incorrectIcon}
              disableBtns={disableBtns}
            />
          ))}
        </div>

        {submitAnswer ? (
          <PrimaryBtn
            content="Next Question"
            handleClick={(e) => handleNextQuestion(e)}
          />
        ) : (
          <PrimaryBtn
            content="Submit Answer"
            handleClick={(e) => handleSubmit(e)}
          />
        )}
        <div className={`${styles.error_container}`}>
          {error ? (
            <>
              <Image
                src="../images/icon-incorrect.svg"
                alt="icon"
                width={24}
                height={24}
              />
              <span className={`${fonts.txt_preset_4}`}>{error}</span>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = data.quizzes.map((quiz) => ({
    params: { slug: quiz.title.toLowerCase() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const quiz = data.quizzes.find(
    (q) => q.title.toLowerCase() === params?.slug?.toString().toLowerCase()
  );
  const questions = shuffleArray(quiz?.questions);
  return {
    props: { quiz, questions },
  };
};
