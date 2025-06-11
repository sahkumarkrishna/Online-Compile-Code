import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm.jsx";
import AdminDashboard from "./pages/AdminDashboard";
import WatchDemo from "./pages/WatchDemo.jsx";
import CodeEditor from "./pages/CodeEditor.jsx";

import Users from "./pages/Users.jsx";
import PageNotFound from "../PageNotFound.jsx";
import CompileCode from "./pages/CompileCode.jsx";

// Layouts & Components
import MainLayout from "./Layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "watchDemo",
        element: (
          <ProtectedRoute>
            <WatchDemo />
          </ProtectedRoute>
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
        path: "users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <AuthForm />,
  },
  {
    path: "/compileCode",
    element: <CompileCode />, // ✅ path should start with "/"
  },
  {
    path: "*",
    element: <PageNotFound />, // ✅ Catch-all route
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
