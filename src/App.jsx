import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthProvider";
import ClockInClockOut from "./pages/ClockInClockOut";
import EmployeeList from "./pages/EmployeeList";
import EmployeeProfile from "./pages/EmployeeProfile";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <EmployeeList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <EmployeeProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <ClockInClockOut />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
