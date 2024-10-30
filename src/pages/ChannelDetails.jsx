import { useEffect, useState, useContext } from "react";
import { fetchFromAPI } from "../utils/fetchFromURL.JS"; 
import { useParams } from "react-router-dom";
import { Videos } from "../components/index";
import { Box, LinearProgress } from "@mui/material";
import ChannelCart from "../components/ChannelCart";
import { ThemeContext } from "../context/ThemeContext"; 

const ChannelDetails = () => {
  const { theme } = useContext(ThemeContext); // Get theme value from context
  const [channel, setChannel] = useState({});
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchFromAPI(`channels?part=snippet%2Cstatistics&id=${id}`).then((res) => {
      setChannel(res.items[0]);
      setLoading(false);
    });

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((res) => {
      setVideosData(res.items);
    });
  }, [id]);

  return (
    <>
      {loading && <LinearProgress color="error" />}

      <Box
        sx={{
          backgroundColor: theme === "dark" ? "#181818" : "#f4f4f4",
          minHeight: "100vh",
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        <div
          style={{
            background:
              " #474bff linear-gradient(0deg, #474bff 0%, #bc48ff 100%)",
            height: "300px",
          }}
        />
        <Box sx={{ mx: "auto", marginTop: "-140px", width: "fit-content" }}>
          <ChannelCart channelDetails={channel} />
        </Box>
        <Videos videosData={videosData} />
      </Box>
    </>
  );
};

export default ChannelDetails;
