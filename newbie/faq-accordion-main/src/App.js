import "./App.css";
import { useState } from "react";
// import faqs from "./data";
import Accordion from "./Accordion";

function App() {
  const faqs = [
    {
      question: "What is Frontend Mentor, and how will it help me?",
      answer:
        "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building",
    },
    {
      question: "Is Frontend Mentor free?",
      answer:
        "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building",
    },
    {
      question: "Can I use Frontend Mentor projects in my portfolio?",
      answer:
        "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building",
    },
    {
      question: "How can I get help if I'm stuck on a challenge?",
      answer:
        "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building",
    },
  ];

  return (
    <>
      <div>
        <div className="container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="41"
            fill="none"
            viewBox="0 0 40 41"
            className="star-logo"
          >
            <path
              fill="#AD28EB"
              d="M37.5 20.5a2.467 2.467 0 0 1-1.64 2.344l-9.913 3.604-3.603 9.911a2.5 2.5 0 0 1-4.688 0l-3.604-9.922-9.911-3.593a2.5 2.5 0 0 1 0-4.688l9.921-3.604 3.594-9.911a2.5 2.5 0 0 1 4.688 0l3.604 9.921 9.911 3.594A2.467 2.467 0 0 1 37.5 20.5Z"
            />
          </svg>
          <h1 className="title">FAQs</h1>
          <div className="questions">
            <div className="accordion">
              {/* Looping over the object and also getting rid of the last <hr /> */}
              {faqs.map((faq, id) => {
                const isLast = faqs.length - 1 === id;
                return (
                  <div key={id}>
                    <Accordion faq={faq} />
                    {!isLast && <hr />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
