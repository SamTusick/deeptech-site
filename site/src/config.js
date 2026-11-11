/* Target launch date. The launch card and the status strip count days to it.
   Update this when the date firms up (it is "around Nov 30, 2026 or later"). */
export const LAUNCH_DATE = '2027-1-1 00:00:00-05:00';

/* Predicted apogee: the altitude rail reads 0 ft at the top of the page and this at the bottom. */
export const APOGEE_FT = 5000;

export const LINKS = {
  instagram: 'https://www.instagram.com/deeptechfgcu/',
  groupme: 'https://groupme.com/join_group/113872771/IdaYPGtn',
  eaglelink: 'https://getinvolved.fgcu.edu/organization/deeptechclub',
};

/** Whole days until the target launch (0 or negative once it has passed). */
export function daysToLaunch() {
  return Math.ceil((new Date(LAUNCH_DATE).getTime() - Date.now()) / 86400000);
}
