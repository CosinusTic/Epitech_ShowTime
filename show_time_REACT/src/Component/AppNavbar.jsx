import "../CSS/AppNavbar.css";
import { Navbar, Avatar, Dropdown } from "flowbite-react";
import React, {useState, useEffect} from "react";
import { Button } from "flowbite-react";
let logo = require("../images/LOGO.png");
let icon_user = require("../images/icon_user.png");
let logOut_icon = require("../images/logout_icon.png");


const AppNav = () => {
  const [navBarUser, setUser] = useState(null);

  function logOut()
  {
    localStorage.clear();
    window.location = 'http://localhost:3001';
  }
  function redirectLogin()
  {
    window.location = 'http://localhost:3001/login';
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
    <div>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="/">


          {/* {navBarUser ? <p>Hello {navBarUser.user[0].username}</p> : ('Loading...')} */}


          <img src={logo} class="h-6 mr-3 sm:h-9" alt="emplacement logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            VibeTicket
          </span>
          {/* {navBarUser ? (navBarUser.user[0].admin_status == true ? <p>{navBarUser.user[0].username} is admin</p> : <p>{navBarUser.user[0].username} is not admin</p>) : <p>Not signed in</p>} */}
        </Navbar.Brand>
        {navBarUser ? 
        <div className="flex md:order-2 antiHover"> 
        <Dropdown
          className=""
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              className="p-1 w-12 h-12 ring-1 ring-gray-200 transition duration-300 rounded-full hover:bg-gray-100 mr-3 text-sm md:mr:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600-0 "
              alt="User settings"
              img={icon_user}
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {navBarUser ? navBarUser.user[0].username : ('Loading...')}
            </span>
            <span className="block truncate text-sm font-medium">
              {navBarUser ? navBarUser.user[0].email : ('Loading...')}
            </span>
          </Dropdown.Header>
          {navBarUser ? (navBarUser.user[0].admin_status == true ? <a href="/admin"><Dropdown.Item>Dashboard</Dropdown.Item></a> : ('')) : ('Loading')}
          
          <a href="/ProfilePage"><Dropdown.Item>Profile</Dropdown.Item></a>
          <Dropdown.Divider />
          <a onClick={logOut}><Dropdown.Item>Log out <img src={logOut_icon} className="w-6 h-6 ml-4 mt-1" alt="" /></Dropdown.Item></a>
        </Dropdown>
        <Navbar.Toggle />
      </div> :<a>
          <Button className="" gradientMonochrome="info" pill={true} onClick={redirectLogin}>
            Login
          </Button>
        </a>}
        
        
        <Navbar.Collapse>
          <Navbar.Link href="/">
            Home
          </Navbar.Link>
          {/* <Navbar.Link href="/navbars">page</Navbar.Link>
          <Navbar.Link href="/navbars">page</Navbar.Link>
          <Navbar.Link href="/navbars">page</Navbar.Link>
          <Navbar.Link href="/navbars">page</Navbar.Link> */}
        </Navbar.Collapse>
        
      </Navbar>
    </div>
  );
};

export default AppNav;

