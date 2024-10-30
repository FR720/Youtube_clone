import React, { useContext } from "react";
import { Stack } from "@mui/material";
import { categories } from "../utils/constant";
import { ThemeContext } from "../context/ThemeContext";

const SideBar = ({ selectedCategory, setSelectedCategory }) => {
  const { theme } = useContext(ThemeContext); // Access the current theme

  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { xs: "auto", md: "95%" },
        flexDirection: { md: "column" },
        backgroundColor: theme === "dark" ? "#181818" : "#fff", // Background based on theme
      }}
    >
      {categories.map((category) => (
        <button
          key={category.name}
          className={`flex items-center  !gap-4 rounded-sm p-4 `}
          style={{
    
            color: category.name === selectedCategory ? "#fff" : theme === "dark" ? "#FC1503" : "#000", 
            backgroundColor: category.name === selectedCategory ? "#FC1503" : theme === "dark" ? "#303030" : "#f0f0f0", 
          }}
          onClick={() => {
            setSelectedCategory(category.name);
          }}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "white" : theme === "dark" ? "#FC1503" : "#FC1503",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default SideBar;
