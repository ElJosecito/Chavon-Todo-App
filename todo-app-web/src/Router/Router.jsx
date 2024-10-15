import { Route, Routes } from "react-router-dom"

import Header from "../app/layout/Header"
import Footer from "../app/layout/Footer"

import Home from "../app/pages/Home"

//protected route
import ProtectedRoute from '../components/ProtectedRoute'

//useLocation
import { useLocation } from 'react-router-dom'

import Login from "../app/pages/Login"
import Register from "../app/pages/Register"

import { useAuthStore } from "../../store/auth"

import TaskPage from "../app/pages/TaskPage"

function Router() {

  const path = useLocation().pathname

  const { isAuth } = useAuthStore()

  return (
    <>
       {path === '/' || path === '/register' ? null : <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/task/:id" element={<TaskPage />} />
        </Route>
      </Routes>
      {path === '/' ? null: <Footer />}
    </>
  )
}

export default Router