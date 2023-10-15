import React from 'react';
import Skeleton from './Skeleton';
import Userr from './User';

function IndexUsers({ 
    items, 
    isLoading, 
    searchValue, 
    onChangeSearchValue, 
    invites, 
    onClickInvite,
    onClickSendInvites
  }) {
   
  
    return (
        <>
        <div className="search">
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
          </svg>
          <input 
            value={searchValue} 
            onChange={onChangeSearchValue} 
            type="text" 
            placeholder="Найти пользователя..." 
            />
        </div>
        {isLoading ? (
          <div className="skeleton-list">
            <Skeleton/>
            <Skeleton/>
          </div>
        ) : (
          <ul className="users-list">
            {
              items.filter((e) => {
                const fullName = (e.first_name + e.last_name).toString().toLowerCase();

                return(
                  fullName.includes(searchValue.toString().toLowerCase()) || 
                  e.email.toString().toLowerCase().includes(searchValue.toString().toLowerCase())
                  )
              }).map((e)=>(
                <Userr 
                  key={e.id} 
                  {...e}
                  isInvited={invites.includes(e.id)}
                  onClickInvite={onClickInvite}
                />
              ))
            }
          </ul>
        )}
        {
          invites.length > 0 && (
            <button 
              onClick={onClickSendInvites} 
              className="send-invite-btn">Отправить приглашение
            </button>
          )
        }
      </>
    );
}

export default IndexUsers;


/* if(fullName.includes(searchValue.toLowerCase()) || e.email.toLowerCase().includes(searchValue.toLowerCase())){
  return true
} */