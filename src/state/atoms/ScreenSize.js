import { atom } from "recoil";

export const screenSize = atom({
  key: "screenSize", // unique ID (with respect to other atoms/selectors)
  default: "desktop", // default value (aka initial value)
});
