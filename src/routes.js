import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import Home from "./pages/home";
import {
  Route,
  Routes,
  Outlet,
  Navigate
} from 'react-router-dom'

export default function HomeRoutes() {

  function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = localStorage.getItem('token')

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<SignUp />} />
      <Route element={<ProtectedRoutes redirectTo='/login' />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  )
}