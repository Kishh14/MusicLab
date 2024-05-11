import { Suspense } from "react";
import { Outlet } from "react-router";

// Context
import { AuthProvider } from "../context/AuthContext";

// Component
import { LoadingSpinnerFull } from "../components/ui/LoadingSpinner";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingSpinnerFull />}>
        {/* This where your components will get rendered */}
        <Outlet />
      </Suspense>
    </AuthProvider>
  );
};

export default RootLayout;
