import { RouterProvider } from "react-router-dom";
import router from "./routes";

// Context
import { Provider as ReduxProvider } from "react-redux";

import { Toaster } from "sonner";
import { store } from "./app/store";
// import { App_demo } from "./components/App_demo";


const App = () => {
  return (
    <>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
        <Toaster richColors />
      </ReduxProvider>



      {/*
           Check Header.jsx inside for login and signup routes  
           check Header.jsx in that there are nav links for Home studio and discover  
           Home - /
           Studio - home {which is the main page of rooms and instruments}
           Discover  - discover {this page will be added later}
        */}

    </>
  );
};

export default App;
