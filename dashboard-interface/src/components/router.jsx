import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./../App.jsx";
import Create from "./Create.jsx";

const Router = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/create",
        element: <Create />,
      },
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;