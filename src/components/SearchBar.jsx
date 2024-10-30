import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContext } from "../context/ThemeContext";

const SearchBar = () => {
  const { theme } = useContext(ThemeContext); 
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const wrapper = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm) navigate("/search/" + searchTerm);
  };

  const focusHandler = () => {
    wrapper.current.style.border = `1px solid ${
      theme === "dark" ? "#065fd4" : "#0000FF"
    }`;
  };

  const blurHandler = () => {
    wrapper.current.style.border = `1px solid ${
      theme === "dark" ? "#303030" : "#cccccc"
    }`;
  };

  return (
    <Paper
      component="form"
      onSubmit={submitHandler}
      ref={wrapper}
      className={`!border !flex !items-center !cursor-pointer !rounded-[20px] ${
        theme === "dark" ? "!bg-[#121212] !border-[#303030]" : "!bg-white !border-[#cccccc]"
      }`}
      sx={{
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5 },
      }}
    >
      <input
        type="text"
        value={searchTerm}
        placeholder="Search..."
        className={`search-bar ${
          theme === "dark" ? "text-white" : "!text-black"
        }`}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
      <IconButton type="submit" sx={{ p: "10px", color: theme === "dark" ? "#fff" : "#000" }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
