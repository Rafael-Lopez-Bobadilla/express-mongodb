import { CookieOptions } from "express";
import config from "../../../config";
const getCookieOptions = ({ logout }: { logout: boolean }) => {
  const expires = logout
    ? new Date(Date.now())
    : new Date(Date.now() + config.jwtExp * 1000 * 60 * 60);
  const options: CookieOptions = {
    expires,
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  };
  return options;
};

export default getCookieOptions;
