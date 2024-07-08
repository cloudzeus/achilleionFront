import Link from "next/link";
import { cn } from "@/lib/utils";

const Button = ({ children, className, link, isIcon }) => {
  return (
    <>
      {link ? (
        <Link href={link} target="_blank" className="w-10 h-10 cursor-pointer">
          <ButtonBody className={className} isIcon={isIcon}>
            {children}
          </ButtonBody>
        </Link>
      ) : (
        <ButtonBody className={className} isIcon={isIcon}>
          {children}
        </ButtonBody>
      )}
    </>
  );
};

const ButtonBody = ({ children, className, isIcon }) => {
  return (
    <div className="cursor-pointer flex-none w-auto h-full ">
      <div
        className={cn(
          "flex items-center justify-center gap-2 bg-primary-background font-helveticathin rounded-full select-none whitespace-nowrap text-primary-foreground text-sm font-medium hover:bg-white/[0.1] transition-colors duration-100",
          className,
          isIcon ? "h-10 w-10" : "h-full w-max px-3 py-2",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Button;
