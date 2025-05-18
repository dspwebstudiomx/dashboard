const Button = ({ text, onClick, icon: Icon }) => {
  const iconClass = "w-5 h-5 text-white";
  const iconSize = 24;

  return (
    <button
      className="md:ml-4 px-4 h-15 w-[220px] text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition md:w-auto mt-6 ml-0 flex items-center justify-center gap-2"
      onClick={onClick}>
      {Icon && <Icon className={iconClass} size={iconSize} />}
      {text}
    </button>
  );
};

export default Button;
