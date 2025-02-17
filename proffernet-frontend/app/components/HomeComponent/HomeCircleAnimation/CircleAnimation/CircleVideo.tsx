"use client";

import clsx from "clsx";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  ReactNode,
} from "react";
import { useInView } from "react-intersection-observer";

// Define the types for the props
interface PauseableVideoProps {
  children: ReactNode;
  width: number;
  height: number;
  className?: string;
  videoClassName?: string;
}

// Forward ref for the PauseableVideo component
const PauseableVideo = forwardRef<HTMLVideoElement, PauseableVideoProps>(
  ({ children, className, videoClassName, width, height }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // Set up Intersection Observer for video visibility
    const [videoVisibilityRef, isInView] = useInView({
      triggerOnce: true,
      rootMargin: "0px 0px 400px 0px",
    });

    const { inView, ref: setVideoRef } = useInView({ threshold: 0.1 });

    useEffect(() => {
      if (videoRef.current) {
        setVideoRef(videoRef.current);
      }
    }, [setVideoRef]);

    useEffect(() => {
      if (!videoRef.current) return;

      const videoElement = videoRef.current;

      if (!inView) {
        videoElement.pause();
      } else {
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Error attempting to play video:", error);
          });
        }
      }
    }, [inView]);

    // Expose the video element to the parent via the ref
    useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

    return (
      <LazyMotion features={domAnimation}>
        <div
          className={clsx("relative overflow-hidden", className)}
          ref={videoVisibilityRef}
        >
          {/* Placeholder image to prevent layout shift */}
          <img
            className={clsx("relative", videoClassName)}
            src={`data:image/svg+xml;charset=utf-8,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E`}
            alt=""
            aria-hidden
          />
          <AnimatePresence>
            {isInView && (
              <m.video
                className={clsx("absolute inset-0", videoClassName)}
                ref={videoRef}
                controls={false}
                width={width}
                height={height}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                autoPlay
                loop
                playsInline
                muted
              >
                {children}
              </m.video>
            )}
          </AnimatePresence>
        </div>
      </LazyMotion>
    );
  }
);

PauseableVideo.displayName = "PauseableVideo"; // For better debugging with forwardRef

export default PauseableVideo;
