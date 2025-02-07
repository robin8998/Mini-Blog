import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import {Provider} from "react-redux"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  {Home, AddPost, AllPosts, AuthLayout, EditPost, LoginPage, Post, SignUpPage } from './components/index.js'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element: <Home/>
      },

      {
        path:"/login",
        element:(<AuthLayout authenticated={false}>
          <LoginPage/>
        </AuthLayout>)
      },

      {
        path:"/signup",
        element:(<AuthLayout authenticated={false}>
          <SignUpPage/>
        </AuthLayout>)
      },

      {
        path:"/all-posts",
        element:(<AuthLayout authenticated>
          {""}
          <AllPosts/>
        </AuthLayout>)
      },

      {
        path:"/add-post",
        element:(<AuthLayout authenticated>
          {""}
          <AddPost/>
        </AuthLayout>)
      },

      {
        path:"/edit-post/:slug",
        element:(<AuthLayout authenticated>   
          {""}
          <EditPost/>
        </AuthLayout>)
      },

      {
        path:"/post/:slug",
        element: <Post/>
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
