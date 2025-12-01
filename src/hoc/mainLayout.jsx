import React from 'react'
import { Container } from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'  // It is used to style the toast notifications. 
// This import statement is necessary to apply the default styles provided by the library.
// The ToastContainer component is used to display toast notifications in the application.
function MainLayout(props) {

  const site= useSelector((state)=> state.site)
  return (
    <Container className= {`app_container mb-5 ${site.layout}`}>
        {props.children}
        <ToastContainer />
    </Container>
  )
}
export default MainLayout