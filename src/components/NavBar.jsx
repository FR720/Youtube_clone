import React, { useContext } from "react";
import { Stack } from "@mui/material";
import { logo } from "../utils/constant";
import { Link } from "react-router-dom";
import { SearchBar } from "./index";
import { MdOutlineDarkMode } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); 

  return (
    <Stack
      direction="row"
      alignItems="center"
      px={{ xs: 2, sm: 3, md: 4 }}
      py={3}
      className={` ${theme === "dark" ? "bg-black" : "bg-white"}`}
      sx={{
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
        zIndex: 100,
      }}
    >
      <Link to="/">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" width={50} />
          <span
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } font-medium text-2xl`}
          >
            YouTube Clone
          </span>
        </div>
      </Link>
      <div className="flex items-center ">
        <SearchBar />
        <MdOutlineDarkMode
          onClick={toggleTheme}
          className={`${
            theme === "dark" ? "text-white" : "text-black"
          } text-2xl cursor-pointer`}
        />
      </div>
    </Stack>
  );
};

export default NavBar;
