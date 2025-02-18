"use client";

export const TypewriterEffectSmooth = ({
  words,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const isLastWord = (index: number) => index === words.length - 1;

  return (
    <div className="flex space-x-1 my-6">
      <div className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-6xl font-bold">
        {words.map((word, idx) => (
          <span
            key={idx}
            className={
              isLastWord(idx) ? "text-blue-500" : "text-black dark:text-white"
            }
          >
            {word.text}
            {!isLastWord(idx) && " "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TypewriterEffectSmooth;
