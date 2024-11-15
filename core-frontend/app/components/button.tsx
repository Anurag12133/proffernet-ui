const Button = ({ children }: any) => {
  return (
    <button
      type="button"
      className="border rounded-lg font-bold text-white px-5 py-2 cursor-wait"
    >
      {children}
    </button>
  );
};

export default Button;
