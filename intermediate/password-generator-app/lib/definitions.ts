import React from "react";

export interface PasswordProps {
  password: string;
  copyClicked: boolean;
  setCopyClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CharLengthProps {
  charLength: number;
  setCharLength: React.Dispatch<React.SetStateAction<number>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  maxChar: number;
  style: string;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
}

export interface PasswordRequirementsProps {
  setCheckMarks: React.Dispatch<React.SetStateAction<PwChecks>>;
  setCombinedString: React.Dispatch<React.SetStateAction<string>>;
  setStrength: React.Dispatch<React.SetStateAction<number>>;
  checkmarks: PwChecks;
  combinedString: string;
  strength: number;
  checkmarkError: string;
  setCheckmarkError: React.Dispatch<React.SetStateAction<string>>;
}

export interface PwRequirements {
  "Uppercase Letters": string;
  "Lowercase Letters": string;
  Numbers: string;
  Symbols: string;
  [key: string]: string;
}

export interface StrengthIndicatorProps {
  strength: number;
}

export interface PwChecks {
  "Uppercase Letters": boolean;
  "Lowercase Letters": boolean;
  Numbers: boolean;
  Symbols: boolean;
  [key: string]: boolean;
}

interface Indicator {
  label: string;
  bg: string;
  border: string;
}

export interface Indicators {
  1: Indicator;
  2: Indicator;
  3: Indicator;
  4: Indicator;
}

export interface GenerateBtnProps {
  charLength: number;
  combinedString: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setCheckmarkError: React.Dispatch<React.SetStateAction<string>>;
}
