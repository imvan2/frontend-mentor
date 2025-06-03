const checks = ["Active", "Empty"];

export default function Checkbox() {
  return (
    <div className="w-full px-8 py-6 flex flex-col gap-4 text-preset-3 text-grey-200">
      {checks.map((check) => {
        return (
          <div className="flex flex-row gap-[20px] items-center">
            <input
              value={check}
              id={check}
              name={check}
              type="checkbox"
              className="w-[20px] h-[20px]"
            /> 
            <label>{check}</label>
          </div>
        );
      })}
    </div>
  );
}
