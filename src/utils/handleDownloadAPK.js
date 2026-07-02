import { Settings } from "../api";

export const handleDownloadAPK = () => {
  if (Settings.apk_link) {
    const fileUrl = Settings.apk_link;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "site.apk");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }
};
