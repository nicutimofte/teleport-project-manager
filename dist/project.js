"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const teleport_lib_js_1 = require("@teleporthq/teleport-lib-js");
const component_1 = __importDefault(require("./component"));
const page_1 = __importDefault(require("./page"));
class TeleportProject {
    constructor() {
        this.libraries = {};
        this.data = {
            name: '',
            components: {},
            pages: {}
        };
        this.useLibrary = (library) => {
            this.libraries[library.name] = new teleport_lib_js_1.ElementsLibrary(library);
            return this;
        };
        this.checkIfComponentExists = (name) => {
            if (!this.data.components[name])
                throw new Error(`Component \`${name}\` does not exist.`);
        };
        this.checkIfPageExists = (name) => {
            if (!this.data.pages[name])
                throw new Error(`Page \`${name}\` does not exist.`);
        };
        this.get = () => Object.assign({}, this.data);
        this.toJSON = () => {
            return JSON.stringify(this.data);
        };
        this.setName = (name) => {
            this.data.name = name;
            return this;
        };
        this.defineComponent = (source, type, name, content) => {
            new component_1.default(this).define(source, type, name, content);
            return this;
        };
        this.component = (componentName) => {
            return new component_1.default(this).get(componentName);
        };
        this.page = (pageName) => {
            return new page_1.default(this).get(pageName);
        };
        this.definePage = (name) => {
            if (!name || !(typeof name === 'string'))
                throw new Error('Argument `name` is required and must be of type `string`.');
            try {
                this.checkIfPageExists(name);
            }
            catch (error) {
                // add the page if it does not exist
                this.data.pages[name] = {
                    name,
                    content: {}
                };
                return this;
            }
        };
    }
}
exports.default = TeleportProject;
