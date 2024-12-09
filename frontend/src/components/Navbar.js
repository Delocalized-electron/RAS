import React from "react";
import { NavLink } from "react-router-dom";

const lisItems = ["Home", "Add items", "Invetory", "Low stock"];
const listIcons = [];
const Navbar = () => {
  return (
    <div className="fixed bg-white justify-between gap-1 py-3 px-10 right-1/2 translate-x-[50%] bottom-[20px] rounded-full backdrop-blur-md bg-opacity-30 text-slate shadow-lg z-10 shadow-transparent md:flex hidden">
      <ul className="flex gap-8 text-base">
        {/* {lisItems.map((item) => {
          return (
            <>
              <li
                className="relative text-slate-700 group cursor-pointer   hover:shadow "
                key={item}
              >
                {item}
                <span className="absolute left-0 bottom-[-5px] w-0 h-1 rounded-xl bg-gradient-to-r from-white to-grey transition-all duration-300 group-hover:w-full"></span>
              </li>
            </>
          );
        })} */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-slate-500 text-white px-3 py-2 rounded-full  "
                : "text-gray-300 hover:bg-gray-300 hover:text-white px-3 py-2 rounded-full  "
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/addItems"
            className={({ isActive }) =>
              isActive
                ? "bg-slate-500 text-white px-3 py-2 rounded-full  "
                : "text-gray-300 hover:bg-gray-300 hover:text-white px-3 py-2 rounded-full  "
            }
          >
            Add Items
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stocks"
            className={({ isActive }) =>
              isActive
                ? "bg-slate-500 text-white px-3 py-2 rounded-full  "
                : "text-gray-300 hover:bg-gray-300 hover:text-white px-3 py-2 rounded-full  "
            }
          >
            Inventory
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/lowStock"
            className={({ isActive }) =>
              isActive
                ? "bg-slate-500 text-white px-3 py-2 rounded-full  "
                : "text-gray-300 hover:bg-gray-300 hover:text-white px-3 py-2 rounded-full  "
            }
          >
            Low stock
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
