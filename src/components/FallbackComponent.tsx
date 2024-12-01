import React from 'react';
const FallbackComponent: React.FC<{
  error: Error;
  resetErrorBoundary: () => void;
}> = ({ error, resetErrorBoundary }) => (
  <div className="text-center mt-4">
    <p>Something went wrong:</p>
    <pre className="text-red-500">{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);
export default FallbackComponent;
