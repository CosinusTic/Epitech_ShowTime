import { Button } from "flowbite-react";
import React from "react";


const Group = ({group}) => { 

  async function deleteGroup() {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await fetch("http://localhost:3000/groups/" + group._id, requestOptions)
      .then((response) => response.json())
      .then((response) => console.log(response));
    alert(group.name + " successfully deleted.");
  }

return ( 

<div className="flex mt-4 justify-around rounded justify-center items-center border-2 p-1 mx-48">
        <h4>{group.name}</h4>

        <button>
          <Button className=""  gradientMonochrome="failure" pill={true} onClick={deleteGroup}>
            Delete
          </Button>
        </button>
</div>

);
};

export default Group;