import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/store.js'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css';
import { Protected, Tweet } from "./components"
import TweetLayout from './layouts/tweetLayout.jsx'

import {
  Login,
  Post,
  Editpost,
  ExploreVideosPage,
  Home,
  Signup,
  Addtweet,
  TweetPage,
  UploadPage,
  ChannelPage,
  ExploreTweetsPage,
  NotFound
} from "./pages"


const router = createHashRouter([
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
            <ExploreVideosPage />
          </Protected>
        ),
        children: []
      },
      {
        path: '/all-tweets',
        element: (
          <Protected authentication={true}>
            <ExploreTweetsPage />
          </Protected>
        ),
        children: []
      },
      {
        path: "tweet",
        element: <TweetLayout />,
        children: [
          {
            path: 'add-tweet',
            element: (
              <Protected authentication={true}>
                <Addtweet />
              </Protected>
            ),
            children: []
          },
          {
            path: ":tweetId",
            element: (
              <Protected authentication>
                <Tweet />
              </Protected>
            ),
            children: []
          }
        ]
      },
      {
        path: '/add-post',
        element: (
          <Protected authentication={true}>
            <UploadPage />
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
      },
      {
        path: '/channel/:slug',
        element: (
          <Protected authentication={true}>
            <ChannelPage />
          </Protected>
        ),
        children: []
      },
      {
        path: '*',
        element: <NotFound />,

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
