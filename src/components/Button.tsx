import '../styles/button.scss';
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { className: classes, ...restProps } = props;
  const customClass = classes ? `button ${classes}` : 'button';

  return (
    <button className={customClass} { ...restProps }></button>
  )
}