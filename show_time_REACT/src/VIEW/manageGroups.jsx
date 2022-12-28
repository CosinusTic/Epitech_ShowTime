import { Button, Label, TextInput } from "flowbite-react";
import React, {useState, useEffect} from "react";
import Group from "../Component/group";

async function addGroup(event)
  {
    event.preventDefault();
    const groupToAdd = event.target.group_name.value;
    let duplicateGroup = false;

    let groupsArr = [];
    const groups = await fetch("http://localhost:3000/groups")
      .then((response) => response.json());

    groups.groups.forEach((element) => {
      groupsArr.push(element.name);
    });

    groupsArr.forEach((groupElement) => {
      if (groupElement == groupToAdd) {
        duplicateGroup = true;
      }
    });

    if(duplicateGroup === true)
    {
      alert("This group is already stored");
    }
    else
    {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({name: groupToAdd}), 
        headers: { 'Content-Type': 'application/json' }
      };
      await fetch("http://localhost:3000/groups", requestOptions)
        .then((response) => response.json());
      alert(groupToAdd + " successfully added");
    }

    
  }

const ManageGroups = () => {

  const [groups, setGroups] = useState(null);

  useEffect(() => {
    async function computeGroups()
    {
      const response = await fetch('http://localhost:3000/groups')
        .then((response) => response.json());
      setGroups(response);
    }
    computeGroups();
  }, []);

  return (
    <div className="flex justify-center  flex-col mx-96">
      <form className="flex justify-center  flex-col gap-4 mt-6 " onSubmit={addGroup}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="group name" value="Group name" />
          </div>
          <TextInput id="group_name" name="group_name" type="text" required={true} />
        </div>

        <Button type="submit">Submit</Button>
      </form>

      <div className="mt-16">
        {groups ? groups.groups.map((group) => <Group group={group}/>) : ('Loading')}
      </div>
    </div>
  );
};

export default ManageGroups;
