import React, {useContext, useState, useEffect} from 'react'
import { Context } from '../config/Provider'

import { FiEdit, FiExternalLink } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

export default function Account() {
    const navigation = useNavigate()
    const state = useContext(Context)
    const [order, setOrder] = useState([])
    const edit = () => navigation('/account/edit')

    const orders = order.length > 0 ? order.map((item, index)=>(
        <tr key={index}>
            <td>{index+1}</td>
            <td>{item.date}</td>
            <td><FiExternalLink className="font-20 cursor-pointer" onClick={()=>navigation(`/account/order/${index}`)} /></td>
        </tr>
    )) : <></>

    const t_head = ['No', 'Date', ''].map((item, index)=>(
        <th key={index}>{item}</th>
    ))

    useEffect(()=>{
        if(state?.info?.order) setOrder(state.info.order)
    }, [])
  return (
    <>
        <div className="padding-all-50" />

        <div className="width-60 width-lx-85 width-l-100 width-m-90 width-s-95 margin-auto">
            <div className="row">
                <div className="col-5 col-m-12 col-s-12 padding-all-10">
                    <div className="account padding-all-10">
                        <div className="center-text font-20 bold-text">Account Information</div>
                        <br />
                        <label>Fullname</label>
                        <input value={state?.info?.fullname ?? ''} className="input" disabled/>
                        <br />
                        <br />
                        <label>Phone Number</label>
                        <input value={state?.info?.phone ?? ''} className="input" disabled/>
                        <br />
                        <br />
                        <label>Email</label>
                        <input value={state?.info?.email ?? ''} className="input" disabled/>
                        <br />
                        <br />
                        <div className="flex-row-reverse">
                            <button onClick={edit} className="black-bg white-text cursor-pointer"><FiEdit /></button>
                        </div>
                    </div>
                </div>
                <div className="col-1 col-m-12 col-s-12 padding-all-10"></div>
                <div className="col-6 col-m-12 col-s-12 padding-all-10">
                    <div className="font-20 bold-text center-text">Recipe Orders</div>
                    <br />
                    <table className="table bordered">
                        <thead><tr>{t_head}</tr></thead>
                        <tbody>{orders}</tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="padding-all-20" />
    </>
  )
}
