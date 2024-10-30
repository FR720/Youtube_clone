import React, { useState, useEffect, useContext } from "react";
import { Stack, Box, Typography, LinearProgress } from "@mui/material";
import { SideBar, Videos } from "../components/index";
import { fetchFromAPI } from "../utils/fetchFromURL.JS"; 
import { useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext"; 

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const { theme } = useContext(ThemeContext); // Get the theme value from context
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setVideosData(data.items);
      setLoading(false);
    });
  }, [searchTerm]);

  return (
    <>
      {loading && <LinearProgress color="error" />}

      <Stack
        sx={{
          flexDirection: { sx: "column", md: "row" },
          backgroundColor: theme === "dark" ? "#181818" : "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <Box
          p={2}
          sx={{
            overflowY: "auto",
            height: "90vh",
            flex: 2,
            backgroundColor: theme === "dark" ? "#202020" : "#ffffff",
          }}
        >
          <Typography
            variant="h4"
            mb={3}
            sx={{
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            {searchTerm}{" "}
            <span style={{ color: "#FC1503", fontWeight: "bold" }}>videos</span>
          </Typography>

          <Videos videosData={videosData} />
        </Box>
      </Stack>
    </>
  );
};

export default SearchFeed;
