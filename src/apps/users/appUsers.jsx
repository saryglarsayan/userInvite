import React, { useEffect, useState } from 'react';
import './index.scss';
import IndexUsers from './components/indexUser';
import Success from './components/Success';

function AppUsers(props) {

    const [users , setUsers] = useState([]);
    const [invites , setInvites] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const [succsess , setSuccsess] = useState(false);
    const [searchValue , setSearchValue] = useState(['']);

    useEffect(()=>{
        fetch('https://reqres.in/api/users')
            .then(res => res.json())
            .then(json => {setUsers(json.data)})
            .catch((err)=>{
                console.warn(err);
                alert('Error by getting users')
            })
            .finally(()=>setLoading(false));
    },[])

    const onChangeSearchValue = (event) =>{
        setSearchValue(event.target.value)
    }

    const onClickInvite = (id)=>{
        if(invites.includes(id)){
            setInvites(prev => prev.filter(e => e !== id))
        } else {
            setInvites(prev => [...prev, id])
        }
    }

    const onClickSendInvites = ()=>{
        setSuccsess(true)
    }


    return (
        <div className='App'>
        {
            succsess ? <Success count={invites.length}/> 
            : 
            (<IndexUsers 
                items={users}  
                isLoading={isLoading}
                searchValue={searchValue}
                onChangeSearchValue={onChangeSearchValue}
                invites={invites}
                onClickInvite={onClickInvite}
                onClickSendInvites={onClickSendInvites}    
            />)
        }
        </div>
    );
}

export default AppUsers;

// Тут список пользователей: https://reqres.in/api/users

//добавление новых пользователей + Usecontent тк водопад пропсов