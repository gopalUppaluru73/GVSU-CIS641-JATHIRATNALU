import React, {useContext} from 'react'
import {Outlet} from 'react-router-dom'
import { FaShoppingBag, FaUserAlt, FaPowerOff } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'

import AdminAuth from '../components/AdminAuth'
import { Context } from '../config/Provider';

export default function Dash() {
  const navigation = useNavigate()
  const state = useContext(Context)

  const logout = () => {
    localStorage.removeItem('admin')
    window.location.reload()
  }

  return (
    <AdminAuth>
      <div className="padding-all-10 black-bg fixed width-100">
        <div className="flex-row justify-content-space-between">
          <div className="white-text bold-text cursor-pointer" onClick={()=>navigation('/admin')}>Food App</div>
          <div className="white-text">
            <div className="flex-row">
              <div>
                <FaPowerOff className="cursor-pointer" onClick={logout} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </AdminAuth>
  )
}
