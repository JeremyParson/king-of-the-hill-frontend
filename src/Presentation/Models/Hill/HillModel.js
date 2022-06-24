import { useEffect, useState } from "react";
import getHills from "../../../Domain/UseCase/Hill/GetHills";

export default function HillModel() {
    const [hills, setHills] = useState([])

    const indexHills = async () => {
        const hills = await getHills()
        setHills(hills)
    }

    useEffect(() => {
        indexHills()
    }, [])


    return {hills, indexHills}
}