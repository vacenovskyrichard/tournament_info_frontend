import { atom } from "recoil";

export const apiUrlState = atom({
  key: "apiUrlState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
