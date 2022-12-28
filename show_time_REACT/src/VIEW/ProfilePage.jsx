import { Button, Select, TextInput, Checkbox, Label, Dropdown, FileInput } from "flowbite-react";
import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react";



async function handleForm(event) {
  event.preventDefault();

  const password = event.target.password.value;
  const email = event.target.email.value;
  console.log("password: ", password);
  console.log("email: ", email);
  alert("Concert successfully modified!");
}

async function modifyUser(event) {
  const password = event.target.password.value;
  const email = event.target.email.value;
  event.preventDefault();
  
  let token = JSON.parse(localStorage.getItem("access_token"));
  if (!token) {
    return;
  } else {
    const user = await fetch("http://localhost:3000/users/findWithToken/" + token.access_token)
    .then((response) => response.json());
    const requestOptions = {
      method: "PUT", 
      body: JSON.stringify({password: password, email: email}), 
      headers: { 'Content-Type': 'application/json' }
    }
    await fetch("http://localhost:3000/users/" + user.user[0]._id, requestOptions)
        .then((response) => response.json());
    alert("Successfully updated your credentials");
  }
}

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  
  
  useEffect(() => {
    async function computeConnectedUser() {
      let token = JSON.parse(localStorage.getItem("access_token"));
      if (!token) {
        return;
      } else {
        const response = await fetch(
          "http://localhost:3000/users/findWithToken/" + token.access_token
        ).then((response) => response.json());
        setUser(response);
        console.log(token.access_token);
      }
    }
    computeConnectedUser();
  }, []);
  return (

    <div className="mt-6 mx-20">
      {user ? <div className="flex flex-col items-center ">
        <div className="flex p-4 w-1/5  justify-start flex-col bg-gray-200 ring-1 ring-gray-900 rounded">
          <div className="mb-4 block flex justify-between">
            <p>Your username : {user.user[0].username}</p>
          </div>

          <div className="mb-2 block flex justify-between">
            <p>Your email : {user.user[0].email}</p>
          </div>
          <div className="mb-2 block flex justify-between">
            <ul>Your favourites : {user.user[0].favourites.map((favourite) => <li>{favourite}</li>)}</ul>
          </div>
        </div>
      </div> : ('User not found')}

      <form className="flex flex-col mt-4  gap-4" onSubmit={modifyUser}>
        <h1>Manage your personal credentials:</h1>


        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your new email" />
          </div>
          <TextInput id="email" name="email" type="email" required={true} />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your new password" />
          </div>
          <TextInput id="password" type="password" name="password" required={true} />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ProfilePage;
