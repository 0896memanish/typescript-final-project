import { ComponentPropsWithoutRef } from "react";

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

export default function Input({ id, label, ...otherProps }: InputProps) {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...otherProps}></input>
    </div>
  );
}
