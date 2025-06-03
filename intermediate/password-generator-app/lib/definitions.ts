export interface PwRequirements {
  "Uppercase Letters": string;
  "Lowercase Letters": string;
  Numbers: string;
  Symbols: string;
  [key: string]: string;
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
