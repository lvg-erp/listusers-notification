import React, { useEffect, useState } from "react";
import { Success } from "./components/Success";
import { Users } from "./components/Users";
// import './index.scss';

export default function App() {
    //список пользователей: https://reqres.in/api/users
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [searchValue, setSerchValue] = useState('')
    const [invites, setInvinites] = useState<string[]>([])
    const [success, setSuccess] = useState(false)

    
    useEffect(()=>{
        fetch('https://reqres.in/api/users')
                .then((res) => res.json())
                .then((json) => {
                    setUsers(json.data)   
                }).catch(err => {
                    console.warn(err)})
                .finally(()=>setLoading(false))      
    },[])

    const onChangeSearchValue=(event: React.FormEvent<HTMLInputElement>)=>{
        setSerchValue(event.currentTarget.value)
    }

    const onClickInvite = (id: string) => {
        if (invites.includes(id)) {
            setInvinites(prev=>prev.filter(_id=> _id !== id))
        } else {
            setInvinites(prev => [...prev, id])
        }
    }

    const onClickSendInvites = () => {
        setSuccess(true)
    }

    return (
        <div className="App">
            {
                success ? ( 
                <Success count={invites.length} /> 
                ) : (
                <Users
                    onChangeSearchValue = {onChangeSearchValue} 
                    searchValue={searchValue} 
                    items={users} 
                    isLoading={isLoading} 
                    invites={invites}
                    onClickInvite={onClickInvite}    
                    onClickSendInvites={onClickSendInvites}      
                />
                )
            }
        </div>
    )
}