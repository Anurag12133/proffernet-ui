import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  isSelected?: boolean;
  isMobile?: boolean;
  isBanner?: boolean;
  href?: string;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [rest: string]: any;
}

export default function NavLink({
  isSelected,
  isMobile,
  isBanner,
  href,
  children,
  ...rest
}: Props) {
  const className = cn(
    rest.className,
    "text-white bg-background rounded-md px-3 py-1 font-medium dark:border-white/[0.2] border-transparent border ",
    {
      "bg-background rounded-md px-3 py-1 font-medium dark:border-white/[0.2] border-transparent border":
        isSelected,
      "text-white": !isSelected && !isBanner,
      "block text-base": isMobile,
      "text-sm": !isMobile,
      "text-gray-300": isBanner,
    }
  );

  if (!href) {
    return (
      <span className={className} role="button" onClick={rest.onClick}>
        {children}
      </span>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
