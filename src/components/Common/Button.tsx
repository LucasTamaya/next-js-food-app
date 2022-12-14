import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  filled: boolean;
  onClick?: () => any;
}

const Button: React.FC<Props> = ({ children, filled, onClick }) => {
  return (
    <button
      className={`${
        filled
          ? "bg-main-red text-white"
          : "text-main-red border-2 border-main-red"
      } flex flex-row justify-center items-center uppercase rounded h-10 w-full`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
