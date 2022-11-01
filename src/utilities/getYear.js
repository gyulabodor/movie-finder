export const getYear = (releaseDate) => {
  let splittedDate = releaseDate.split("-");
  let year = splittedDate[0];
  return parseInt(year);
};
