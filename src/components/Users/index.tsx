import { Skeleton } from "./Skeleton";
import { User } from "./User";

export interface IUserAr{
    id: string
    email: string
    first_name: string
    last_name: string
    avatar: string
}

interface IUsers{
    items: IUserAr[]
    isLoading: true | false
    searchValue: string
    onChangeSearchValue: any
    invites: string[]
    onClickInvite: any
    onClickSendInvites: any
}

export const Users = ({items, 
                     isLoading, 
                     searchValue, 
                     onChangeSearchValue, 
                     invites, 
                     onClickInvite,
                     onClickSendInvites }:IUsers) => 
{

//    console.log(items);
    return(
        <>
            <div className="search">
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
                <input  value={searchValue} 
                        onChange={onChangeSearchValue} 
                        type="text" 
                        placeholder="Найти пользователя..." />
            </div>
            {isLoading ? (
                <div className="skeleton-list">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>            
            ) : (
                 <ul className="users-list">
                     { items
                        .filter((obj) => {
                            const fullName = (obj.first_name + obj.last_name).toUpperCase() 

                            return ( fullName.includes(searchValue.toUpperCase()) || obj.email.includes(searchValue.toUpperCase()) ) 
                        })
                        .map((obj) => (
                             <User 
                                key={obj.id} 
                                items_user={obj}
                                isInvited={invites.includes(obj.id)}
                                onClickInvite={onClickInvite}
                            />
                    ))}   
                </ul>    
            )}
            {
                invites.length > 0 && (
                    <button  className="send-invite-btn" onClick={onClickSendInvites} >Отправить приглашение</button>
                )
            }
        
        </>
    )
}