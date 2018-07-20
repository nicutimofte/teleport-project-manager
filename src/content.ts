import { Project } from './project'

export class Content {
  private project: Project

  constructor(project: Project) {
    this.project = project
  }

  public checkSource = (content: ContentObject) => {
    if (!content.source) throw new Error(`The content object must have a \`source\` attribute of type string.`)
  }

  public checkType = (content: ContentObject) => {
    if (!content.type)
      throw new Error(`The content object must have a \`type\` attribute of type string.
      Yours: ${content.type} (${typeof content.type})`)
  }

  public checkName = (content: ContentObject) => {
    if (!content.name) throw new Error('The content object must have a `name` attribute of type string.')
  }

  public checkStyle = (content: ContentObject) => {
    if (typeof content.style !== 'undefined') {
      if (typeof content.style !== 'object' || Array.isArray(content.style)) throw new Error('The content object must have a `style` attribute of type object.')
    }
  }

  public checkIfSourceIsLoaded = (content: ContentObject) => {
    if (content.source !== 'components') {
      if (!this.project.libraries[content.source]) throw new Error(`The source \`${content.source}\` is not loaded for this project.`)
    }
  }

  public checkChildren = (content: ContentObject) => {
    if (typeof content.children !== 'string' && !Array.isArray(content.children))
      throw new Error('The content object must have a `children` attribute of type string or components[].')
  }

  public getTarget = (targetType: string, targetName: string) => {
    switch (targetType) {
      case 'page':
        this.project.checkIfPageExists(targetName)
        return this.project.data.pages[targetName]

      case 'component':
        this.project.checkIfComponentExists(targetName)
        return this.project.data.components[targetName]

      default:
        throw new Error(`The target type must be \`components\` or \`pages\``)
    }
  }

  public checkContent = (content: ContentObject) => {
    this.checkSource(content)
    this.checkType(content)

    if (content.source !== 'components') {
      this.checkIfSourceIsLoaded(content)
      this.checkName(content)
      this.checkChildren(content)
    } else {
      this.project.checkIfComponentExists(content.type)
    }

    if (Array.isArray(content.children)) {
      content.children.forEach((child) => {
        if (typeof child === 'string' || typeof child !== 'object')
          throw new Error(`A child element must be of type object. Your value: \`${child}\` (${typeof child})`)

        this.checkContent(child)
      })
    }
  }

  public setContent = (content: ContentObject, targetType: 'page' | 'component', targetName: string) => {
    const target = this.getTarget(targetType, targetName)

    if (typeof content === 'string') {
      ;(target.content as ContentObject).children = content
    } else {
      this.checkContent(content)
      target.content = content
    }

    return target
  }
}
