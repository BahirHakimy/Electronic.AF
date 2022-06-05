import React from 'react'
const authContext = React.createContext()



function AuthProvider({children}){

    const [user,setUser] = React.useState({"email":"","resetCode":""})

    
    return <authContext.Provider value={{user,setUser}}>

        {children}
    </authContext.Provider>
}

function useAuth(){
        const value = React.useContext(authContext);
        if (value){
            return value;
        }else{
            throw new Error("useAuth must be used within an AuthProvider")
        }

}

export {AuthProvider,useAuth}