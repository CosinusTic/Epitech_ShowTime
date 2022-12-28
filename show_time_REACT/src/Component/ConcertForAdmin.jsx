import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";



const ConcertForAdmin = ({concert}) => {
  function redirect()
  {
    window.location = "http://localhost:3001/UpdateConcert/" + concert._id;
  }

  return (

    <div className="flex mt-4 justify-around rounded justify-center items-center border-2 p-1 mx-48">
      <h4>Group : {concert.group}</h4>
      <h4>Location : {concert.location}</h4>
      <h4>Price : {concert.price}</h4>
      <h4>Genre : {concert.genre}</h4>
      <h4>Date : {concert.date}</h4>
      <div>
        <a onClick={redirect}>
          <button className="ml-8" onClick={redirect}>
            {" "}
            <Button className="w-32" gradientMonochrome="info" pill={true} onClick={redirect}>
              Update
            </Button>
          </button>
        </a>
        <button>
          {" "}
          <Button className="w-32" gradientMonochrome="failure" pill={true}>
            Delete
          </Button>
        </button>

      </div>
    </div>
  );
};

export default ConcertForAdmin;