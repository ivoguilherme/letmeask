import '../styles/button.scss';
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean,
};

export function Button(props: ButtonProps) {
  const { isOutlined, className: classes, ...restProps } = props;
  const customClass = classes ? classes : '';
  const outlinedClass = isOutlined ? 'outlined' : '';

  return (
    <button className={`button ${customClass} ${outlinedClass}`} { ...restProps }></button>
  )
}

Button.defaultProps = {
  isOutlined: false,
}