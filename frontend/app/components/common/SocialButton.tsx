import { cn } from "@/lib/utils";
interface Props {
  provider: "google" | "github";
  children: React.ReactNode;
  [rest: string]: any;
}

export default function SocialButton({ provider, children, ...rest }: Props) {
  const className = cn(
    "flex-1 text-white rounded-md px-3 mt-3 py-2 font-medium",
    {
      "bg-black text-white": provider === "google",
      "bg-black text-white ": provider === "github",
    }
  );

  return (
    <button className={className} {...rest}>
      <span className="flex justify-start items-center">{children}</span>
    </button>
  );
}
