import TeleportProject from './project';
export default class Page {
    private project;
    constructor(project: TeleportProject);
    get: (pageName: string) => {
        delete: () => any;
        setName: (newName: string) => any;
        setContent: (content: ContentObject) => any;
    };
}
