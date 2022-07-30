module.exports = ( client ) => {
  const { I18n } = require("./Includes/Language203/languagelogin");
  const { resolve, parse } = require("./Includes/commands/path");
  LANGUAGE = {
   defaultLocale: "vi", 
   directory: resolve("Modules/Languages"),
  };
  client.i18n = new I18n(LANGUAGE);
};