import { Button } from "flowbite-react";
import React from "react";

const Location = ({location}) => { 
  async function deleteLocation() {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await fetch("http://localhost:3000/locations/" + location._id, requestOptions)
      .then((response) => response.json())
      .then((response) => console.log(response));
    alert(location.name + " successfully deleted.");
  }
return ( 
<div className="flex mt-4 justify-around rounded justify-center items-center border-2 p-1 mx-48">
        <h4>{location.name}</h4>

        <button>
          <Button className=""  gradientMonochrome="failure" pill={true} onClick={deleteLocation}>
            Delete
          </Button>
        </button>
</div>

);
};

export default Location;