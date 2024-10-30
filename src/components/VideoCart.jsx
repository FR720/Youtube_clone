import { useRef, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { demoVideoTitle, demoChannelTitle } from "../utils/constant";
import { ThemeContext } from "../context/ThemeContext"; 

const VideoCart = ({
  video: {
    id: { videoId },
    snippet,
  },
  setVideosIndex,
}) => {
  const { theme } = useContext(ThemeContext); // Access the current theme
  const navigate = useNavigate();
  const cart = useRef();

  const videoNavigate = () => {
    cart.current.parentElement.parentElement.scrollTop = 0;
    window.scrollTo(0, 0);
    setVideosIndex(10);
    navigate("/video/" + videoId);
  };

  return (
    <Card
      ref={cart}
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        background: theme === "dark" ? "#1e1e1e" : "#fff", // Background based on theme
        color: theme === "dark" ? "#fff" : "#000", // Text color based on theme
        borderRadius: 2,
      }}
      component={motion.div}
      initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <CardActionArea>
        <span onClick={videoNavigate}>
          {snippet?.thumbnails ? (
            <CardMedia
              sx={{
                width: {
                  xs: "100%",
                  sm: "358px",
                  md: "320px",
                },
                height: 180,
              }}
              component="img"
              loading="lazy"
              image={snippet?.thumbnails?.high?.url}
              alt={snippet?.title || "Video thumbnail"}
            />
          ) : (
            <Skeleton
              variant="rounded"
              sx={{
                width: {
                  xs: "100%",
                  sm: "358px",
                  md: "320px",
                },
                height: 180,
              }}
            />
          )}
        </span>
        <CardContent height="106px">
          {snippet?.title ? (
            <>
              <span onClick={videoNavigate}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  color={theme === "dark" ? "white" : "black"} // Text color based on theme
                  fontWeight="bold"
                  noWrap
                >
                  {snippet?.title?.slice(0, 50) || demoVideoTitle}
                </Typography>
              </span>
              <Typography
                variant="body2"
                color="gray"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {snippet?.channelTitle || demoChannelTitle}{" "}
                <CheckCircleIcon sx={{ fontSize: "15px", ml: 1 }} />
              </Typography>
            </>
          ) : (
            <>
              <Skeleton />
              <Skeleton width="60%" />
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VideoCart;
