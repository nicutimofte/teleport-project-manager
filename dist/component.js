"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const content_1 = __importDefault(require("./content"));
class TeleportComponent {
    constructor(project) {
        this.get = (componentName) => {
            const { components } = this.project.data;
            this.project.checkIfComponentExists(componentName);
            const { project } = this;
            const component = components[componentName];
            return {
                delete: function () {
                    delete components[componentName];
                    return this;
                },
                setStyle: function (style) {
                    component.content.style = style;
                    return this;
                },
                setName: function (newName) {
                    if (components[newName])
                        throw new Error(`The name \`${newName}\` is already used for another component.`);
                    // move content
                    const movedComponent = Object.assign(component, { name: newName });
                    movedComponent.content.name = newName;
                    components[newName] = movedComponent;
                    // delete old component
                    delete components[componentName];
                    return this;
                },
                setContent: function (content) {
                    new content_1.default(project).setContent(content, 'component', componentName);
                    return this;
                }
            };
        };
        this.define = (source, type, name, content) => {
            if (!source || !(typeof source === 'string'))
                throw new Error('First argument `source` is required and must be of type `string`.');
            if (!type || !(typeof type === 'string'))
                throw new Error('Second argument `type` is required and must be of type `string`.');
            if (!name || !(typeof name === 'string'))
                throw new Error('Third argument `name` is required and must be of type `string`.');
            if (!this.project.libraries[source])
                throw new Error(`The library \`${source}\` is not loaded. Use \`addLibrary(library)\` before referencing it in a component.`);
            if (!this.project.libraries[source].elements[type]) {
                const elementsList = Object.keys(this.project.libraries[source].elements).toString();
                throw new ReferenceError(`Type \`${type}\`, does not exist in the library \`${source}\`. \n(${elementsList})`);
            }
            if (this.project.data.components[name])
                throw new Error(`A component with the name \`${name}\` already exists.`);
            this.project.data.components[name] = {
                name,
                content: {
                    type,
                    name,
                    source,
                    children: typeof content === 'string' ? content : ''
                }
            };
            if (typeof content !== 'string') {
                this.get(name).setContent(content);
            }
        };
        this.project = project;
    }
    newMethod() {
        return this;
    }
}
exports.default = TeleportComponent;
