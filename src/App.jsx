import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TicketsPage from "./pages/TicketsPage";
import DependenciesPage from "./pages/DependenciesPage";
import TicketsFormPage from "./pages/TicketFormPage";
import DependenciesFormPage from "./pages/DependencyFormPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import { TicketProvider } from "./context/TicketsContext";
import { DependencyProvider } from "./context/DependenciesContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <DependencyProvider>
          <BrowserRouter>
            <main className="container mx-auto px-10">
              <Navbar />
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/tickets" element={<TicketsPage />} />
                  <Route path="/add-ticket" element={<TicketsFormPage />} />
                  <Route path="/tickets/:id" element={<TicketsFormPage />} />

                  <Route path="/dependencies" element={<DependenciesPage />} />
                  <Route path="/add-dependency" element={<DependenciesFormPage />} />
                  <Route path="/dependencies/:id" element={<DependenciesFormPage />} />
                  
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </DependencyProvider>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;
