import cookie from "js-cookie";

export const setCookie = (key, value) => {
  cookie.set(key, value, {
    expires: 1,
    path: "/",
    secure: true,
    sameSite: "Lax",
    httpOnly: "true",
  });
};

export const removeCookie = (key) => {
  cookie.remove(key, {
    expires: 1,
  });
};

export const getCookie = (key) => {
  return getCookieFromBrowser(key);
};

const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};
