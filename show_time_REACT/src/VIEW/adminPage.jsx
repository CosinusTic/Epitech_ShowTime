import "../CSS/admin.css";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
let groupIcon = require("../images/group_icon.png");
let mapLogo = require("../images/map_icon.png");
ChartJS.register(ArcElement, Tooltip, Legend);





const Admin = () => {
  // const data = {
  //   labels: [],
  //   datasets: [
  //     {
  //       label: 'Concerts per genre',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  const [locations, setLocations] = useState(null);
  const [user, setUser] = useState(null);
  const [totalConcerts, setTotalConcerts] = useState(null);
  const [concertsCount, setConcertsCount] = useState(null);
  const [concertsCountForEachLocation, setConcertsCountForEachLocation] = useState(null)
  const [totalUsers, setTotalUsers] = useState(null);
  const [usersCount, setUsersCount] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState(null);
  
  useEffect(() => {

    async function computeConnectedUser() {
      let token = JSON.parse(localStorage.getItem("access_token"));
      if (!token) {
        window.location = "http://localhost:3001/";
        return;
      }
      else {
        const response = await fetch("http://localhost:3000/users/findWithToken/" + token.access_token)
          .then((response) => response.json());
        setUser(response);
        if (response.user[0].admin_status == true) //user admin
        {
          console.log("user is admin");
        }
        else //user not admin
        {
          console.log("user is not admin");
          window.location = "http://localhost:3001/";
          return;
        }
      }
    }

    async function computeLocations() {
      const response = await fetch('http://localhost:3000/locations')
        .then((response) => response.json());
      for (let i = 0; i < response.locations.length; i++) {
        console.log(response.locations[i].name)
        setLocations(current => [...current, response.locations[i].name]);
      }
  
      for(let i = 0; i < locations.locations.length; i++)
      {
        console.log("location: ", locations[i].name);
        computeConcertsPerLocation(locations[i].name);
      }
    }
    async function computeConcerts() {
      const response = await fetch('http://localhost:3000/concerts')
        .then((response) => response.json());
      setTotalConcerts(response.concerts);
      setConcertsCount(response.concerts.length);

    }

    async function computeUsers() {
      const response = await fetch('http://localhost:3000/users')
        .then((response) => response.json());
      setTotalUsers(response.users);
      setUsersCount(response.users.length);
    }

    async function computeConcertsPerLocation(name) {
      const response = await fetch('http://localhost:3000/concerts/filterByLocation/' + name)
        .then((response) => response.json());
        console.log(response.concert._id);
      setConcertsCountForEachLocation(current => [...current, response.concert._id]);
    }

    async function cookDataForChart() {
      
      for (let i = 0; i < locations.length; i++) {
        setChartData(current => [...current, { location: locations[i].name, count:  concertsCountForEachLocation[i]}]);
      }

      setData({
        labels: chartData.map(row => row.location),
        datasets: [
          {
            label: 'Concerts per genre',
            data: data.map(row => row.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    }


    computeConnectedUser();
    computeConcerts();
    computeUsers();
    // computeLocations();
    // cookDataForChart();

  }, [])
  return (
    <div>
      {locations ? data.labels = locations : ('loading')}
      {/* {concertsCountForEachLocation ? concertsCountForEachLocation : ('Loading...')} */}
      <aside class="w-64 " aria-label="Sidebar">
        <div class="aside overflow-y-auto py-6 px-3 bg-gray-50 rounded dark:bg-gray-800">
          <ul class="space-y-2">
            <li>
              <a
                href="/manageUsers"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="ml-3">Manage users</span>
              </a>
            </li>

            <li>
              <a
                href="/manageConcerts"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <span class="flex-1 ml-3 whitespace-nowrap">
                  Manage concerts
                </span>
              </a>
            </li>

            {/* <li>
            <a href="/statistiques" class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">Statistique</span>
            </a>
         </li> */}

            <li>
              <a
                href="/addLocation"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img src={mapLogo} className="flex-shrink-0 w-6 h-6" alt="" />
                <span class="flex-1 ml-3 whitespace-nowrap">
                  Manage location
                </span>
              </a>
            </li>

            <li>
              <a
                href="/addGroup"
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img src={groupIcon} className="flex-shrink-0 w-6 h-6" alt="" />
                <span class="flex-1 ml-3 whitespace-nowrap">
                  Manage groups
                </span>
              </a>
            </li>

          </ul>
        </div>
      </aside>
      {concertsCount ?
        <div className="concerts count">
          <p>Number of current events scheduled: {concertsCount}</p>
        </div> : ('No concert')}
      {usersCount ?
        <div className="users count">
          <p>Number of signed in users: {usersCount}</p>
        </div> : ('No users')}

      {/* <div className="chart">
        <p>Bookings per genre:</p>
        <Pie data={data} />
      </div>
      <div className="chart">
        <p>Concerts per city:</p>
        <Pie data={data} />
      </div>
      <div className="chart">
        <p>Concerts per group:</p>
        <Pie data={data} />
      </div> */}
    </div>
  );
};

export default Admin;
