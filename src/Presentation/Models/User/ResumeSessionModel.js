import { useEffect, useState } from "react"
import getProfile from "../../../Domain/UseCase/User/GetProfile"

export default function ResumeSessionModel () {
    const [user, setUser] = useState({});
    
    const handleFetch = async () => {
        const data = await getProfile()
        setUser(data || {})
    }
    useEffect(() => {
        handleFetch()
    }, [])

    return {user, setUser}
}