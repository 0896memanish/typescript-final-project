import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";

type BaseProps = {
  children: ReactNode;
  textOnly?: boolean;
};

type ButtonProps = BaseProps & ComponentPropsWithoutRef<"button">;

type ButtonLinkProps = BaseProps &
  LinkProps & {
    to?: string;
  };
export default function Button(props: ButtonLinkProps | ButtonProps) {
  if ("to" in props) {
    const { children, textOnly, to, ...otherProps } = props;
    return (
      <Link
        to={to}
        className={`button ${textOnly ? "button--text-only" : ""}`}
        {...otherProps}
      >
        {children}
      </Link>
    );
  }

  const { children, textOnly, ...otherProps } = props;
  return (
    <button
      className={`button ${textOnly ? "button--text-only" : ""}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
