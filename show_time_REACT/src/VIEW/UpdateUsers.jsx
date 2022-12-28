import { Button, Label, TextInput, Select } from "flowbite-react";
import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react";

async function updateUser(event)
{
  event.preventDefault();
  const username = event.target.username.value;
  const password = event.target.password.value;
  const admin_input = event.target.admin_rights.value;
  const userId = localStorage.getItem('user_id');
  let admin_rights_to_add;
  console.log('username: ', username);
  console.log('password: ', password);
  console.log('admin_input: ', admin_input);

  if(admin_input === "With")
  {
    admin_rights_to_add = true;
  }
  else if(admin_input === "Without")
  {
    admin_rights_to_add = false;
  }

  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({username: username, password: password, admin_status: admin_rights_to_add}),
    headers: { 'Content-Type': 'application/json' }
  }
  await fetch('http://localhost:3000/users/' + userId, requestOptions)
    .then((response) => response.json());

  localStorage.removeItem('user_id');
  alert('successfully updated ' + username);
}

const UpdateUsers = () => { 
  const params = useParams();
  const id = params.id;
  console.log(id);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function computeuser() {
      const response = await fetch('http://localhost:3000/users/' + id)
        .then((response) => response.json());
      setUser(response);
    }

    computeuser();
    localStorage.setItem('user_id', id)
    console.log(localStorage.getItem('user_id'));

  }, [])
return ( 

<div>
  {user ? <p>Updating: {user.user.username}</p> : ('Loading...')}
<form className="flex justify-center  flex-col gap-4 mt-8 mx-20" onSubmit={updateUser}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Username" value="New username" />
          </div>
          <TextInput id="username" name="username" type="text" required={true} />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="New password" />
          </div>
          <TextInput id="password" name="password" type="password" required={true} />
        </div>

        <div>
          <div id="select">
            <div className="mb-2 block">
              <Label htmlFor="user-right" value="Select user right" />
            </div>
            <Select id="admin_rights" required={true} name="admin_rights">
              <option value="" selected disabled hidden>
                Admin rights
              </option>
              <option>With</option>
              <option>Without</option>

            </Select>
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
</div>

);
};

export default UpdateUsers;