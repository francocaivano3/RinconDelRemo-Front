import { createBrowserRouter, RouterProvider } from "react-router-dom";

const AppRouter = () => {
  const router = createBrowserRouter([]);
  return <RouterProvider router={router} />;
};
export default AppRouter;
