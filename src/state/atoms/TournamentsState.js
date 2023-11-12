import { atom } from "recoil";

export const tournamentsState = atom({
  key: "tournamentsState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
