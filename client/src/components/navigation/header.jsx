import React, { useEffect } from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import SideNavigation from './sideNavigation'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from '../../store/actions/users'
import { showToast } from '../../utils/tools'
import { clearNotifications } from '../../store/reducers/notifications'
import { setLayout } from '../../store/reducers/site'

function header() {
  const users=useSelector((state)=> state.users)
  const notifications = useSelector((state) => state.notifications)
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const location=useLocation()

  useEffect(()=>{
    let pathname=location.pathname.split('/')
    if(pathname[1]==='dashboard'){
      document.title="Flickbase | Dashboard"
      dispatch(setLayout('dash_layout'))
    }
    else{
      document.title="Flickbase | Home"
      dispatch(setLayout(''))
    }


  },[location,dispatch])

  useEffect(() => {
    const { global } = notifications

    if (notifications && global.error) {
      const message = global.message ? global.message : 'An error occurred'

      showToast("ERROR", message)
      dispatch(clearNotifications())
    }
    if (notifications && global.success) {
      const message = global.message ? global.message : 'Operation successful'
      showToast("SUCCESS", message)
      dispatch(clearNotifications())
    }


  }, [notifications])

  const signOutUser=()=>{
    dispatch(signOut())
    navigate('/')
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary w-100">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        <Link className="navbar-brand fredoka_ff" to="/">Flickbase</Link>
        <SideNavigation users={users}  signOutUser={signOutUser}/>
      </div>
    </nav>
  )
}

export default header