import UserForAdmin from "../Component/user";
import Test from "../Component/testfile";
import React, {useState, useEffect} from "react";


const ManageUsers = () =>
{
    const [users, setUsers] = useState(null);

    useEffect(() => {
        async function computeUsers(){
            const response = await fetch("http://localhost:3000/users")
                .then((response) => response.json())
            setUsers(response);
        }
        computeUsers();
    }, [])

    return(
        <div>
            <div className="mt-4">
            {users ? users.users.map((user) => <UserForAdmin user={user}/>) : ("Loading...")}
            </div>

        </div>
    )
}

export default ManageUsers;


