import { Button } from "flowbite-react";
import UpdateConcert from "../VIEW/UpdateConcert";

const UserForAdmin = ({ user }) => {
  function redirectUpdate()
  {
    window.location = "http://localhost:3001/UpdateUser/" + user._id;
  }
  async function deleteUser() {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await fetch("http://localhost:3000/users/" + user._id, requestOptions)
      .then((response) => response.json())
      .then((response) => console.log(response));
    alert(user.username + " successfully deleted.");
  }
  return (
    // composants pour admin pages: user -> (username, email, delete button)
    <div className="flex mt-4 justify-around rounded justify-center items-center border-2 p-1 mx-24">
      <h4>Username : {user.username}</h4>
      <h4>Email : {user.email}</h4>
      <button>
        <a>
          <Button className="" gradientMonochrome="info" pill={true} onClick={redirectUpdate}>
            Update
          </Button>
        </a>
      </button>
      <button>
        <Button
          className=""
          gradientMonochrome="failure"
          pill={true}
          onClick={deleteUser}
        >
          Delete
        </Button>
      </button>
    </div>
  );
};

export default UserForAdmin;
