import { Project } from './project'
import { Content } from './content'

export class Component {
  private project: Project

  constructor(project: Project) {
    this.project = project
  }

  public get = (componentName: string) => {
    const { components } = this.project.data

    this.project.checkIfComponentExists(componentName)

    const project = this.project
    const component = components[componentName]

    return {
      delete() {
        delete components[componentName]
        return this
      },
      setStyle(style: {}) {
        component.content.style = style
        return this
      },
      setName(newName: string) {
        if (components[newName]) throw new Error(`The name \`${newName}\` is already used for another component.`)

        // move content
        const movedComponent = { ...component, name: newName }
        movedComponent.content.name = newName
        components[newName] = movedComponent

        // delete old component
        delete components[componentName]
        return this
      },
      setContent(content: ContentObject) {
        new Content(project).setContent(content, 'component', componentName)
        return this
      },
    }
  }

  public define = (source: string, type: string, name: string, content: string | ContentObject) => {
    if (!source || !(typeof source === 'string')) throw new Error('First argument `source` is required and must be of type `string`.')

    if (!type || !(typeof type === 'string')) throw new Error('Second argument `type` is required and must be of type `string`.')

    if (!name || !(typeof name === 'string')) throw new Error('Third argument `name` is required and must be of type `string`.')

    if (!this.project.libraries[source])
      throw new Error(`The library \`${source}\` is not loaded. Use \`addLibrary(library)\` before referencing it in a component.`)

    if (!this.project.libraries[source].elements[type]) {
      const elementsList = Object.keys(this.project.libraries[source].elements).toString()
      throw new ReferenceError(`Type \`${type}\`, does not exist in the library \`${source}\`. \n(${elementsList})`)
    }

    if (this.project.data.components[name]) throw new Error(`A component with the name \`${name}\` already exists.`)
    const newContent = {
      children: typeof content === 'string' ? content : '',
      name,
      source,
      type,
    }
    this.project.data.components[name] = {
      content: newContent as ContentObject,
      name,
    }

    if (typeof content !== 'string') {
      this.get(name).setContent(content)
    }
  }
}
