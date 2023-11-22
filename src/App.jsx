import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TicketsPage from "./pages/TicketsPage";
import TicketsFormPage from "./pages/TicketFormPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import { TicketProvider } from "./context/TicketsContext";
import Navbar from "./components/Navbar";


function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/tickets" element={<TicketsPage />} />
                <Route path="/add-ticket" element={<TicketsFormPage />} />
                <Route path="/tickets/:id" element={<TicketsFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;
