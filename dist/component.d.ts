import TeleportProject from './project';
export default class TeleportComponent {
    private project;
    constructor(project: TeleportProject);
    get: (componentName: string) => {
        delete: () => any;
        setStyle: (style: {}) => any;
        setName: (newName: string) => any;
        setContent: (content: ContentObject) => any;
    };
    define: (source: string, type: string, name: string, content: string | ContentObject) => void;
    private newMethod();
}
