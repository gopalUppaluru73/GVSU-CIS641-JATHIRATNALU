import React, {useContext} from 'react'
import {Outlet} from 'react-router-dom'
import { FaShoppingBag, FaUserAlt, FaPowerOff } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'

import Auth from '../components/Auth'
import { Context } from '../config/Provider';

export default function Dash() {
  const navigation = useNavigate()
  const state = useContext(Context)

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    localStorage.removeItem('userInfo')
    window.location.reload()
  }

  return (
    <Auth>
      <div className="padding-all-10 black-bg fixed width-100">
        <div className="flex-row justify-content-space-between">
          <div className="white-text bold-text cursor-pointer" onClick={()=>navigation('/')}>Food App</div>
          <div className="white-text">
            <div className="flex-row">
              <div style={{ marginRight: 10 }}>
                <text>Profile</text>
                <FaUserAlt className="cursor-pointer" onClick={()=>navigation('/account')} />
              </div>
              <div style={{ marginRight: 10 }}>
                <FaShoppingBag className="cursor-pointer" onClick={()=>navigation('/cart')} />{state.num}
              </div>
              <div>
                <FaPowerOff className="cursor-pointer" onClick={logout} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </Auth>
  )
}
