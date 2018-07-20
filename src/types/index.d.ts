interface FileSet {
  filesByName: {
    [key: string]: string
  }
}

interface ComponentObject {
  name: string
  content: ContentObject
}

interface PageObject {
  name: string
  content: ContentObject | {}
}

interface ContentObject {
  type: string
  source: string
  name: string
  style: { [key: string]: string | number }
  children: string | ContentObject[]
}
