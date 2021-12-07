export enum ModuleTypes {
   Document = 'document',
   TextHeader = 'header',
   File = 'file',
   Link = 'link',
   Message = 'message',
   QuizLinks = 'quiz_links',
   AssignmentLinks = 'assignment_links'
}


export type ModuleContentTypes = {
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
