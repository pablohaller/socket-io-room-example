interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props) => <h1 className="text-2xl">{children}</h1>;

export default Title;
