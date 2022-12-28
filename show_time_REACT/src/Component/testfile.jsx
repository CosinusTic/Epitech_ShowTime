import { Navbar, Avatar, Dropdown } from "flowbite-react";
import "../CSS/AppNavbar.css";

let logo = require("../images/LOGO.png");
let icon_user = require("../images/icon_user.png");

const test = () => {
  return (
    <div>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="https://flowbite.com/">
          <img src={logo} class="h-6 mr-3 sm:h-9" alt="emplacement logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            VibeTicket
          </span>
        </Navbar.Brand>
        
        <div className="flex md:order-2"> 
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
                Insérer variable nom d'utilisateur
                {/* {USERNAME} */}
              </span>
              <span className="block truncate text-sm font-medium">
                Insérer variable email utilisateur
                {/* {EMAIL} */}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/navbars" active={true}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/navbars">page</Navbar.Link>
          <Navbar.Link href="/navbars">page</Navbar.Link>
          <Navbar.Link href="/navbars">page</Navbar.Link>
          <Navbar.Link href="/navbars">page</Navbar.Link>
        </Navbar.Collapse>
        
      </Navbar>
    </div>
  );
};

export default test;
