"use client";

import PasswordInput from "./password-input";
import Checkbox from "./checkbox";
import Slider from "./slider";
import StrengthIndicator from "./strength-indicator";
import Button from "./button";
import React, { createContext, useState } from "react";

export const Context = createContext({
    char,
    progress
});

export default function Layout() {
  const maxChar = 20;
  const [char, setChar] = useState<number>(10);
  const [progress, setProgress] = useState<number>((char / maxChar) * 100);
  return (
    <Context.Provider value={{ char, progress }} className="w-full">
      <h1 className="text-center font-display text-preset-4 text-grey-600 w-full mb-4">
        Password Generator
      </h1>
      <div className={`font-display w-full`}>
        <PasswordInput />
        <div className="w-full bg-grey-800">
          <Slider />
          <Checkbox />
          <StrengthIndicator />
          <Button />
        </div>
      </div>
    </Context.Provider>
  );
}
