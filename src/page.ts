import { Project } from './project'
import { Content } from './content'

export class Page {
  private project: Project

  constructor(project: Project) {
    this.project = project
  }

  public get = (pageName: string) => {
    const { pages } = this.project.data
    const project = this.project

    if (!pages[pageName]) throw new Error(`Page \`${pageName}\` does not exist.`)

    const page = pages[pageName]

    return {
      delete() {
        delete pages[pageName]
        return this
      },
      setName(newName: string) {
        if (pages[newName]) throw new Error(`The name \`${newName}\` is already used for another page.`)

        // move content
        const movedPage = { ...page, name: newName }
        pages[newName] = movedPage

        // delete old page
        delete pages[page.name]
        return this
      },
      setContent(content: ContentObject) {
        new Content(project).setContent(content, 'page', pageName)
        return this
      },
    }
  }
}
