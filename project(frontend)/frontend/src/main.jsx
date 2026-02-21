import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/store.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <RouterProvider router={router} /> */}
    </Provider>
  </StrictMode>,
)
