import TeleportProject from './project';
export default class TeleportContent {
    private project;
    constructor(project: TeleportProject);
    checkSource: (content: ContentObject) => void;
    checkType: (content: ContentObject) => void;
    checkName: (content: ContentObject) => void;
    checkStyle: (content: ContentObject) => void;
    checkIfSourceIsLoaded: (content: ContentObject) => void;
    checkChildren: (content: ContentObject) => void;
    getTarget: (targetType: string, targetName: string) => PageObject;
    checkContent: (content: ContentObject) => void;
    setContent: (content: ContentObject, targetType: "page" | "component", targetName: string) => PageObject;
}
