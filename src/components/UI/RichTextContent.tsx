import { Box } from 'chalkui/dist/cjs/React'

interface RichTextContentProps {
   content?: string
}

export function RichTextContent({ content }: RichTextContentProps) {
   
   return (
      <Box
         
         sx={{
            '& > h1, & > h2, & > h3, & > h4, & > h5, & > h6': {
               my: 2,
            },
            '& > h1': {
               fontSize: '4xl',
            },
            '& > h2': {
               fontSize: '3xl',
            },
            '& > h3': {
               fontSize: '2xl',
            },
            '& > h4': {
               fontSize: 'xl',
            },
            '& > h5': {
               fontSize: 'lg',
            },
            '& > h6': {
               fontSize: 'md',
            },
            '& > p': {
               my: 2
            },
            '& > ul, & > ol': {
               pl: 8,
               my: 3,
            },
            '& > ul > li, & > ol > li': {
               border: 'none',
               pb: 0
            },
         }}
         
         dangerouslySetInnerHTML={{ __html: content ?? '' }}
      />
   )
   
}
