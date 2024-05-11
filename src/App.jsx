import { RouterProvider } from "react-router-dom";
import router from "./routes";

// Context
import { Provider as ReduxProvider } from "react-redux";

import { Toaster } from "sonner";
import { store } from "./app/store";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </ReduxProvider>
  );
};

export default App;
