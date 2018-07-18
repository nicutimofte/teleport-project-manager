import { ElementsLibrary } from '@teleporthq/teleport-lib-js'
import { LibraryDefinition } from '@teleporthq/teleport-lib-js/dist/types'
import Component from './component'
import Page from './page'


export default class TeleportProject {
  libraries: {
    [key: string]: ElementsLibrary
  } = {}
  data: {
    name: string
    components: {
      [key: string]: ComponentObject
    }
    pages: {
      [key: string]: PageObject
    }
  } = {
    name: '',
    components: {},
    pages: {}
  }

  useLibrary = (library: LibraryDefinition) => {
    this.libraries[library.name] = new ElementsLibrary(library)
    return this
  }

  checkIfComponentExists = (name: string) => {
    if (!this.data.components[name])
      throw new Error(`Component \`${name}\` does not exist.`)
  }

  checkIfPageExists = (name: string) => {
    if (!this.data.pages[name])
      throw new Error(`Page \`${name}\` does not exist.`)
  }

  get = () => Object.assign({}, this.data)
 
  toJSON = () => {
    return JSON.stringify(this.data)
  }

  setName = (name: string) => {
    this.data.name = name
    return this
  }

  defineComponent = (source: string, type: string, name: string, content: string | ContentObject): TeleportProject => {
    new Component(this).define(source, type, name, content)
    return this
  }

  component = (componentName: string) => {
    return new Component(this).get(componentName)
  }

  page = (pageName: string) => {
    return new Page(this).get(pageName)
  }

  definePage = (name: string) => {
    if (!name || !(typeof name === 'string'))
      throw new Error('Argument `name` is required and must be of type `string`.')
    try {
      this.checkIfPageExists(name)
    } catch (error) {
      // add the page if it does not exist
      this.data.pages[name] = {
        name,
        content: {}
      }

      return this
    }
  }
}
