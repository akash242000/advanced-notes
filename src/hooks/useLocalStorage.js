import React, { useEffect, useState } from 'react'

export default function useLocalStorage(key, deafultvalue) {
    const [value, setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(key);

        
        if(jsonValue!==null){
            return JSON.parse(jsonValue)
        }

        if(typeof deafultvalue=='function'){
            return jsonValue()
        }

        else{
            return deafultvalue
        }
    });

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])


    return [value,setValue]
}
