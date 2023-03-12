export const tailwindConfigFileTemplate = `
module.exports = {
    // see https://daisyui.com/docs/config/ for configuration
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["system", "dark", "cmyk"],
    },
    safelist: [
      "alert",
      "alert-success",
      "alert-error",
      "alert-warning",
      "alert-info",
    ],
  };
`