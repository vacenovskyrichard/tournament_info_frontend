import { selector } from "recoil";
import { tournamentsState } from "../atoms/TournamentsState";

export const sortedTorunamentsState = selector({
  key: "sortedTournaments",
  get: ({ get }) => {
    const tournaments = get(tournamentsState);

    // Function to compare dates in "YYYY-MM-DD" format
    function compareDates(dateA, dateB) {
      return dateA.localeCompare(dateB);
    }

    // Create a copy of the tournaments array and sort the copy
    const sortedTournaments = [...tournaments];
    sortedTournaments.sort((a, b) => compareDates(a.date, b.date));

    return sortedTournaments;
  },
});
