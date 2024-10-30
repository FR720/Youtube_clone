import {  lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBar } from "./components/index.jsx";
const LazyFeed = lazy(() => import("./pages/Feed"));
const LazyVideoDetails = lazy(() => import("./pages/VideoDetails"));
const LazyChannelDetails = lazy(() => import("./pages/ChannelDetails"));
const LazySearchFeed = lazy(() => import("./pages/SearchFeed"));
function App() {
  return (
    <BrowserRouter>
   
        <NavBar />
        <Suspense fallback="loading">
          <Routes>
            <Route path="/" element={<LazyFeed />} />
            <Route path="/video/:id" element={<LazyVideoDetails />} />
            <Route path="/channel/:id" element={<LazyChannelDetails />} />
            <Route path="/search/:searchTerm" element={<LazySearchFeed />} />
          </Routes>
        </Suspense>
   
    </BrowserRouter>
  );
}

export default App;
