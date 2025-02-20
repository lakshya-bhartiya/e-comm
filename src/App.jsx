import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './app/routes'
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
          <RouterProvider router={router} />
          <ToastContainer />
          <Toaster />
    </div>

  )
}

export default App
