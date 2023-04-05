/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";

import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

//
import Announcement from "views/components/announcement/Announcement";




let smc_routes = [
  {
    path: "/posts",
    name: "All Posts",
    icon: "ni ni-bullet-list-67 text-red",
    component: Announcement,
    layout: "/admin",
    type: "cms",
    roles: ["ADMIN"],
  },

  {
    path: "/posts",
    name: "Friend List",
    icon: "ni ni-bullet-list-67 text-red",
    component: Announcement,
    layout: "/admin",
    type: "cms",
    roles: ["ADMIN"],
  },

  {
    path: "/posts",
    name: "All Users",
    icon: "ni ni-bullet-list-67 text-red",
    component: Announcement,
    layout: "/admin",
    type: "cms",
    roles: ["ADMIN"],
  },
 
];

let other_routes = [
  {
    path: "/game-edit",
    name: "Edit Game",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    type: "other",
    roles: ["ADMIN"],
  },
  {
    path: "/admin/login",
    name: "Login",
    icon: "ni ni-tv-2 text-primary",
    component: Login,
    layout: "/auth",
    type: "login",
    roles: [null],
  },
];




let routes = [
  ...smc_routes,
  ...other_routes,
];

let user_role = localStorage.getItem("user_role");
console.log("user_role", user_role);

routes = routes.filter((route) => route.roles.includes(user_role));

export default routes;
