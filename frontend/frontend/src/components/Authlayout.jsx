import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected({ children, authentication = true } = {}) {
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.user.status)

    useEffect(() => {
        // if (authStatus === null) return

        if (authentication && authStatus === false) {
            navigate('/login')
            return
        }

        if (!authentication && authStatus === true) {
            navigate('/')
            return
        }

        setLoader(false)
    }, [navigate, authentication, authStatus])

    if (loader) {
        return <h1>loading...</h1>
    }
    return <>{children}</>
}