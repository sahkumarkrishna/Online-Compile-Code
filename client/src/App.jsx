import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm";
import WatchDemo from "./pages/WatchDemo";
import CodeEditor from "./pages/CodeEditor";

import PageNotFound from "../PageNotFound";
import CompileCode from "./pages/CompileCode";
import Settings from "./pages/Settings";

// Layouts & Components
import MainLayout from "./Layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

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
        path: "editor",
        element: (
          <ProtectedRoute>
            <CodeEditor />
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
