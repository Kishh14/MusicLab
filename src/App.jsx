import router from "./routes";

// Context
import { RouterProvider } from "react-router-dom";
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
