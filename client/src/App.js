import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

import { useAuth } from './auth/useAuth'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const getMessages = async () => {
        const res = await axios.get('https://f75xasyenb.execute-api.us-east-1.amazonaws.com/dev/api/messages')
        return res
    }
    // const { data, isLoading, isError } = useQuery('messages', getMessages)
    const { user, signin, signout, checkAuth } = useAuth()

    const handleSignIn = async event => {
        event.preventDefault()
        const signinResponse = await signin(username, password)
    }

    const handleSignout = async event => {
        event.preventDefault()
        await signout()
    }

    // const handleAuthCheck = async () => {
    //     const authStatus = await checkAuth()
    //     if (authStatus.data) {
    //         setJWT(authStatus.data)
    //     }
    //     else {
    //         return
    //     }
    // }

    // useEffect(() => {
    //     handleAuthCheck()
    // }, [JWT])

    return (
        <>
            {user ? <>
                <button onClick={handleSignout}>Sign Out</button>
                <h1>YOU ARE SIGNED IN</h1>
            </> :
                <form onSubmit={handleSignIn}>
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value)
                        }}
                    />
                    <input
                        placeholder="Password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                    />
                    <button>Sign In</button>
                </form>}
        </>
    )
}

export default App