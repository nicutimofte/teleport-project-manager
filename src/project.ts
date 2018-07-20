import { ElementsLibrary } from '@teleporthq/teleport-lib-js'
import { LibraryDefinition } from '@teleporthq/teleport-lib-js/dist/types'
import { Component } from './component'
import { Page } from './page'

export class Project {
  public libraries: {
    [key: string]: ElementsLibrary
  } = {}
  public data: {
    name: string
    components: {
      [key: string]: ComponentObject
    }
    pages: {
      [key: string]: PageObject
    }
  } = {
    components: {},
    name: '',
    pages: {},
  }

  public useLibrary = (library: LibraryDefinition) => {
    this.libraries[library.name] = new ElementsLibrary(library)
    return this
  }

  public checkIfComponentExists = (name: string) => {
    if (!this.data.components[name]) throw new Error(`Component \`${name}\` does not exist.`)
  }

  public checkIfPageExists = (name: string) => {
    if (!this.data.pages[name]) throw new Error(`Page \`${name}\` does not exist.`)
  }

  public get = () => ({ ...this.data })

  public toJSON = () => {
    return JSON.stringify(this.data)
  }

  public setName = (name: string) => {
    this.data.name = name
    return this
  }

  public defineComponent = (source: string, type: string, name: string, content: string | ContentObject): Project => {
    new Component(this).define(source, type, name, content)
    return this
  }

  public component = (componentName: string) => {
    return new Component(this).get(componentName)
  }

  public page = (pageName: string) => {
    return new Page(this).get(pageName)
  }

  public definePage = (name: string) => {
    if (!name || !(typeof name === 'string')) throw new Error('Argument `name` is required and must be of type `string`.')
    try {
      this.checkIfPageExists(name)
    } catch (error) {
      // add the page if it does not exist
      this.data.pages[name] = {
        content: {},
        name,
      }

      return this
    }
  }
}
