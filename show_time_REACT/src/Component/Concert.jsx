import React, { useEffect, useState } from "react";

let user;

// function logConcert( concert) {
// //.preventDefault();
//   console.log(concert.group);
// }

const ConcertCard = ({ concert }) => {
  const [loggedUser, setUser] = useState(null);
  async function addToFavourite() {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    if (!access_token) {
      return
    }
    else {
      const response = await fetch("http://localhost:3000/users/findWithToken/" + access_token.access_token)
        .then((response) => response.json());
      const user = response.user[0];

      if(!(user.favourites.includes(concert.group))) //if 
      {
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        };
        await fetch("http://localhost:3000/users/addFavourite/" + user._id + "/" + concert.group, requestOptions)
          .then((response) => response.json())
      }
      else
      {
        alert("This group is already part of your favourites");
      }
      
    }
  }

  function redirect()
  {
    // window.location = "http://localhost:3001/bookedConcert/" + concert._id;
    window.location = "http://localhost:3001/NathanQRCode/" + concert._id;
  }

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
      }
    }
    computeConnectedUser();
  }, []);


  return (
    <div class="mt-5 max-w-md mx-auto bg-white rounded-xl border shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="md:shrink-0">
          <img
            class="h-48 w-full object-cover md:h-full md:w-48"
            src={concert.image_url}
            alt="concert image"
          />
        </div>
        <div class="p-4 w-3/5 ml-6">
          <div class="flex items-center justify-between">
            <h5 class="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
              {concert.group}
            </h5>
            <h6 className="ml-6">{concert.genre}</h6>
          </div>

          <p
            class="block mt-1  leading-tight font-medium text-black"
          >
            {concert.location}  <strong className="uppercase text-sm  text-gray-400 font-light tracking-tight">‏‏ {concert.date}</strong>
          </p>
          <p class="mt-2 text-slate-500"></p>
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-gray-800 dark:text-white">
              {concert.price}€
            </span>
            {loggedUser ? 
            <a
            href="#"
            class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={redirect}
          >
            Book
          </a>
             : ('')}
            
            {loggedUser ?
            <a
            href="#"
            class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={addToFavourite}
          >
            Add to favourite
          </a> : ('') 
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcertCard;
    

