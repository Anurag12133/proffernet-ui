'use client';

import clsx from 'clsx';
import { LazyMotion, domAnimation, useMotionValue, useSpring, m, MotionValue } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useMouse } from 'react-use';

interface Item {
  x: string;
  y: string;
  label: string;
  defaultAnimation: {
    transform: string[];
    transition: {
      duration: number;
      ease: string;
      repeat: number;
      repeatType: string;
    };
  };
  spring?: {
    x: MotionValue<number>;
    y: MotionValue<number>;
    isActive: boolean;
  };
}

const generateRandomAnimation = () => {
  const randomValuesX = Array.from({ length: 5 }, () => Math.random() * 10 - 5);
  const randomValuesY = Array.from({ length: 5 }, () => Math.random() * 10 - 5);

  const keyframes = [
    'translate(0px, 0px)',
    ...randomValuesX.map((x, i) => `translate(${x}px, ${randomValuesY[i]}px)`),
    'translate(0px, 0px)',
  ];

  return {
    transform: keyframes,
    transition: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  };
};

const ITEMS: Item[] = [
  {
    x: '19%',
    y: '19%',
    label: 'Create',
  },
  {
    x: '67.5%',
    y: '25%',
    label: 'Collaborate',
  },
  {
    x: '9%',
    y: '41%',
    label: 'Contribute'
  },
  {
    x: '71.5%',
    y: '41%',
    label: 'Network',
  },
  {
    x: '17%',
    y: '76%',
    label: 'Works with Team',
  },
  {
    x: '68%',
    y: '81%',
    label: 'Synergy',
  },
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
      Math.abs(distanceX) < activeRadiusX && Math.abs(distanceY) < activeRadiusY;

    setIsActive(isCurrentlyActive);

    // Apply damping effect to motionX and motionY
    const dampingFactor = 0.5; // Adjust this value to control the damping effect
    const targetX = isCurrentlyActive ? distanceX * dampingFactor : 0;
    const targetY = isCurrentlyActive ? distanceY * dampingFactor : 0;

    motionX.set(targetX);
    motionY.set(targetY);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseX, mouseY, gRef, svgRef]);

  const springConfig = { damping: 20, stiffness: 50, mass: 6 };
  const springX = useSpring(motionX, springConfig);
  const springY = useSpring(motionY, springConfig);

  return { x: springX, y: springY, isActive };
};

interface ParallaxVocabularyProps {
  className?: string;
}

const ParallaxVocabulary: React.FC<ParallaxVocabularyProps> = ({ className }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRefs = [
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
    useRef<SVGGElement>(null),
  ];
  const { elX: mouseX, elY: mouseY } = useMouse(svgRef as React.RefObject<SVGSVGElement>);

  ITEMS[0].spring = useDynamicSpring(mouseX, mouseY, gRefs[0] as React.RefObject<SVGGElement>, svgRef as React.RefObject<SVGSVGElement>);
  ITEMS[1].spring = useDynamicSpring(mouseX, mouseY, gRefs[1] as React.RefObject<SVGGElement>, svgRef as React.RefObject<SVGSVGElement>);
  ITEMS[2].spring = useDynamicSpring(mouseX, mouseY, gRefs[2] as React.RefObject<SVGGElement>, svgRef as React.RefObject<SVGSVGElement>, true);
  ITEMS[3].spring = useDynamicSpring(mouseX, mouseY, gRefs[3] as React.RefObject<SVGGElement>, svgRef as React.RefObject<SVGSVGElement>);
  ITEMS[4].spring = useDynamicSpring(mouseX, mouseY, gRefs[4] as React.RefObject<SVGGElement>, svgRef as React.RefObject<SVGSVGElement>, true);
  ITEMS[5].spring = useDynamicSpring(mouseX, mouseY, gRefs[5] as React.RefObject<SVGGElement>, svgRef as React.RefObject<SVGSVGElement>);

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
        } while (indexesCopy.includes(randomIndex) || randomIndex === lastIndex);
        return [randomIndex, ...indexesCopy];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isHoveredElements]);

  return (
    <div
      className={clsx(
        className,
        'aspect-[1.66667] [mask-image:radial-gradient(ellipse_50%_70%_at_50%_50%,#000_60%,transparent_100%)]'
      )}
    >
      <LazyMotion features={domAnimation}>
        <svg
          ref={svgRef}
          className="w-full mt-[60rem]"
          width="1280"
          height="768"
          viewBox="0 0 1280 768"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {ITEMS.map(({ spring, x, y, label, defaultAnimation }, index) => {
            const isActive = isHoveredElements ? spring?.isActive : activeIndexes.includes(index);
            return (
              <m.g
                className="relative mix-blend-hard-light transition-transform duration-200"
                style={{ x: spring?.x, y: spring?.y }}
                ref={gRefs[index]}
                key={index}
              >
                <m.text
                  className={clsx(
                    'text-xl font-medium uppercase transition-[opacity,colors,filter] duration-[500ms] sm:text-[21px]',
                    isActive ? 'text-gray-8' : 'text-[#CCC6EC] opacity-80 blur-[2px]'
                  )}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  animate={ isActive ? undefined : (defaultAnimation as any)}
                  x={x}
                  y={y}
                  fill="currentColor"
                >
                  {label}
                </m.text>
              </m.g>
            );
          })}
          ;
        </svg>
      </LazyMotion>
    </div>
  );
};

ParallaxVocabulary.propTypes = {
  className: PropTypes.string,
};

export default ParallaxVocabulary;