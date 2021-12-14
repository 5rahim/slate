export enum UnitModuleTypes {
   Folder = 'folder',
   Document = 'document',
   TextHeader = 'header',
   File = 'file',
   Link = 'link',
   Message = 'message',
   Text = 'text',
   Shortcut = 'shortcut',
   QuizLinks = 'quiz_links',
   AssignmentLinks = 'assignment_links'
}


export type UnitModuleContentTypes = {
   document: {
      type: 'text' | 'file' | 'link' | 'header',
      content: string
   }[],
   header: string,
   message: string,
   file: string[], // url
   link: string, // url
   quiz_links: string[], // uuid
   assignment_links: string[] // uuid
}
