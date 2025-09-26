import type { PropsWithChildren } from "react";
import type { IconType } from "react-icons";

import { cn } from "../../lib/utils";

interface ButtonProps {
  id?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  containerClass?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  id,
  children,
  containerClass,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onClick,
  disabled,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black transition hover:opacity-75",
        disabled && "opacity-50 cursor-not-allowed",
        containerClass
      )}
    >
      {LeftIcon ? <LeftIcon /> : null}

      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        {children}
      </span>

      {RightIcon ? <RightIcon /> : null}
    </button>
  );
};
