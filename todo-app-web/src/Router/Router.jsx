import { Route, Routes } from "react-router-dom"

import Header from "../app/layout/Header"
import Footer from "../app/layout/Footer"

import Home from "../app/pages/Home"

import TaskPage from "../app/pages/TaskPage"

import Error from "../components/Error"

function Router() {



  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<TaskPage />} />
        <Route path="/404" element={<Error/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default Router