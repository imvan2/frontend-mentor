"use client";

import PrimaryBtn from "@/components/primaryBtn";
import data from "@/data.json";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState, useReducer } from "react";
import shuffleArray from "@/utils/shuffleArray";
import ThirdBtn from "@/components/thirdBtn";
import fonts from "@/styles/Fonts.module.css";
import styles from "@/styles/QuizPage.module.css";
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
  const [options, setOptions] = useState([]);
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const maxQuestions = questions.length;

  const [quizState, dispatch] = useReducer(QuizStateReducer, initialQuizState);

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

    dispatch({
      type: "select option",
      selectedOption: value,
      correctAnswer: questions[currentQ].answer,
      ifUserIsCorrect: value == questions[currentQ].answer,
    });
    setError("");

    // document.getElementById(`${value}`)?.classList.add("selected");
  };

  // Handles submitting the question
  // Handles setting styles depending on user actions
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (quizState.selectedOption === "") {
      setError("Please select an answer");
      return;
    }

    // Boolean check if the user is correct
    const ifCorrectAnswer =
      quizState.correctAnswer === quizState.selectedOption;

    setScore(ifCorrectAnswer ? score + 1 : score);

    if (maxQuestions < currentQ + 2) {
      dispatch({
        type: "submit",
        resultsBtn: true,
        disableBtns: true,
      });
    } else {
      dispatch({
        type: "submit",
        resultsBtn: false,
        ifUserIsCorrect: ifCorrectAnswer,
        disableBtns: true,
        submitAnswer: true,
      });
    }
  };

  const handleNextQuestion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (maxQuestions >= currentQ + 1) {
      // setSubmitAnswer(!submitAnswer);
      setCurrentQ(currentQ + 1);

      dispatch({
        type: "next",
      });
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
            style={{ width: `${((currentQ + 1) / maxQuestions) * 100}%` }}
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
              submitAnswer={quizState.submitAnswer}
              selectedOption={quizState.selectedOption}
              ifUserIsCorrect={quizState.ifUserIsCorrect}
              correctAnswer={quizState.correctAnswer}
              disableBtns={quizState.disableBtns}
            />
          ))}
        </div>

        {/* Render a 'Next Question' button or 'Submit Answer' button */}
        {/* Submit Answer renders when a user is on a new question */}
        {/* Next question renders when a user has submitted an answer > if (submitAnswer) */}

        {/* See Results should render when a user is finished  */}

        {!quizState.resultsBtn ? (
          quizState.submitAnswer ? (
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

function QuizStateReducer(quizState, action) {
  switch (action.type) {
    // Handle option selection
    // Keep track of the answer selected
    // Keep track of the correct answer
    case "select option": {
      return {
        ...quizState,
        selectedOption: action.selectedOption,
        correctAnswer: action.correctAnswer,
        ifUserIsCorrect: action.ifUserIsCorrect,
      };
    }
    case "submit": {
      return {
        ...quizState,
        resultsBtn: action.resultsBtn,
        disableBtns: action.disableBtns,
        submitAnswer: action.submitAnswer,
      };
    }
    case "next": {
      return {
        ...initialQuizState,
      };
    }
  }
}

const initialUserActions = {
  submitAnswer: false,
  error: "",
  score: 0,
};

const initialQuizState = {
  submitAnswer: false,
  selectedOption: "",
  correctAnswer: "",
  ifUserIsCorrect: false,
  resultsBtn: false,
  disableBtns: false,
};
