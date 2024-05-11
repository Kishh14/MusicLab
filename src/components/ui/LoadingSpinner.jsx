export const LoadingSpinner = () => (
  <div className="size-12 border-4 border-t-0 border-white rounded-full animate-spin"></div>
);

export const LoadingSpinnerFull = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <LoadingSpinner />
  </div>
);
