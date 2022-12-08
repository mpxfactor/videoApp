import React from "react";
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category="video-app-mpxtube") => {
  const eventTracker = (action = "test action", label = "videos") => {
    ReactGA.event({category, action, label});
  }
  return eventTracker;
}
export default useAnalyticsEventTracker;