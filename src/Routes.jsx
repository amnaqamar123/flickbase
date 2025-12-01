import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/navigation/header'
import MainLayout from './hoc/mainLayout'
import Home from './components/home'
import Auth from './auth'
import { Loader } from './utils/tools'
import { isAuthenticated } from './store/actions/users'
import { useDispatch, useSelector } from 'react-redux'
import AuthGaurd from './hoc/authgaurd'
import DashboardMain from './components/Dashboard/main'
import Dashboard from './components/Dashboard'
import AdminArticles from './components/Dashboard/articles'
import AddArticle from './components/Dashboard/articles/edit_add/add'

function Routess() {
  let [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(isAuthenticated())
  }, [])

  useEffect(() => {
    if (users.auth !== null) {
      setLoading(false)
    }
  }, [users])
  return (

    <BrowserRouter>
      {
        loading ?
          <Loader />
          :
          <>
            <Header />
            <MainLayout>
              <Routes>
                <Route path='/dashboard' element={
                  <AuthGaurd>
                    <Dashboard />
                  </AuthGaurd>
                }>
                  <Route index element={<DashboardMain />} />
                  <Route path='articles' element={<AdminArticles />} />
                  <Route path='articles/add' element={<AddArticle />} />
                </Route>
                <Route path='/auth' element={<Auth />} />
                <Route path='/' element={<Home />} />
              </Routes>
            </MainLayout>
          </>
      }


    </BrowserRouter>

  )
}

export default Routess