interface OfflineWarningProps {
    isOffline: boolean;
  }
  
  const OfflineWarning: React.FC<OfflineWarningProps> = ({ isOffline }) => {
    if (!isOffline) return null;
  
    return (
      <div className="text-center bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 p-2 rounded-lg mb-4">
        ⚠️ You are offline. Please check your connection for the best experience.
      </div>
    );
  };
  
  export default OfflineWarning;
  