import React, { useState, useContext } from 'react'
import { Context } from '../config/Provider'
import Button from '../components/Button'
import Input from '../components/Input'
import toast from 'react-hot-toast'
import { getDatabase, ref, set } from 'firebase/database'
import { app } from '../config/firebase'
import { tables } from '../config/tables'
import { useNavigate } from 'react-router-dom'

export default function Edit() {
    const navigation = useNavigate()
    const myContext = useContext(Context)
    const [state, setState] = useState({fullname: myContext.info.fullname, phone: myContext.info.phone})
    const [loading, setLoading] = useState(false)
    const onChange = e => setState({...state, [e.target.name]: e.target.value})

    // Firebase
    const db = getDatabase(app)
    const dbref = ref(db, `${tables.account}/${myContext.info.id}`)

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true)
        const obj = {...myContext.info, ...state}
        const {fullname, phone} = state
        if(!(fullname && phone)){
            toast.error('Fields cannot be empty')
            setLoading(false)
            return
        }
        set(dbref, obj)
        .then(()=>{
            toast.success('Information updated')
            myContext.setInfo(obj)
            localStorage.setItem('userInfo', JSON.stringify(obj))
            navigation('/account')
        })
        .catch(()=>toast.error('Failed to update info'))
        .finally(()=>setLoading(false))
    }

  return (
    <>
        <div className="padding-all-50" />
        <div className="width-25 margin-auto account padding-all-10">
            <div className="center-text font-20 bold-text">Account</div>
            <br />
            <form onSubmit={onSubmit}>
                <label>Fullname</label>
                <Input value={state.fullname} onChange={onChange} className="input" name="fullname"/>
                <br />
                <br />
                <label>Phone Number</label>
                <Input value={state.phone} onChange={onChange} className="input" name="phone"/>
                <br />
                <br />
                <div className="flex-row-reverse">
                    <Button loading={loading} name="Update Info" className="black-bg white-text width-100" />
                </div>
            </form>
        </div>
    </>
  )
}
