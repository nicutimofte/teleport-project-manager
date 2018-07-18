import TeleportProject from './project'
import Content from './content'

export default class Page  {
  private project: TeleportProject
  
  constructor(project: TeleportProject) {
    this.project = project
  }

  get = (pageName: string) => {
    const { pages } = this.project.data
    const { project } = this

    if (!pages[pageName])
      throw new Error(`Page \`${pageName}\` does not exist.`)
    
    const page = pages[pageName]

    return {
      delete: function() {
        delete pages[pageName]
        return this
      },
      setName: function (newName: string) {
        if (pages[newName])
          throw new Error(`The name \`${newName}\` is already used for another page.`)
        
        // move content
        const movedPage = Object.assign(page, { name: newName })
        pages[newName] = movedPage

        // delete old page
        delete pages[page.name]
        return this
      },
      setContent: function (content: ContentObject) {
        new Content(project).setContent(content, 'page', pageName)
        return this
      }
    }
  }
}
