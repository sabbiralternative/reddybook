import { Settings } from "../api";

export const getSiteURL = () => {
  let siteURL;
  if (window.location.hostname === "localhost") {
    if (Settings.siteUrl) {
      siteURL = Settings.siteUrl;
    }
  }
  if (window.location.hostname !== "localhost") {
    siteURL = window.location.hostname;
  }

  return { siteURL };
};
