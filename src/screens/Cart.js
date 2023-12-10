import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../config/Provider';
import { FcEmptyTrash } from 'react-icons/fc';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Button from '../components/Button';
import toast from 'react-hot-toast'; // Import toast

import { app } from '../config/firebase';
import { getDatabase, ref, set, push } from 'firebase/database';
import { tables } from '../config/tables';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigation = useNavigate();
  const state = useContext(Context);
  const [userOrders, setUserOrders] = useState([]);
  const [userObj, setUserObj] = useState(null);
  const [loading, setLoading] = useState(false);

  // Firebase
  const db = getDatabase(app);
  const dbref = ref(db, `${tables.account}/${state.info.id}`);
  const adminRef = ref(db, tables.orders);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) return;
    const info = JSON.parse(userInfo);
    setUserOrders(info?.order ?? []);
    setUserObj(info);
  }, []);

  const removeItem = (ind) => {
    let c = state.cart;
    const removedItem = c.splice(ind, 1)[0]; // Get the removed item
    localStorage.setItem('cart', JSON.stringify(c));
    state.updateCart(c);
    toast.success(`${removedItem.name} removed from the cart!`); // Show notification
  };

    const plus = ind => {
        let c = state.cart
        c = c.map((item, index)=>{
            if(index === ind){
                item['qty'] += 1
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(c))
        state.updateCart(c)
    }

    const minus = ind => {
        const findItem = state.cart.filter((item, index)=>index === ind)[0]
        let c = state.cart

        if(findItem['qty'] - 1 > 0){
            c = c.map((item, index)=>{
                if(index === ind){
                    item['qty'] -= 1
                }
                return item
            })
            localStorage.setItem('cart', JSON.stringify(c))
            state.updateCart(c)
            return
        }
        
        c.splice(ind, 1)
        localStorage.setItem('cart', JSON.stringify(c))
        state.updateCart(c)
    }

    const cart = state.cart.length > 0 ? state.cart.map((item, index)=>(
        <React.Fragment key={index}>
            <div className="flex-row align-items-center">
                <div className="col-2 padding-all-5">
                    <img 
                    src={item.img} 
                    alt="img" 
                    className="img" 
                    />
                </div>
                <div className="col-4 padding-all-5">
                    <div>{item.name}</div>
                    <div>Qty: {item.qty}</div>
                </div>
                <div className="col-5 padding-all-5">
                    {/* <div className="flex-row align-items-center justify-content-center">
                        <div><AiOutlineMinus onClick={()=>minus(index)} className="font-25 cursor-pointer" /></div>
                        <div className="cartN">{item.qty}</div>
                        <div><AiOutlinePlus onClick={()=>plus(index)} className="font-25 cursor-pointer" /></div>
                    </div> */}
                </div>
                <div className="col-1 padding-all-5">
                    <FcEmptyTrash onClick={()=>removeItem(index)} className="font-25 cursor-pointer" />
                </div>
            </div>
        </React.Fragment>
    )) : <></>

    // send-confirmation
    const sendConfirmation = async(email, itemString) => {
        try{
          const context = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email, itemString})
          }
          const result = (await fetch('http://localhost:4000/send-confirmation', context)).json()
          toast.success('Check your email for verification code')
          return result
        }catch(e){
          toast.error('Failed to send verification code')
          setLoading(false)
        }
      }

    const checkout = () => {
        setLoading(true)
        const obj = {date: new Date().toLocaleDateString(), order: state.cart}

        let string = ''
        state.cart.forEach(item=>string+= `${item.name},`)
        
        push(adminRef, {...obj, email: userObj.email})

        const setObj = {...userObj, order: [...userOrders, obj]}

        set(dbref, setObj)
        .then(()=>{
            toast.success('Checkout was successful. User record updated')
            localStorage.setItem('cart', JSON.stringify([]))
            state.updateCart([])
            state.setInfo(setObj)
            sendConfirmation(state.info.email, string)
            .then(()=>toast.success('Confirmation email sent'))
            .catch(()=>toast.error('Failed to send confirmation email'))
        })
        .catch(err=>{
            toast.error('Failed to update user record')
        })
        .finally(()=>{
            setLoading(false)
            navigation('/')
        })
    }

  return (
    <>
    <div className="width-100 min-height-100 off-white-bg" style={{ backgroundImage: 'url("https://image.freepik.com/free-photo/shopping-cart-plain-background-with-copy-space_23-2148288240.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
        <div className="padding-all-50" />

        {/* <div className="width-45 width-lx-60 width-l-80 width-m-90 width-s-95 margin-auto">
            <div className="center-text font-30 bold-text">Food Recipe Hub - Cart</div>
            <br />
            <>{cart}</>
        </div> */}

        <div className="center-text font-30 bold-text">Food Recipe Hub - Cart</div>
        <br />

        <div className="width-70 margin-auto">
            <div className="row">
                <div className="col-9 col-l-12 col-m-12 col-s-12 padding-all-10">
                    <div className="cartB padding-all-10">{cart}</div>
                </div>
                <div className="col-3 col-l-12 col-m-12 col-s-12 padding-all-10">
                    <div className="cartB padding-all-10">
                        <div className="font-20 bold-text uppercase center-text">Checkout</div>
                        <br />
                        <Button onClick={checkout} loading={loading} name="Checkout" className="width-100 red-bg white-text cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>

        <div className="padding-all-20" />
    </>
  )
}
