interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      className="border-2 border-slate-300 p-2 rounded-md"
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
