import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Auth({children}) {
    const navigation = useNavigate()
    useEffect(()=>{
        const user = localStorage.getItem('admin')
        if(!user) navigation('/login')
    }, [])

  return (
    <>{children}</>
  )
}
