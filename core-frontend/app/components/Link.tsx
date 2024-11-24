/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import NextLink from "next/link";
import { forwardRef, ReactNode } from "react";

import ArrowRightIcon from "@/public/arrowright.svg";

const underlineCommonStyles =
  "relative transition-colors duration-500 before:absolute before:-bottom-1.5 before:left-0 before:h-1.5 before:w-full before:transition-all before:duration-500 hover:before:bottom-full hover:before:opacity-0 before:pointer-events-none";

const styles = {
  base: "inline-flex !leading-none items-center",
  size: {
    lg: "t-2xl font-semibold",
    md: "t-xl font-semibold",
    sm: "t-lg",
    xs: "t-base",
    "2xs": "t-sm",
  },
  theme: {
    black:
      "text-black transition-colors duration-200 hover:text-primary-2 dark:text-white dark:hover:text-primary-2",
    "black-no-hover": "text-black",
    white: "text-white transition-colors duration-200 hover:text-primary-2",
    "black-primary-1": `${underlineCommonStyles} before:bg-primary-1 hover:text-primary-1 dark:before:bg-primary-1 dark:text-white dark:hover:text-primary-1`,
    "black-secondary-3": `${underlineCommonStyles} before:bg-secondary-3 hover:text-secondary-3`,
    "black-secondary-5": `${underlineCommonStyles} before:bg-secondary-5 hover:text-secondary-5`,
    "underline-primary-1":
      "text-primary-1 border-b-2 border-primary-1 transition-colors duration-200 hover:border-transparent",
    blue: "text-blue-80 transition-colors duration-200 hover:text-[#C6EAF1]",
    green: "text-green-45 transition-colors duration-200 hover:text-[#00FFAA]",
    "green-underlined":
      "underline decoration-green-45/40 hover:decoration-green-45/100 text-green-45 transition-colors duration-500",
    "gray-30":
      "text-gray-new-30 transition-colors duration-200 hover:text-green-45",
    "white-underlined":
      "underline decoration-white/40 hover:decoration-white/100 text-white transition-colors duration-500",
    "gray-50":
      "text-gray-new-50 transition-colors duration-200 hover:text-green-45",
    "gray-70":
      "text-gray-new-70 dark:text-gray-new-70 transition-colors duration-200 hover:text-green-45",
    "gray-80":
      "text-gray-new-80 transition-colors duration-200 hover:text-green-45",
    "gray-90":
      "text-gray-new-90 transition-colors duration-200 hover:text-green-45",
  },
};

// Define types for props
interface LinkProps {
  className?: string;
  size?: keyof typeof styles.size;
  theme?: keyof typeof styles.theme;
  to: string;
  withArrow?: boolean;
  prefetch?: boolean;
  children: ReactNode;
}

// Forward ref for the Link component
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className: additionalClassName,
      size,
      theme,
      to,
      withArrow = false,
      children,
      prefetch,
      ...props
    },
    ref
  ) => {
    const className = clsx(
      size && theme && styles.base,
      size && styles.size[size],
      theme && styles.theme[theme],
      additionalClassName,
      withArrow && "group"
    );

    const content = (
      <>
        {withArrow ? <span>{children}</span> : children}
        {withArrow && (
          <ArrowRightIcon className="-mb-px ml-1.5 shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]" />
        )}
      </>
    );

    // Handle hash links
    if (to.includes("#")) {
      return (
        <a className={className} href={to} ref={ref} {...props}>
          {content}
        </a>
      );
    }

    // Handle internal links
    if (to.startsWith("/")) {
      return (
        <NextLink
          className={className}
          href={to}
          ref={ref}
          prefetch={prefetch}
          {...props}
        >
          {content}
        </NextLink>
      );
    }

    // Handle external links
    return (
      <a className={className} href={to} ref={ref} {...props}>
        {content}
      </a>
    );
  }
);

Link.displayName = "Link"; // For better debugging with forwardRef

export default Link;
