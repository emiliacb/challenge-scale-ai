const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

const MEDIA = {
  upSm: `(min-width: ${BREAKPOINTS.sm})`,
  upMd: `(min-width: ${BREAKPOINTS.md})`,
  upLg: `(min-width: ${BREAKPOINTS.lg})`,
  upXl: `(min-width: ${BREAKPOINTS.xl})`,
};

export { BREAKPOINTS, MEDIA };
