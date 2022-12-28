import { Button, Select, TextInput, Checkbox, Label, Dropdown, FileInput } from "flowbite-react";
import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react";



async function handleForm(event) {
  event.preventDefault();

  const date = event.target.date.value;
  const group = event.target.group.value;
  const price = event.target.price.value;
  const location = event.target.location.value;
  const genre = event.target.genre.value;
  const image_url = event.target.image_url.value;
  const concertId = localStorage.getItem("concert_id");
  console.log("date: ", date);
  console.log("group: ", group);
  console.log("price: ", price);
  console.log("location: ", location);
  console.log("genre: ", genre);
  console.log("image_url: ", image_url);
  console.log("concert id: ", concertId);
  await fetch('http://localhost:3000/concerts/' + concertId, {
    method: 'PUT',
    body: JSON.stringify({ date: date, group: group, price: price, location: location, genre: genre, image_url: image_url }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
  alert("Concert successfully modified!");
  localStorage.removeItem('concert_id');
}

const UpdateConcert = () => {
  const params = useParams();
  const id = params.id;
  const [concert, setConcert] = useState(null);
  const [locations, setLocations] = useState("");
  const [groups, setGroups] = useState("");
  const [genres, setGenres] = useState('');
  useEffect(() => {
    async function computeConcert() {
      const response = await fetch('http://localhost:3000/concerts/' + id)
        .then((response) => response.json());
      setConcert(response);
      console.log(response.concert.group);
    }
    async function computeLocations() {
      const response = await fetch('http://localhost:3000/locations')
        .then((response) => response.json());
      console.log(response);
      setLocations(response);

    }
    async function computeGroups() {
      const response = await fetch('http://localhost:3000/groups')
        .then((response) => response.json());
      setGroups(response);
      console.log(response);
    }
    async function computeGenres() {
      const response = await fetch('http://localhost:3000/genres')
        .then((response) => response.json());
      setGenres(response);
    }

    computeConcert();
    computeLocations();
    computeGroups();
    computeGenres();
    localStorage.setItem('concert_id', id)

  }, [])
  return (
    // update concerts: date (month dropdown), group (dropdown), price (comme tu le sens), genre (text), location (text),  image_url (type="url")
    <div>
      {concert ?
        <ul className="currentConcert">
          <li>Performers: {concert.concert.group}</li>
          <li>Price: {concert.concert.price}</li>
          <li>Location: {concert.concert.location}</li>
          <li>scheduled for: {concert.concert.date}</li>
        </ul>
        : ('Loading...')}
      <form className="flex flex-col gap-4 mx-52 mt-6" onSubmit={handleForm}>

        <div>
          <div id="select">
            <div className="mb-2 block">
              <Label htmlFor="Date" value="Select your date" />
            </div>
            <Select id="date" required={true} name="date">
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
          </div>
        </div>

        <div>
          <div id="select">
            <div className="mb-2 block">
              <Label htmlFor="Group" value="Select your group" />
            </div>
            <Select id="group" required={true} name="group">
              <option value="" selected disabled hidden>
                Group
              </option>
              {/* <option>groupe 1</option>
              <option>group 2</option> */}
              {groups ? groups.groups.map((group) => <option>{group.name}</option>) : ('Loading...')}
            </Select>
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Select concert price" />
          </div>
          <TextInput id="price" type="number" required={true} name="price" />
        </div>


        <div>
          <div id="select">
            <div className="mb-2 block">
              <Label htmlFor="genre" value="Select concert genre" />
            </div>
            <Select id="genre" required={true} name="genre">
              <option value="" selected disabled hidden>
                Genre
              </option>
              {genres ? genres.genres.map((genre) => <option>{genre.name}</option>) : ('Loading...')}
            </Select>
          </div>
        </div>


        <div>
          <div id="select">
            <div className="mb-2 block">
              <Label htmlFor="location" value="Select concert location" />
            </div>
            <Select id="location" required={true} name="location">
              <option value="" selected disabled hidden>
                Location
              </option>
              {locations ? locations.locations.map((location) => <option>{location.name}</option>) : ('Loading...')}
            </Select>
          </div>
        </div>


        <div>
          <div className="mb-2 block">
            <Label htmlFor="Url" value="Image URL" />
          </div>
          <TextInput id="image_url" type="url" required={true} name="image_url" />
        </div>
        <Button type="submit">Submit</Button>
      </form>

    </div>
  );
};

export default UpdateConcert;
