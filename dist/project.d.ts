import { ElementsLibrary } from '@teleporthq/teleport-lib-js';
import { LibraryDefinition } from '@teleporthq/teleport-lib-js/dist/types';
export default class TeleportProject {
    libraries: {
        [key: string]: ElementsLibrary;
    };
    data: {
        name: string;
        components: {
            [key: string]: ComponentObject;
        };
        pages: {
            [key: string]: PageObject;
        };
    };
    useLibrary: (library: LibraryDefinition) => this;
    checkIfComponentExists: (name: string) => void;
    checkIfPageExists: (name: string) => void;
    get: () => {
        name: string;
        components: {
            [key: string]: ComponentObject;
        };
        pages: {
            [key: string]: PageObject;
        };
    };
    toJSON: () => string;
    setName: (name: string) => this;
    defineComponent: (source: string, type: string, name: string, content: string | ContentObject) => TeleportProject;
    component: (componentName: string) => {
        delete: () => any;
        setStyle: (style: {}) => any;
        setName: (newName: string) => any;
        setContent: (content: ContentObject) => any;
    };
    page: (pageName: string) => {
        delete: () => any;
        setName: (newName: string) => any;
        setContent: (content: ContentObject) => any;
    };
    definePage: (name: string) => this | undefined;
}
