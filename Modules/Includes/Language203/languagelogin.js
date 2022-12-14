"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18n = void 0;
const yaml_1 = __importDefault(require("./Yaml/yaml"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("../commands/path"));
class I18n {
    constructor(options) {
        this.directory = path_1.default.resolve(options.directory ? options.directory : "./locales");
        this.defaultLocale = options.defaultLocale;
        this.locales = new Map();
        const localeArray = fs_1.default
            .readdirSync(this.directory)
            .filter((file) => fs_1.default.statSync(path_1.default.join(this.directory, file)).isDirectory());
        localeArray.forEach((locale) => {
            const localeMap = new Map();
            const fileArray = fs_1.default
                .readdirSync(path_1.default.join(this.directory, locale))
                .filter((file) => !fs_1.default
                .statSync(path_1.default.join(this.directory, locale, file))
                .isDirectory())
                .filter((file) => file.endsWith(".yaml"));
            fileArray.forEach((section) => {
                const filePath = path_1.default.join(this.directory, locale, section);
                const file = fs_1.default.readFileSync(filePath, "utf8");
                const fileObject = yaml_1.default.parse(file);
                localeMap.set(section.replace(".yaml", ""), fileObject);
            });
            this.locales.set(locale, localeMap);
        });
        if (fs_1.default.existsSync(path_1.default.join(this.directory, "constants.yaml"))) {
            const filePath = path_1.default.join(this.directory, "constants.yaml");
            const file = fs_1.default.readFileSync(filePath, "utf8");
            const fileObject = yaml_1.default.parse(file);
            this.constants = fileObject;
        }
    }
    resolveString(locale, section, key) {
        const localeMap = this.locales.get(locale) || this.locales.get(this.defaultLocale);
        if (!localeMap)
            return `Locale '${locale}' not found.`;
        const sectionMap = localeMap.get(section);
        if (!sectionMap)
            return `Section '${section}' not found in locale '${locale}'`;
        const stringFromKey = sectionMap[key];
        if (!stringFromKey)
            return `Key '${key}' not found in section ${section} in locale '${locale}'`;
        return stringFromKey;
    }
    replace(content, args) {
        if (args) {
            for (const arg in args) {
                const regToken = new RegExp(`%{${arg}}`, "gm");
                if (Array.isArray(content)) {
                    content = content.map((str) => str.replace(regToken, args[arg]));
                }
                else {
                    content = content.replace(regToken, args[arg]);
                }
            }
        }
        const allConstants = this.constants;
        if (allConstants) {
            for (const constant in allConstants) {
                const regToken = new RegExp(`%{${constant}}`, "gm");
                if (Array.isArray(content)) {
                    content = content.map((str) => str.replace(regToken, allConstants[constant]));
                }
                else {
                    content = content.replace(regToken, allConstants[constant]);
                }
            }
        }
        return content;
    }
    getLocales() {
        return Array.from(this.locales.keys());
    }
    getConstant(constant) {
        if (constant)
            return this.constants ? this.constants[constant] : undefined;
        else
            return this.constants;
    }
    toJSON(args) {
        const payload = { constants: this.constants };
        const localeIterator = this.getLocales();
        localeIterator.forEach((locale) => {
            const localeObj = {};
            const file = this.locales.get(locale);
            const sectionIterator = Array.from(file.keys());
            sectionIterator.forEach((section) => {
                const stringObject = file.get(section);
                for (const str in stringObject) {
                    stringObject[str] = this.replace(stringObject[str], args);
                }
                localeObj[section] = stringObject;
            });
            payload[locale] = localeObj;
        });
        return payload;
    }
    get(locale, section, key, args) {
        const resolvedString = this.resolveString(locale, section, key);
        const replacedString = this.replace(resolvedString, args);
        return replacedString;
    }
}
exports.I18n = I18n;