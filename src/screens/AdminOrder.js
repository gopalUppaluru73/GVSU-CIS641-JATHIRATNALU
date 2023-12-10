import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import { getDatabase, onValue, ref } from 'firebase/database'
import { app } from '../config/firebase'
import { tables } from '../config/tables'

export default function AdminOrder() {
    const {id} = useParams()
    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState([])
    const [email, setEmail] = useState('')
    const [odate, setODate] = useState('')

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

                const filterItem = arr.filter((item, index) => index === Number(id))[0]
                setODate(filterItem?.date ?? '')
                setEmail(filterItem?.email ?? '')
                setOrder(filterItem?.order ?? [])
            }else{
                setOrders([])
            }
        })
    }, [])

    const orderList = order.length > 0 ? order.map((item, index)=>(
        <div className="col-3 col-lx-4 col-l-6 col-m-12 col-s-12 padding-all-10" key={index}>
            <div><img src={item.img} alt="" className="img" /></div>
            <div>Name: {item.name}</div>
            <div>Qty: {item.qty}</div>
        </div>
    )) : <></>
  return (
    <>
        <div className="padding-all-50" />
        <div className="width-70 margin-auto">
            <div className="center-text">
                <div className="font-20 bold-text">Recipe Order on {odate}</div>
                <div className="font-14">By: {email}</div>
            </div>
            <br />
            <div className="row">{orderList}</div>
        </div>
        <div className="padding-all-20" />
    </>
  )
}
