import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import toast from 'react-hot-toast'

import { app } from '../config/firebase'
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import {getDatabase, ref, onValue, push} from 'firebase/database'
import { tables } from '../config/tables'
import { Context } from '../config/Provider'

export default function Login() {
  const myContext = useContext(Context)
  const navigation = useNavigate()
  const [users, setUsers] = useState([])
  const [state, setState] = useState({username: '', password: '', fullname: '', phone: ''})
  const [reg, setReg] = useState(false)
  const [loading, setLoading] = useState(false)
  const onChange = e => setState({...state, [e.target.name]: e.target.value})

  // Firebase
  const auth = getAuth(app)
  const db = getDatabase(app)
  const dbref = ref(db, tables.account)

  useEffect(()=>{
    onValue(dbref, snapshot=>{
      if(snapshot.exists()){
        const data = snapshot.val()
        const keys = Object.keys(data)
        const arr = []
        keys.forEach(key=>arr.push({...data[key], id: key}))
        setUsers(arr)
      }else{
        setUsers([])
      }
    })
  }, [])

  const sendCode = async(email, code) => {
    try{
      const context = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, code})
      }
      const result = (await fetch('http://localhost:4000/send-token', context)).json()
      toast.success('Check your email for verification code')
      return result
    }catch(e){
      toast.error('Failed to send verification code')
      setLoading(false)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const {username, password, fullname, phone} = state
    if(!(username && password)){
      toast.error('All the fields are required')
      setLoading(false)
      return
    }

    if(reg){
      if(!(fullname && phone)){
        toast.error('All the fields are required')
        setLoading(false)
        return
      }
      const obj = {fullname, phone, email: username}
      const findUser = users.find(item=>item.email.toLowerCase() === username.toLowerCase())
      if(findUser){
        toast.error(`An account with this email id(${username}) already exist`)
        setLoading(false)
        return
      }
      createUserWithEmailAndPassword(auth, username, password)
      .then(userCredential=>{
        push(dbref, obj)
        .then(()=>{
          toast.success("Account created")
          setReg(false)
        })
        .catch((err)=>{
          const error = err.message.split('/')[1].split(')')[0]
          toast.error(error)
        })
        .finally(()=>setLoading(false))
      })
      .catch(err=>{
        const error = err.message.split('/')[1].split(')')[0]
        toast.error(error)
        setLoading(false)
      })
    }else{
      signInWithEmailAndPassword(auth, username, password)
      .then(userCredential=>{
        toast.success('Login Success')
        const gcode = Math.floor(Math.random() * 10000)
        sendCode(username, gcode)
        .then(res=>{
          const code = prompt('Enter verification code: ')
          if(Number(code) === gcode){
            if (username.toLowerCase() === 'uppalurugopal40@gmail.com'){
              localStorage.setItem('admin', JSON.stringify({username: state.username}))
              setLoading(false)
              navigation('/admin')
            }else{
              const findUser = users.find(item=>item.email.toLowerCase() === username.toLowerCase())
              if(!findUser){
                toast.error('User information not found')
                setLoading(false)
                return
              }
              localStorage.setItem('user', JSON.stringify({username: state.username}))
              localStorage.setItem('userInfo', JSON.stringify(findUser))
              myContext.setInfo(findUser)
              setLoading(false)
              navigation('/')
            }
          }else{
            toast.error('Code is not valid')
          }
        })
        .catch(()=>toast.error('Failed to send token'))
        .finally(()=>setLoading(false))
      })
      .catch(err=>{
        const error = err.message.split('/')[1].split(')')[0]
        toast.error(error)
      })
      .finally(()=>setLoading(false))
    }
  }

  return (
    <div className="width-100 min-height-100 off-white-bg"  style={{ backgroundImage: 'url("https://png.pngtree.com/back_origin_pic/03/91/31/216a8c258305188af56217c3b58b99c5.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="padding-all-50" />
      <div className="width-30 width-lx-40 width-l-55 width-m-80 width-s-90 form margin-auto">
        <div className="center-text font-25 bold-text">{reg ? 'Sign Up' : 'Sign In'}</div>
        <form onSubmit={onSubmit}>
          {
          reg
          ?
          <>
            <Label label="Fullname" />
            <Input value={state.fullname} onChange={onChange} name="fullname" />
            <br />
            <br />

            <Label label="Phone Number" />
            <Input value={state.phone} onChange={onChange} name="phone" />
            <br />
            <br />
          </>
          :
          <></>
          }
          <Label label="Email" />
          <Input value={state.username} onChange={onChange} name="username" />
          <br />
          <br />
          <Label label="Password" />
          <Input type="password" value={state.password} onChange={onChange} name="password" />
          <br />
          <div className="font-14">{reg ? 'Already have an account? ' : "Don't have an account? "}<span onClick={()=>setReg(!reg)} className="red-hover cursor-pointer">{reg ? 'Login' : "Create a new account"}</span></div>
          <br />
          <Button loading={loading} name={reg ? 'Register' : 'Login'} />
        </form>
      </div>
      <div className="padding-all-50" />
    </div>
  )
}
