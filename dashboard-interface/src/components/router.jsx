import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./../App.jsx";
import Create from "./Create.jsx";
import Chat from "./Chat.jsx";
import Featured from "./Featured.jsx";

const Router = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/featured",
        element: <Featured />
      },
      {
        path: "/create",
        element: <Create />,
      },
    {
        path: "/:id",
        element: <Chat />
      }  
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;