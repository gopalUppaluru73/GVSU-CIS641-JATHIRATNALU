import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../config/Provider'

export default function Order() {
    const { id } = useParams()
    const state = useContext(Context)
    const [orderDate, setOrderDate] = useState('')
    const [order, setOrder] = useState([])

    useEffect(()=>{
        let filterItem = state.info?.order ?? []
        if(filterItem.length === 0) return
        filterItem = filterItem.filter((item, index)=>index === Number(id))[0]
        setOrderDate(filterItem?.date ?? '')
        setOrder(filterItem?.order ?? [])
    }, [])

    const orders = order.length > 0 ? order.map((item, index)=>(
        <div className="col-3 col-lx-4 col-l-6 col-m-12 col-s-12 padding-all-10" key={index}>
            <div><img src={item.img} alt="" className="img" /></div>
            <div>Name: {item.name}</div>
            <div>Qty: {item.qty}</div>
        </div>
    )) : <></>

  return (
    <>
        <div className="padding-all-50" />
        <div className="font-20 bold-text center-text">Recipe Order on {orderDate}</div>
        <br />
        <div className="width-70 margin-auto">
            <div className="row">{orders}</div>
        </div>
        <div className="padding-all-20" />
    </>
  )
}
