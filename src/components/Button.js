import React from 'react'
import { Oval } from 'react-loader-spinner'

export default function Button({loading, name, onClick, className}) {
    if(loading){
        return (
            <button className={className ?? ''} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Oval
                    height={20}
                    width={20}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </button>
        )
    }
  return (
    <button className={className ?? ''} onClick={()=>onClick ? onClick() : null} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {name ?? 'Button'}
    </button>
  )
}
