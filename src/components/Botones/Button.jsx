const Button = ({ text, onClick, icon }) => {
  return (
    <button
      className="md:ml-4 px-4 py-2 text-lg bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full md:w-auto mt-6 md:mt-0 flex items-center justify-center gap-2"
      onClick={onClick}>
      <span>{icon}</span>
      {text}
    </button>
  );
};

export default Button;
