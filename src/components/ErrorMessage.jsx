// filepath: d:\Sitios Web\dashboard\src\components\ErrorMessage.jsx
const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return <p className="text-red-500">{message}</p>;
};

export default ErrorMessage;
