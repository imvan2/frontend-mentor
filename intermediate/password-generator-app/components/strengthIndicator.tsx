import { Indicators, StrengthIndicatorProps } from "@/lib/definitions";

const indicators: Indicators = {
  1: { label: "Too Weak!", bg: "bg-red-200", border: "border-red-200" },
  2: { label: "Weak", bg: "bg-orange-200", border: "border-orange-200" },
  3: { label: "Medium", bg: "bg-yellow-200", border: "border-yellow-200" },
  4: { label: "Strong", bg: "bg-green-200", border: "border-green-200" },
};

export default function StrengthIndicator({
  strength,
}: StrengthIndicatorProps) {
  return (
    <div
      className={` min-h-[64px] p-4 flex justify-between items-center w-full bg-grey-850 uppercase font-bold`}
    >
      <p className="text-preset-3 text-grey-600">Strength</p>

      <div className="flex min-h-[28px]">
        <p className="text-grey-200 text-preset-2 mr-2 font-normal">
          {strength === 0 ? "" : indicators[strength as keyof Indicators].label}
        </p>
        <div className="flex justify-between items-center gap-2">
          {Object.entries(indicators).map(([key]) => (
            <div
              key={key}
              className={`border-2 w-[10px] h-[28px] ${
                Number(key) <= strength
                  ? `${indicators[strength as keyof Indicators].bg} ${
                      indicators[strength as keyof Indicators].border
                    }`
                  : "border-white"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
