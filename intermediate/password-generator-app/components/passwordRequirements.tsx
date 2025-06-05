import { PwRequirements, PasswordRequirementsProps } from "@/lib/definitions";

const checks: string[] = [
  "Uppercase Letters",
  "Lowercase Letters",
  "Numbers",
  "Symbols",
];

const pwRequirements: PwRequirements = {
  "Uppercase Letters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "Lowercase Letters": "abcdefghijklmnopqrstuvwxyz",
  Numbers: "0123456789",
  Symbols: "!@#$%^&*()_+",
};

export default function PasswordRequiments({
  setCheckMarks,
  setCombinedString,
  setStrength,
  checkmarks,
  combinedString,
  strength,
  checkmarkError,
  setCheckmarkError,
}: PasswordRequirementsProps) {
  // Setting password requirements and handling checkboxes
  const handleCheckmarks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckMarks({ ...checkmarks, [e.target.value]: e.target.checked });

    setCombinedString(
      e.target.checked
        ? combinedString + pwRequirements[e.target.value]
        : combinedString.replace(pwRequirements[e.target.value], "")
    );
    setStrength(e.target.checked ? strength + 1 : strength - 1);

    // Remove error when clicked
    setCheckmarkError("");
  };

  return (
    <div className="w-full flex flex-col gap-4 text-grey-200">
      {checks.map((check, key) => {
        return (
          <div key={key} className="flex flex-row gap-[20px] items-center">
            <input
              value={check}
              id={check}
              name={check}
              type="checkbox"
              className="w-[20px] h-[20px] accent-green-200 cursor-pointer hover:border-2 hover:border-green-200"
              onChange={(e) => handleCheckmarks(e)}
            />
            <label
              htmlFor={check}
              className="text-preset-4 font-bold cursor-pointer"
            >
              Include {check}
            </label>
          </div>
        );
      })}
      {checkmarkError && (
        <span role="alert" className="text-red-600">
          {checkmarkError}
        </span>
      )}
    </div>
  );
}
