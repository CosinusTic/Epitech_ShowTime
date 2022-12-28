import React, {useState, useEffect} from "react";
import { Button, Label, TextInput } from "flowbite-react";
import Location from "../Component/location";

async function addLocation(event)
{
  event.preventDefault();
  const locationToAdd = event.target.concert.value;
  let duplicateLocation = false;
  console.log(locationToAdd);

  let locationsArr = [];
  const locations = await fetch("http://localhost:3000/locations")
    .then((response) => response.json());

  locations.locations.forEach((element) => {
    locationsArr.push(element.name);
  });

  locationsArr.forEach((locationElement) => {
    if (locationElement == locationToAdd) {
      duplicateLocation = true;
    }
  });

  if(duplicateLocation === true)
  {
    alert("This location is already stored");
  }
  else
  {
    const requestOptions = {
      method: "POST", 
      body: JSON.stringify({name: locationToAdd}), 
      headers: { 'Content-Type': 'application/json' }
    };
    await fetch("http://localhost:3000/locations", requestOptions);
    alert(locationToAdd + " successfully added!");
  }
}

const ManageLocations = () => {

  const [locations, setLocations] = useState(null);

  useEffect(() => {
    async function computeLocations()
    {
      const response = await fetch('http://localhost:3000/locations')
        .then((response) => response.json());
      setLocations(response);
    }
    computeLocations();
  }, []);
  
  return (
    <div className="flex justify-center  flex-col mx-96">
      <form className="flex justify-center  flex-col gap-4 mt-6 " onSubmit={addLocation}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Add a concert location" value="Add a concert location" />
          </div>
          <TextInput id="concert" type="text" required={true} />
        </div>

        <Button type="submit">Add location</Button>
      </form>

      <div className="mt-16">
        {locations ? locations.locations.map((location) => <Location location={location}/>) : ('Loading...')}
      </div>
    </div>
  );
};

export default ManageLocations;
