import dataNotFound from "../assets/not-found.gif";

interface ErrorMessageProps {
  error: string;
  isOffline: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, isOffline }) => {
  if (!error) return null;

  return (
    <div className="flex flex-col items-center my-4">
      {!isOffline && <img src={dataNotFound} alt="No users found" className="w-20 md:w-30" loading="lazy" />}
      <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>
    </div>
  );
};

export default ErrorMessage;
