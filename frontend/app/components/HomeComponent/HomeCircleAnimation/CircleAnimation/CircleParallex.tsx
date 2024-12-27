"use client";

import clsx from "clsx";
import {
  LazyMotion,
  domAnimation,
  useMotionValue,
  useSpring,
  m,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMouse } from "react-use";

const generateRandomAnimation = () => {
  const randomValuesX = Array.from({ length: 5 }, () => Math.random() * 10 - 5);
  const randomValuesY = Array.from({ length: 5 }, () => Math.random() * 10 - 5);

  const keyframes = [
    "translate(0px, 0px)",
    ...randomValuesX.map((x, i) => `translate(${x}px, ${randomValuesY[i]}px)`),
    "translate(0px, 0px)",
  ];

  return {
    transform: keyframes,
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  };
};

interface Item {
  x: string;
  y: string;
  label: string;
  defaultAnimation: ReturnType<typeof generateRandomAnimation>;
  spring?: ReturnType<typeof useDynamicSpring>;
}

const ITEMS: Item[] = [
  { x: "19%", y: "19%", label: "Collaboration" },
  { x: "67.5%", y: "25%", label: "Contribution" },
  { x: "9%", y: "41%", label: "Teamwork" },
  { x: "71.5%", y: "41%", label: "Synergy" },
  { x: "17%", y: "76%", label: "Learning" },
  { x: "68%", y: "81%", label: "Networking" },
].map((item) => ({ ...item, defaultAnimation: generateRandomAnimation() }));

const useDynamicSpring = (
  mouseX: number,
  mouseY: number,
  gRef: React.RefObject<SVGGElement>,
  svgRef: React.RefObject<SVGSVGElement>,
  wideRadius = false
) => {
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!gRef.current || !svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const gRect = gRef.current.getBoundingClientRect();

    const gCenterX = gRect.left + gRect.width / 2 - svgRect.left;
    const gCenterY = gRect.top + gRect.height / 2 - svgRect.top;

    const activeRadiusX = svgRect.width * (wideRadius ? 0.32 : 0.23);
    const activeRadiusY = svgRect.height * 0.2;

    const distanceX = mouseX - gCenterX;
    const distanceY = mouseY - gCenterY;

    const isCurrentlyActive =
      Math.abs(distanceX) < activeRadiusX &&
      Math.abs(distanceY) < activeRadiusY;

    setIsActive(isCurrentlyActive);

    const dampingFactor = 0.5;
    const targetX = isCurrentlyActive ? distanceX * dampingFactor : 0;
    const targetY = isCurrentlyActive ? distanceY * dampingFactor : 0;

    motionX.set(targetX);
    motionY.set(targetY);
  }, [mouseX, mouseY, gRef, svgRef, wideRadius]);

  const springConfig = { damping: 20, stiffness: 50, mass: 6 };
  const springX = useSpring(motionX, springConfig);
  const springY = useSpring(motionY, springConfig);

  return { x: springX, y: springY, isActive };
};

interface ParallaxVocabularyProps {
  className?: string;
}

const ParallaxVocabulary: React.FC<ParallaxVocabularyProps> = ({
  className,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRefs = Array(6)
    .fill(null)
    .map(() => useRef<SVGGElement>(null)) as React.RefObject<SVGGElement>[];

  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  const isHoveredElements = ITEMS.find(({ spring }) => spring?.isActive);

  useEffect(() => {
    setActiveIndexes(() => {
      const indexes = new Set<number>();
      while (indexes.size < 3) {
        indexes.add(Math.floor(Math.random() * 6));
      }
      return Array.from(indexes);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndexes((prevIndexes) => {
        const indexesCopy = [...prevIndexes];
        const lastIndex = indexesCopy.pop();
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * 6);
        } while (
          indexesCopy.includes(randomIndex) ||
          randomIndex === lastIndex
        );
        return [randomIndex, ...indexesCopy];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isHoveredElements]);

  return (
    <div
      className={clsx(
        className,
        "aspect-[1.66667] [mask-image:radial-gradient(ellipse_50%_70%_at_50%_50%,#000_60%,transparent_100%)]"
      )}
      ref={svgRef as unknown as React.RefObject<HTMLDivElement>}
    >
      <LazyMotion features={domAnimation}>
        <svg
          className="w-full mt-[60rem]"
          width="1280"
          height="768"
          viewBox="0 0 1280 768"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {ITEMS.map(({ spring, x, y, label, defaultAnimation }, index) => {
            const isActive = isHoveredElements
              ? spring?.isActive
              : activeIndexes.includes(index);
            return (
              <m.g
                className="relative mix-blend-hard-light transition-transform duration-200"
                style={spring ? { x: spring.x, y: spring.y } : undefined}
                ref={gRefs[index]}
                key={index}
              >
                <m.text
                  className={clsx(
                    "text-xl font-medium uppercase transition-[opacity,colors,filter] duration-[500ms] sm:text-[21px]",
                    isActive
                      ? "text-gray-800"
                      : "text-[#CCC6EC] opacity-80 blur-[2px]"
                  )}
                  animate={
                    !isActive || !spring?.isActive
                      ? defaultAnimation
                      : undefined
                  }
                  x={x}
                  y={y}
                  fill="currentColor"
                >
                  {label}
                </m.text>
              </m.g>
            );
          })}
        </svg>
      </LazyMotion>
    </div>
  );
};

export default ParallaxVocabulary;
