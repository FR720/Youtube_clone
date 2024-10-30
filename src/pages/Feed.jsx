import React, { useState, useEffect, useContext } from "react";
import { Stack, Box, Typography, LinearProgress } from "@mui/material";
import { SideBar, Videos } from "../components/index";
import { fetchFromAPI } from "../utils/fetchFromURL.JS"; 
import { ThemeContext } from "../context/ThemeContext"; 

const Feed = () => {
  const { theme } = useContext(ThemeContext); // Use theme from context
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      setVideosData(data.items);
      setLoading(false);
    });
  }, [selectedCategory]);

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
        {/* <Box
          sx={{
            height: { sx: "auto", md: "100vh" },
            borderRight: theme === "dark" ? "1px solid #3d3d3d" : "1px solid #ddd",
            px: { xs: 0, md: 2 },
            backgroundColor: theme === "dark" ? "#202020" : "#ffffff",
          }}
        > */}
        <div className="min-w-56 h-full">

          <SideBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        
        {/* </Box> */}

        <Box
          p={2}
          sx={{
            flex: 2,
          }}
        >
          <Typography
            variant="h4"
            mb={3}
            sx={{ color: theme === "dark" ? "#fff" : "#000" }}
          >
            {selectedCategory}{" "}
            <span style={{ color: "#FC1503", fontWeight: "bold" }}>videos</span>
          </Typography>

          <Videos videosData={videosData} />
        </Box>
      </Stack>
    </>
  );
};

export default Feed;
