import axios from "axios";
import React from "react";
import { URL } from "../url";

export const UserContext = React.createContext({});

export function UserContextProvider({children}){
    const [user,setUser]=React.useState(null);
    React.useEffect(()=>{
        getUser()
    },[])
    const getUser=async()=>{
        try{
            const res = await axios.get(URL+"/api/auth/refetch",{withCredentials:true})
            setUser(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    return <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
}