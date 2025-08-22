import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm";
import WatchDemo from "./pages/WatchDemo";


import PageNotFound from "../PageNotFound";

import Settings from "./pages/Settings";
import HistoryPage from "./pages/HistoryPage";

// Layouts & Components
import MainLayout from "./Layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import CompileCode from "./pages/CompileCode";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "watchDemo",
        element: (

          <WatchDemo />

        ),
      },
      {
        path: "compileCode",
        element: (
          <ProtectedRoute>
            <CompileCode/>
          </ProtectedRoute>
        ),
      },

      {
        path: "settings", // ✅ updated to plural
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "history", // ✅ updated to plural
        element: (

          < HistoryPage />

        ),
      },
    ],
  },
  { path: "/login", element: <AuthForm /> },
  { path: "/compileCode", element: <CompileCode /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
