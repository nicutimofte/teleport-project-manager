"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TeleportContent {
    constructor(project) {
        this.checkSource = (content) => {
            if (!content.source)
                throw new Error(`The content object must have a \`source\` attribute of type string.`);
        };
        this.checkType = (content) => {
            if (!content.type)
                throw new Error(`The content object must have a \`type\` attribute of type string.
      Yours: ${content.type} (${typeof content.type})`);
        };
        this.checkName = (content) => {
            if (!content.name)
                throw new Error('The content object must have a `name` attribute of type string.');
        };
        this.checkStyle = (content) => {
            if (typeof content.style !== 'undefined') {
                if (typeof content.style !== 'object' || Array.isArray(content.style))
                    throw new Error('The content object must have a `style` attribute of type object.');
            }
        };
        this.checkIfSourceIsLoaded = (content) => {
            if (content.source !== 'components') {
                if (!this.project.libraries[content.source])
                    throw new Error(`The source \`${content.source}\` is not loaded for this project.`);
            }
        };
        this.checkChildren = (content) => {
            if (typeof content.children !== 'string' && !Array.isArray(content.children))
                throw new Error('The content object must have a `children` attribute of type string or components[].');
        };
        this.getTarget = (targetType, targetName) => {
            switch (targetType) {
                case 'page':
                    this.project.checkIfPageExists(targetName);
                    return this.project.data.pages[targetName];
                case 'component':
                    this.project.checkIfComponentExists(targetName);
                    return this.project.data.components[targetName];
                default:
                    throw new Error(`The target type must be \`components\` or \`pages\``);
            }
        };
        this.checkContent = (content) => {
            this.checkSource(content);
            this.checkType(content);
            if (content.source !== 'components') {
                this.checkIfSourceIsLoaded(content);
                this.checkName(content);
                this.checkChildren(content);
            }
            else {
                this.project.checkIfComponentExists(content.type);
            }
            if (Array.isArray(content.children)) {
                content.children.forEach(child => {
                    if (typeof child === 'string' || typeof child !== 'object')
                        throw new Error(`A child element must be of type object. Your value: \`${child}\` (${typeof child})`);
                    this.checkContent(child);
                });
            }
        };
        this.setContent = (content, targetType, targetName) => {
            const target = this.getTarget(targetType, targetName);
            if (typeof content === 'string') {
                target.content.children = content;
            }
            else {
                this.checkContent(content);
                target.content = content;
            }
            return target;
        };
        this.project = project;
    }
}
exports.default = TeleportContent;
