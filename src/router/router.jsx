import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Sports from "../pages/Sports/Sports";
import EventDetails from "../pages/EventDetails/EventDetails";
import Overview from "../pages/Profile/Overview";
import StakeSetting from "../pages/Profile/StakeSetting";
import ChangePassword from "../pages/Profile/ChangePassword";
import Casino from "../pages/Casino/Casino";
import Deposit from "../pages/Deposit/Deposit";
import Withdraw from "../pages/Withdraw/Withdraw";
import DepositReport from "../pages/DepositReport/DepositReport";
import WithdrawReport from "../pages/WithdrawReport/WithdrawReport";
import OpenBets from "../pages/OpenBets/OpenBets";
import BettingProfitLoss from "../pages/BettingProfitLoss/BettingProfitLoss";
import MyBankDetails from "../pages/MyBankDetails/MyBankDetails";
import Promotions from "../pages/Promotions/Promotions";
import BonusStatement from "../pages/BonusStatement/BonusStatement";
import LossbackBonus from "../pages/LossbackBonus/LossbackBonus";
import AppOnlyBonus from "../pages/AppOnlyBonus/AppOnlyBonus";
import IFrame from "../pages/IFrame/IFrame";

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
        {
          path: "/deposit",
          element: <Deposit />,
        },
        {
          path: "/withdraw",
          element: <Withdraw />,
        },
        {
          path: "/deposit-report",
          element: <DepositReport />,
        },
        {
          path: "/withdraw-report",
          element: <WithdrawReport />,
        },
        {
          path: "/open-bets",
          element: <OpenBets />,
        },
        {
          path: "/betting-profit-loss",
          element: <BettingProfitLoss />,
        },
        {
          path: "/my-bank-details",
          element: <MyBankDetails />,
        },
        {
          path: "/promotions",
          element: <Promotions />,
        },
        {
          path: "/bonus-statement",
          element: <BonusStatement />,
        },
        {
          path: "/lossback-bonus",
          element: <LossbackBonus />,
        },
        {
          path: "/app-only-bonus",
          element: <AppOnlyBonus />,
        },
        {
          path: "/:route/:name/:gameId",
          element: <IFrame />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL ?? "/",
  },
);
