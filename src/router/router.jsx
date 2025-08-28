import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Sports from "../pages/Sports/Sports";
import EventDetails from "../pages/EventDetails/EventDetails";
import Overview from "../pages/Profile/Overview";
import StakeSetting from "../pages/Profile/StakeSetting";
import ChangePassword from "../pages/Profile/ChangePassword";
import Casino from "../pages/Casino/Casino";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/sports/:name/:id",
          element: <Sports />,
        },
        {
          path: "/event-details/:eventTypeId/:eventId",
          element: <EventDetails />,
        },
        {
          path: "/profile/overview",
          element: <Overview />,
        },
        {
          path: "/profile/stake-setting",
          element: <StakeSetting />,
        },
        {
          path: "/profile/change-password",
          element: <ChangePassword />,
        },
        {
          path: "/casino",
          element: <Casino />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL ?? "/",
  }
);
