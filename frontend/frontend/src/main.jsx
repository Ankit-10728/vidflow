import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/store.js'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css';
import { Protected } from "./components"

import {
  Login,
  Post,
  Editpost,
  AllPost,
  Addpost,
  Home,
  Signup,
  Addtweet
} from "./pages"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: []
      },
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
        children: []
      },
      {
        path: '/signup',
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
        children: []
      },
      {
        path: '/all-posts',
        element: (
          <Protected authentication={true}>
            <AllPost />
          </Protected>
        ),
        children: []
      },
      {
        path: '/add-post',
        element: (
          <Protected authentication={true}>
            <Addpost />
          </Protected>
        ),
        children: []
      },
      {
        path: '/add-tweet',
        element: (
          <Protected authentication={true}>
            <Addtweet />
          </Protected>
        ),
        children: []
      },
      {
        path: '/edit-post/:slug',
        element: (
          <Protected authentication={true}>
            <Editpost />
          </Protected>
        ),
        children: []
      },
      {
        path: '/post/:slug',
        element: (
          <Protected authentication={true}>
            <Post />
          </Protected>
        ),
        children: []
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
