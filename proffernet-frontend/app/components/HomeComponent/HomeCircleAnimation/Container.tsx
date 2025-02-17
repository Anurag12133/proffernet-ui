import clsx from "clsx";
import React, { forwardRef, ReactNode, ElementType } from "react";

// Define the styles object
const styles = {
  size: {
    lg: "max-w-[1760px] 3xl:max-w-[1472px] 2xl:px-10",
    md: "max-w-[1760px] 3xl:max-w-[1472px] 2xl:max-w-[1216px] xl:max-w-[936px]",
    medium: "max-w-[1472px] 2xl:px-10",
    sm: "max-w-[1460px] 2xl:max-w-[1216px] xl:max-w-[936px]",
    xs: "max-w-[860px]",
    xxs: "max-w-[704px] md:px-5",
    1472: "max-w-[1536px] px-8",
    1408: "max-w-[1472px] px-8",
    1344: "max-w-[1408px] px-8",
    1220: "max-w-[1220px] xl:px-8",
    1216: "max-w-[1216px] xl:px-8",
    1152: "max-w-[1152px]",
    1100: "max-w-[1100px]",
    960: "max-w-[960px]",
    768: "max-w-[768px]",
  },
};

// Define the prop types using TypeScript interfaces
interface ContainerProps {
  className?: string;
  size: keyof typeof styles.size;
  children: ReactNode;
  as?: ElementType; // This allows custom tags, e.g., 'section', 'article'
}

// Forward ref for the Container component
const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ className = "", size, children, as: Tag = "div", ...otherProps }, ref) => {
    return (
      <Tag
        className={clsx(
          "relative mx-auto lg:max-w-none lg:px-8 md:px-4",
          styles.size[size],
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {children}
      </Tag>
    );
  }
);

Container.displayName = "Container"; // For better debugging with forwardRef

export default Container;
