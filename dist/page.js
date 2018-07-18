"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const content_1 = __importDefault(require("./content"));
class Page {
    constructor(project) {
        this.get = (pageName) => {
            const { pages } = this.project.data;
            const { project } = this;
            if (!pages[pageName])
                throw new Error(`Page \`${pageName}\` does not exist.`);
            const page = pages[pageName];
            return {
                delete: function () {
                    delete pages[pageName];
                    return this;
                },
                setName: function (newName) {
                    if (pages[newName])
                        throw new Error(`The name \`${newName}\` is already used for another page.`);
                    // move content
                    const movedPage = Object.assign(page, { name: newName });
                    pages[newName] = movedPage;
                    // delete old page
                    delete pages[page.name];
                    return this;
                },
                setContent: function (content) {
                    new content_1.default(project).setContent(content, 'page', pageName);
                    return this;
                }
            };
        };
        this.project = project;
    }
}
exports.default = Page;
