import {lazy, Suspense} from 'react'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ErrorScreen from './ErrorScreen'

const Login = lazy(()=>import('./screens/Login'))
const Dash = lazy(()=>import('./screens/Dash'))
const AdminDash = lazy(()=>import('./screens/AdminDash'))
const Home = lazy(()=>import('./screens/Home'))
const Cart = lazy(()=>import('./screens/Cart'))
const Account = lazy(()=>import('./screens/Account'))
const Edit = lazy(()=>import('./screens/Edit'))
const Order = lazy(()=>import('./screens/Order'))
const Admin = lazy(()=>import('./screens/Admin'))
const AdminOrder = lazy(()=>import('./screens/AdminOrder'))

const Loader = () => <div>Loading...</div>

export default function Nav() {
    const router = createBrowserRouter([
        {
          path: '/',
          element: <Suspense fallback={<Loader />}><Dash /></Suspense>,
          errorElement: <ErrorScreen />,
          children: [
            {
              path: '/',
              element: <Suspense fallback={<Loader />}><Home /></Suspense>
            },
            {
              path: '/cart',
              element: <Suspense fallback={<Loader />}><Cart /></Suspense>
            },
            {
              path: '/account',
              element: <Suspense fallback={<Loader />}><Account /></Suspense>
            },
            {
              path: '/account/edit',
              element: <Suspense fallback={<Loader />}><Edit /></Suspense>
            },
            {
              path: '/account/order/:id',
              element: <Suspense fallback={<Loader />}><Order /></Suspense>
            },
          ]
        },
        {
          path: '/admin',
          element: <Suspense fallback={<Loader />}><AdminDash /></Suspense>,
          errorElement: <ErrorScreen />,
          children: [
            {
              path: '/admin',
              element: <Suspense fallback={<Loader />}><Admin /></Suspense>
            },
            {
              path: '/admin/order/:id',
              element: <Suspense fallback={<Loader />}><AdminOrder /></Suspense>
            },
          ]
        },
        {
          path: '/login',
          element: <Login />,
          errorElement: <ErrorScreen />
        },
      ])
      return (
        <RouterProvider router={router} />
      )
}
