export const THEME_COOKIE_NAME = "theme";

export const THEME_VARIANTS = {
  LIGHT: "light",
  DARK: "dark",
} as const;
export const THEME_VARIANT_VALUES = Object.values(THEME_VARIANTS);

export const THEME_COOKIE_PARAMS = {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  path: "/",
};
export const THEME_COOKIE_STRING_PARAMS = `;path=${THEME_COOKIE_PARAMS.path};max-age=${THEME_COOKIE_PARAMS.maxAge}`;

export const THEME_SCRIPT = `
  (function() {
    var theme;
    try {
      var a = document.cookie.match(/${THEME_COOKIE_NAME}=([^;]+)/);
      if (a) {
        theme = a[1];
      }
    } catch (e) {}

    if (!theme) {
      theme = window.matchMedia("(prefers-color-scheme: ${THEME_VARIANTS.DARK})").matches ? "${THEME_VARIANTS.DARK}" : "${THEME_VARIANTS.LIGHT}";
      document.cookie = "${THEME_COOKIE_NAME}=" + theme + "${THEME_COOKIE_STRING_PARAMS}";
    }

    if (theme === "${THEME_VARIANTS.DARK}") {
      document.documentElement.classList.add("${THEME_VARIANTS.DARK}");
    }
  })()
`;
