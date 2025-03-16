import loadingGif from "../assets/loading.gif";

interface LoadingIndicatorProps {
  loading: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="flex justify-center items-center my-4">
      <img src={loadingGif} alt="Loading..." className="w-30 md:w-40" loading="lazy" />
    </div>
  );
};

export default LoadingIndicator;
