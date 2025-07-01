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
import { useRouter } from "next/navigation";
import ErrorMsg from "@/components/errorMsg";

// Option letters
const letters = ["A", "B", "C", "D"];

export default function QuizPage({
  title,
  questions,
}: {
  title: string;
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
  const [resultsBtn, setResultsBtn] = useState<boolean>(false);

  const router = useRouter();

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

    document.getElementById(`${value}`)?.classList.add("selected");
  };

  // Handles submitting the question
  // Handles setting styles depending on user actions
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (selectedOption === "") {
      setError("Please select an answer");
      return;
    }

    setSubmitAnswer(!submitAnswer);
    setProgress(((currentQ + 1) / maxQuestions) * 100);

    // get answer from the selection
    // check if answer is correct
    // if it is, change the border color to green
    // if not, change the border color to red

    // Boolean check if the user is correct
    const ifCorrectAnswer = correctAnswer === selectedOption;
    setIfUserIsCorrect(ifCorrectAnswer);
    setScore(ifCorrectAnswer ? score + 1 : score);

    // If the user selected the correct answer, highlight the correct border color
    if (ifCorrectAnswer) {
      // Set the selected button styles to green

      document.getElementById(`${selectedOption}`)?.classList.add("correct");
    } else {
      // Set the selected button styles to red
      // Set the correct answer to green
      document.getElementById(`${selectedOption}`)?.classList.add("incorrect");
    }

    setDisableBtns(true);

    if (maxQuestions < currentQ + 2) {
      setResultsBtn(true);
    }
  };

  const handleNextQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (maxQuestions >= currentQ + 1) {
      setSubmitAnswer(!submitAnswer);
      setCurrentQ(currentQ + 1);

      setSelectedOption("");
      setDisableBtns(false);
      setIfUserIsCorrect(false);
    }

    return;
  };

  // Routes to the Results page with score and maxQuestions as search params
  const handleResults = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push(
      `/${title.toLowerCase()}/results?score=${score}&maxQ=${maxQuestions}`
    );
  };

  // keep track of the question
  // map over the options
  // save the number of correct answers
  return (
    <div className={`${styles.quiz_page}`}>
      <div className={`${styles.question_container}`}>
        <div className={`${styles.question}`}>
          <p className={`${fonts.txt_preset_5_i} ${fonts.font_styles_3}`}>
            Question {currentQ + 1} of {questions.length}
          </p>
          <h1 className={`${fonts.txt_preset_3} ${fonts.font_styles_2}`}>
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
      <div className={`${styles.btn_container}`}>
        <div className={`${styles.option_btns}`}>
          {options.map((option: string, key: number) => (
            <ThirdBtn
              key={option}
              content={option}
              letter={letters[key]}
              id={option}
              handleClick={(e) => handleSelection(e)}
              value={option}
              // QuizState props
              submitAnswer={submitAnswer}
              selectedOption={selectedOption}
              ifUserIsCorrect={ifUserIsCorrect}
              correctAnswer={correctAnswer}
              disableBtns={disableBtns}
            />
          ))}
        </div>

        {/* Render a 'Next Question' button or 'Submit Answer' button */}
        {/* Submit Answer renders when a user is on a new question */}
        {/* Next question renders when a user has submitted an answer > if (submitAnswer) */}

        {/* See Results should render when a user is finished  */}

        {!resultsBtn ? (
          submitAnswer ? (
            <PrimaryBtn
              content="Next Question"
              handleClick={(e) => handleNextQuestion(e)}
            />
          ) : (
            <PrimaryBtn
              content="Submit Answer"
              handleClick={(e) => handleSubmit(e)}
            />
          )
        ) : (
          <PrimaryBtn
            content="See Results"
            handleClick={(e) => handleResults(e)}
          />
        )}

        {/* Show error message if exists */}
        <div className={`${styles.error_container}`}>
          {error ? <ErrorMsg error={error} /> : ""}
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
  const title = quiz?.title;
  return {
    props: { title, questions },
  };
};
