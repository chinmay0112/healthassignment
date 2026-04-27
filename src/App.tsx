import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import PatientDetails from "./pages/PatientDetails";
import Patients from "./pages/Patients";
const App = () => {
  const { setUser, user } = useAuthStore();
  useEffect(() => {
    // This listener runs once when the app loads
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster richColors position="top-right" />
    </Router>
  );
};

export default App;
