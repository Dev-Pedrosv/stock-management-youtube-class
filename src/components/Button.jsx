export const Button = ({ onClick, children, type = "button" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-zinc-900 text-white font-bold  p-3 rounded-lg hover:bg-zinc-700"
    >
      {children}
    </button>
  );
};
