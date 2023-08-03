import UpdateUser from "./update"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { httpGet } from "@/app/core/repository/http-request-contract"


export const UserModel = [{ id: 1, name: "", lastName: "", email: "", password: "" }]
export default function EditUserComponent() {
    const [user, setUser] = useState({ id: 0, name: "", lastName: "", email: "", password: "" })
    const [render, renderUser] = useState(<UpdateUser/>)
    const router = useRouter()
    useEffect(() => {
        if (router.asPath !== router.route) {
            httpGet("user/" + router.query.id).then((response) => {
                setUser(response)
                console.log(response);
                renderUser(<UpdateUser user={user}/>)

            }).catch((error) => console.log(error))
        }
    }, [router.isReady])
    return (
        <div>{user.id != 0 ? (<UpdateUser user={user} />) : (<div></div>)}</div>
    )
}