import React, { useState, useContext, useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import toast from 'react-hot-toast'
import { Oval } from 'react-loader-spinner'
import { Context } from '../config/Provider'

export default function Home() {
  const myContext = useContext(Context)
  const YOUR_APP_ID = "f82654f3";
  const YOUR_APP_KEY = "ae6cc3696209df6d1980122a96f25454";
  const [cart, setCart] = useState(myContext.cart)
  const [prod, setProd] = useState([])
  const [state, setState] = useState({query: '', health: 'vegetarian'})
  const [loading, setLoading] = useState(false)
  const onChange = e => setState({...state, [e.target.name]: e.target.value})

  const opts = ['vegan', 'vegetarian', 'low-sugar', 'dairy-free', 'immuno-supportive', 'wheat-free'].map((item, index)=>(
    <option key={index} value={item}>{item}</option>
  ))

  useEffect(()=>{
    const c = localStorage.getItem('cart')
    setCart(c ? JSON.parse(c) : [])
  }, [])

  const url = `https://api.edamam.com/search?q=${state.query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${state.health}`;

  const onClick = () => {
    setLoading(true)
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
      setLoading(false)
      setProd(res.hits)
    })
    .catch(err=>{
      setLoading(false)
      toast.error('Error occurred while fetching data')
    })
  }

  const add = item => {
    if (cart.length === 0) {
      let c = [{ ...item, qty: 1 }];
      setCart(c);
      localStorage.setItem('cart', JSON.stringify(c));
      myContext.updateCart(c);
      toast.success('Item added to cart!');
      return;
    }

    const findI = myContext.cart.find(el => el.name === item.name);
    if (!findI) {
      let c = [...myContext.cart, { ...item, qty: 1 }];
      setCart(c);
      localStorage.setItem('cart', JSON.stringify(c));
      myContext.updateCart(c);
      toast.success('Item added to cart!');
      return;
    }

    const myC = myContext.cart.map(el => {
      if (item.name === el.name) {
        console.log('found');
        el['qty'] += 1;
      }
      return el;
    });
    localStorage.setItem('cart', JSON.stringify(myC));
    setCart(myC);
    myContext.updateCart(myC);
    toast.success('Item added to cart!');
  };


  const products = prod.length > 0 ? prod.map((item, index)=>(
    <div className="col-6 padding-all-10" key={index}>
      <div className='item-block'>
        <img 
          className="recipeTile__image" 
          src={item.recipe.image}
          alt={item.recipe.label}
          onClick={() => window.open(item.recipe.url)}
        />
        <div className='item-name'>{item.recipe.label}</div>
        <button onClick={() => add({ name: item.recipe.label, img: item.recipe.image })} className="cursor-pointer" style={{ padding: 5, backgroundColor: 'green', color: 'white' }}>Add</button>
      </div>
    </div>
  )) : <></>

  return (
    <div className="width-100 min-height-100 off-white-bg" style={{ backgroundImage: 'url("https://i.ytimg.com/vi/IIBTVfneFCo/maxresdefault.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="padding-all-50" />

      <div className="width-45 width-lx-60 width-l-80 width-m-90 width-s-95 margin-auto">
        <div className="center-text font-30 bold-text">Food Recipe Hub</div>
        <br />
        <div className="form">
          <div className="row justify-content-space-between">
            <div className="col-4 col-m-6 col-s-12 padding-all-5">
              <Input name="query" value={state.query} onChange={onChange} placeholder="Type the Ingredient" />
            </div>
            <div className="col-4 col-m-6 col-s-12 padding-all-5">
              <select value={state.health} onChange={onChange} name="health">{opts}</select>
            </div>
            <div className="col-3 col-l-3 padding-all-5">
              <Button loading={loading} name="Go" onClick={onClick} />
            </div>
          </div>
        </div>
        <br />
        <br />
        {
          loading
          ?
          <div className="flex-column justify-content-center align-items-center">
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
          :
          <>
            <div className="row">{products}</div>
          </>
        }
      </div>

      <div className="padding-all-20" />
    </div>
  )
}
