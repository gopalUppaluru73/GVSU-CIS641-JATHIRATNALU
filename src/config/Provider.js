import React, {useState, useEffect} from 'react'

export const Context = React.createContext({
    info: null,
    num: 0,
    cart: [],
    total: 0,
    updateCart: arr=>{},
    setInfo: obj=>{}
})

export default function Provider({children}) {
    const [info, setInfo] = useState(null)
    const [num, setNum] = useState(0)
    const [total, setTotal] = useState(0)
    const [cart, setCart] = useState([])

    const updateCart = arr => {
        if (arr.length === 0) {
            setNum(0)
            setCart([])
            // setTotal(0)
            return
        }

        let t = 0, n = 0
        arr.forEach(item=>{
            // t += Number(item.qty) * Number(item.price) // Uncomment when we had price to the item
            n += Number(item.qty)
        })
        setNum(n)
        setCart(arr)
        // setTotal(t) // Uncomment when price is added to product
    }

    const updateInfo = obj => setInfo(obj)

    useEffect(()=>{
        let c = localStorage.getItem('cart')
        let ui = localStorage.getItem('userInfo')
        if (c){
            c = JSON.parse(c)
            let n = 0
            c.forEach(item=>n+= Number(item.qty))
            setCart(c)
            setNum(n)
        }
        if(!ui) return
        setInfo(JSON.parse(ui) ?? null)
    }, [])

  return (
    <Context.Provider 
        value={{
            info,
            num,
            cart,
            total,
            updateCart,
            setInfo: updateInfo,
        }}
    >{children}</Context.Provider>
  )
}
