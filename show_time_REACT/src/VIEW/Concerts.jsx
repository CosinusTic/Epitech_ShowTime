import React, { useState, useEffect } from "react";
import { Spinner, Select, Label } from "flowbite-react";
import ConcertCard from "../Component/Concert";
import test from "../Component/testfile";

function getLocalStorageToken() {
    const now = new Date().getTime();
    let token = JSON.parse(localStorage.getItem("access_token"));
    if (!token) {
        console.log("User is not logged in");
        return;
    } else {
        if (now > token.expiry) {
            localStorage.removeItem("access_token");
        } else {
            console.log("user is logged in");
        }
    }
}


const Concerts = () => {
    const [user, setUser] = useState(null);
    const [locations, setLocations] = useState(null);
    const [genres, setGenres] = useState(null);
    const [groups, setGroups] = useState(null);
    const [concerts, setConcerts] = useState("");

    async function sortByLocation(event) {
        event.preventDefault();
        const location = event.target.value;
        console.log(location);
        const response = await fetch("http://localhost:3000/concerts/filterByLocation/" + location)
            .then((response) => response.json());
        console.log(response);
        // setConcerts(response);
    }

    async function sortByDate(event) {
        event.preventDefault();
        const date = event.target.value;
        console.log(date);
        const response = await fetch("http://localhost:3000/concerts/filterByDate/" + date)
            .then((response) => response.json());
            console.log(response);
        // setConcerts(response);
    }

    async function sortByGroup(event) {
        event.preventDefault();
        const group = event.target.value;
        console.log(group);
        const response = await fetch('http://localhost/3000/concerts/filterByGroup/' + group)
            .then((response) => response.json());
            console.log(response);
        // setConcerts(response);
        
    }

    useEffect(() => {
        getLocalStorageToken();
        function clearLocalStorageIfExists()
        {
            const concertId = localStorage.getItem('concert_id');
            const userId = localStorage.getItem('user_id');
            if(concertId)
            {
                localStorage.removeItem('concert_id');
            }
            else if(userId)
            {
                localStorage.removeItem('user_id');
            }
        }
        async function computeConcerts() {
            const response = await fetch("http://localhost:3000/concerts").then(
                ((response) => response.json())
            );
            setConcerts(response);
        }
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
        async function computeGroups() {
            const response = await fetch("http://localhost:3000/groups")
                .then((response) => response.json());
            setGroups(response);
        }
        async function computeLocations() {
            const response = await fetch("http://localhost:3000/locations")
                .then((response) => response.json());
            setLocations(response);
        }
        async function computeGenres() {
            const response = await fetch('http://localhost:3000/genres')
                .then((response) => response.json());
            setGenres(response);
        }
        computeConcerts();
        computeConnectedUser();
        computeGroups();
        computeLocations();
        computeGenres();
        clearLocalStorageIfExists();
        
    }, []);

    return (
        <div>
            {/* {user ? <h3>Hello {user.user[0].username}</h3> : <h3>Not signed in</h3>}
      {user ? (user.user[0].admin_status == true ? <p>User is admin</p> : <p>user is not admin</p>) : ('Loading')} */}
            
            <div className="grid grid-cols-2 ">
                <div className="flex border-r-2 flex-col p-10 bg-gray-100 w-2/3 gap-y-6">

                    <div>
                    {user ? 
                        <div id="select">
                        
                            <div className="mb-2 block">
                                <Label htmlFor="Date" value="Select a date" />
                            </div>
                             
                            <Select id="date" required={true} name="date" onChange={sortByDate}>
                            <option value="" selected disabled hidden>
                                Date
                            </option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </Select> 
                            
                        </div>: ("")}
                    </div>

                    {user ? 
                    <div>
                        <div id="select">
                            <div className="mb-2 block">
                                <Label htmlFor="Date" value="Select a group" />
                            </div>
                            <Select id="group" name="group" required={true} onChange={sortByGroup}>
                                <option value="" selected disabled hidden>
                                    Group
                                </option>
                                {groups ? groups.groups.map((group) => <option>{group.name}</option>) : ('Group...')}
                            </Select>
                        </div>
                    </div>: ('')}
                    
                    {user ? 
                    <div>
                        <div id="select">
                            <div className="mb-2 block">
                                <Label htmlFor="Location" value="Select a location" />
                            </div>
                            <Select id="location" required={true} name="location" onChange={sortByLocation}>
                                <option value="" selected disabled hidden>
                                    Location
                                </option>
                                {locations ? locations.locations.map((location) => <option>{location.name}</option>) : ('Loading...')}
                            </Select>
                        </div>
                    </div> : ('')}
                    


                </div>

                <div className="w-full overflow-y: visible;">
                    <ul>
                        {concerts
                            ? concerts.concerts.map((concert) => (
                                <ConcertCard concert={concert} />
                            ))
                            : <Spinner
                                aria-label="Extra large spinner example"
                                size="xl"
                            />}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Concerts;
