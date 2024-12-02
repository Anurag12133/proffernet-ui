"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";
import "@/app/css/Loader.css"

interface MapProps {
    dots?: Array<{
        start: { lat: number; lng: number; label?: string };
        end: { lat: number; lng: number; label?: string };
    }>;
    lineColor?: string;
}

export function WorldMap({ dots = [], lineColor = "#0ea5e9" }: MapProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const { theme } = useTheme();

    // Loader state to handle loading status
    const [isLoading, setIsLoading] = useState(true);

    // Lazy-load the SVG map using `useMemo`
    const svgMap = useMemo(() => {
        const map = new DottedMap({ height: 100, grid: "diagonal" });
        return map.getSVG({
            radius: 0.22,
            color: theme === "dark" ? "#00000040" : "#FFFFFF40",
            shape: "circle",
            backgroundColor: theme === "dark" ? "white" : "black",
        });
    }, [theme]);

    useEffect(() => {
        // Simulate loading completion (or use actual map loading logic)
        const timer = setTimeout(() => setIsLoading(false), 2000); // Set an arbitrary loading time for demo purposes
        return () => clearTimeout(timer); // Clean up timer on unmount
    }, []);

    const projectPoint = (lat: number, lng: number) => ({
        x: (lng + 180) * (800 / 360),
        y: (90 - lat) * (400 / 180),
    });

    const createCurvedPath = (
        start: { x: number; y: number },
        end: { x: number; y: number }
    ) => {
        const midX = (start.x + end.x) / 2;
        const midY = Math.min(start.y, end.y) - 50;
        return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    };

    // Memoize calculated paths and points
    const paths = useMemo(
        () =>
            dots.map((dot, i) => ({
                key: `path-group-${i}`,
                start: projectPoint(dot.start.lat, dot.start.lng),
                end: projectPoint(dot.end.lat, dot.end.lng),
            })),
        [dots]
    );

    return (
        <div className="w-full aspect-[2/1] dark:bg-black bg-black rounded-lg relative font-sans">
            {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    {/* Show loader until the map is loaded */}
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    <Image
                        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
                        className="h-96 w-full mask-image pointer-events-none select-none"
                        alt="world map"
                        height={495}
                        width={1056}
                        draggable={false}
                        priority // Improves image loading priority
                    />
                    <svg
                        ref={svgRef}
                        viewBox="0 0 800 400"
                        className="w-full h-full absolute inset-0 pointer-events-none select-none"
                    >
                        {paths.map(({ key, start, end }, i) => (
                            <g key={key}>
                                <motion.path
                                    d={createCurvedPath(start, end)}
                                    fill="none"
                                    stroke="url(#path-gradient)"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
                                />
                            </g>
                        ))}

                        {/* Gradient Definition */}
                        <defs>
                            <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="white" stopOpacity="0" />
                                <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
                                <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Start and End Points */}
                        {paths.map(({ start, end }, i) => (
                            <g key={`points-group-${i}`}>
                                {[start, end].map((point, idx) => (
                                    <circle
                                        key={`${i}-${idx}`}
                                        cx={point.x}
                                        cy={point.y}
                                        r="2"
                                        fill={lineColor}
                                    />
                                ))}
                            </g>
                        ))}
                    </svg>
                </>
            )}
        </div>
    );
}
