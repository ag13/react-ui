import { useState, useCallback } from 'react'

export function useLocalStorage<T = any>(
    key: string,
    initialValue: T
): [T, (value:T) => void] {

    const [storedValue, setStoredValue] = useState(() => {
        try{
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        }catch(err){
            return initialValue
        }
    })

    const setValue = useCallback((value: T) => {
        try{
            if(key){
                setStoredValue(value)
                window.localStorage.setItem(key, JSON.stringify(value))
            }
        }catch(error){
            console.log(error)
        }
    }, [key])

    return [storedValue, setValue]
}