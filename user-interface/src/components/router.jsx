import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse.jsx";
import Chat from "./Chat.jsx";
import Featured from "./Featured.jsx";

const Router = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Browse />,
        },
        {
          path: "/featured",
          element: <Featured />
        },
        {
          path: "/:id",
          element: <Chat />
        }  
    ]);
  
    return <RouterProvider router={router} />
};
  
export default Router;