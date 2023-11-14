interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen bg-slate-800 h-screen p-4 text-gray-200">
      {children}
    </div>
  );
};

export default Layout;
