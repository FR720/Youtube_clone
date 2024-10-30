import { useState, useEffect, useContext } from "react";
import { Stack, Box } from "@mui/material";
import VideoCart from "./VideoCart";
import ChannelCart from "./ChannelCart";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThemeContext } from "../context/ThemeContext"; 

const Videos = ({ videosData, direction }) => {
  const { theme } = useContext(ThemeContext); // Access the current theme
  const [visibleVideos, setVisibleVideos] = useState([]);
  const [videosIndex, setVideosIndex] = useState(10);
  const [more, setMore] = useState(true);

  useEffect(() => {
    setVisibleVideos(videosData.slice(0, videosIndex));
  }, [videosData]);

  const fetchMoreData = () => {
    if (visibleVideos.length < videosData.length) {
      setTimeout(() => {
        setVisibleVideos([
          ...visibleVideos,
          ...videosData.slice(videosIndex, 10 + videosIndex),
        ]);
        setVideosIndex(videosIndex + 10);
      }, 1100);
    } else {
      setMore(false);
    }
  };

  return (
    <InfiniteScroll
      dataLength={visibleVideos.length}
      next={fetchMoreData}
      hasMore={more}
      height={"100vh"}
      loader={
        <h4 style={{ textAlign: "center", color: theme === "dark" ? "white" : "black" }}>
          Loading...
        </h4>
      }
      endMessage={
        <p style={{ textAlign: "center", color: theme === "dark" ? "white" : "black" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Stack
        direction={direction || "row"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme === "dark" ? "#181818" : "#f9f9f9", // Background based on theme
          padding: 2,
        }}
      >
        {visibleVideos?.map((item) =>
          item.id.channelId ? (
            <ChannelCart channelDetails={item} key={item.id.channelId} />
          ) : (
            <VideoCart
              video={item}
              key={item.id.videoId}
              setVideosIndex={setVideosIndex}
            />
          )
        )}
      </Stack>
    </InfiniteScroll>
  );
};

export default Videos;
