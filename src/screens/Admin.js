import React,{useState, useEffect} from 'react'
import { FiExternalLink } from "react-icons/fi";

import { getDatabase, onValue, ref } from 'firebase/database'
import { app } from '../config/firebase'
import { tables } from '../config/tables'
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const navigation = useNavigate()
    const [orders, setOrders] = useState([])

    // Firebase
    const db = getDatabase(app)
    const dbref = ref(db, tables.orders)

    useEffect(()=>{
        onValue(dbref, snapshot=>{
            if(snapshot.exists()){
                const data = snapshot.val()
                const arr = []
                const keys = Object.keys(data)
                keys.forEach(key => arr.push({...data[key], id: key}))
                setOrders(arr)
            }else{
                setOrders([])
            }
        })
    }, [])

    const t_head = ['No', 'Date', 'Email', ''].map((item, index)=>(
        <th key={index}>{item}</th>
    ))

    const orderList = orders.length > 0 ? orders.map((item, index)=>(
        <tr key={index}>
            <td>{index+1}</td>
            <td>{item.date}</td>
            <td>{item.email}</td>
            <td><FiExternalLink className="font-20 cursor-pointer" onClick={()=>navigation(`/admin/order/${index}`)} /></td>
        </tr>
    )) : <></>
  return (
    <>
        <div className="padding-all-50" />

        <div className="width-50 width-lx-60 width-l-70 width-m-100 width-s-100 margin-auto">
            <table className="table bordered">
                <thead><tr>{t_head}</tr></thead>
                <tbody>{orderList}</tbody>
            </table>
        </div>
        
        <div className="padding-all-20" />
    </>
  )
}
