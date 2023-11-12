import { atom } from "recoil";

export const apiUrlState = atom({
  key: "apiUrlState", // unique ID (with respect to other atoms/selectors)
  default: "https://jdem-hrat-58da3e527841.herokuapp.com", // default value (aka initial value)
});
