import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlinePlusSquare,
  AiOutlineStock,
} from "react-icons/ai";
import { MdOutlineInventory2 } from "react-icons/md";

const isActiveNavLinkTWClasses =
  "bg-slate-500 text-white px-2 py-1 md:px-3 md:py-2 rounded-full flex items-center flex-col md:flex-row md:gap-2";
const nonActiveNavLinkTWClasses =
  "text-gray-300 hover:bg-gray-300 hover:text-white px-2 py-1 md:px-3 md:py-2 rounded-full transition-all duration-400 flex flex-col items-center md:flex-row md:gap-2";

const Navbar = () => {
  return (
    <div className="fixed bg-white justify-between gap-2 md:gap-3 py-2 px-4 md:px-10 right-1/2 translate-x-[50%] bottom-[10px] rounded-full backdrop-blur-md bg-opacity-30 text-slate shadow-lg z-10 shadow-transparent flex flex-wrap">
      <ul className="flex justify-between items-center gap-4 md:gap-8 text-sm md:text-base">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveNavLinkTWClasses : nonActiveNavLinkTWClasses
            }
          >
            {/* Icon displayed only below md size */}
            <AiOutlineHome className="text-2xl md:hidden" />
            {/* Text displayed only on md and larger screens */}
            <span className="text-[0.7rem] md:text-lg hidden md:block">
              Home
            </span>
            {/* Small text displayed below the icon */}
            <span className="text-[0.6rem] md:hidden">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/addItems"
            className={({ isActive }) =>
              isActive ? isActiveNavLinkTWClasses : nonActiveNavLinkTWClasses
            }
          >
            <AiOutlinePlusSquare className="text-2xl md:hidden" />
            <span className="text-[0.7rem] whitespace-nowrap md:text-lg hidden md:block">
              Add Items
            </span>
            <span className="text-[0.6rem] whitespace-nowrap md:hidden">
              Add Items
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stocks"
            className={({ isActive }) =>
              isActive ? isActiveNavLinkTWClasses : nonActiveNavLinkTWClasses
            }
          >
            <MdOutlineInventory2 className="text-2xl md:hidden" />
            <span className="text-[0.7rem] md:text-lg hidden md:block">
              Inventory
            </span>
            <span className="text-[0.6rem] md:hidden">Inventory</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/lowStock"
            className={({ isActive }) =>
              isActive ? isActiveNavLinkTWClasses : nonActiveNavLinkTWClasses
            }
          >
            <AiOutlineStock className="text-2xl md:hidden" />
            <span className="text-[0.7rem] whitespace-nowrap md:text-lg hidden md:block">
              Low Stocks
            </span>
            <span className="text-[0.6rem] whitespace-nowrap md:hidden">
              Low Stocks
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
