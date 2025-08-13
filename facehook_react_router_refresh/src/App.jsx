import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/me" element={<ProfilePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
