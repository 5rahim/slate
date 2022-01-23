import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'

interface RichTextContentProps {
   truncate?: number | boolean
   content?: string,
   forceFontSize?: string
}

export function RichTextContent({ content, truncate, forceFontSize }: RichTextContentProps) {
   const t = useTypeSafeTranslation()
   let truncatedContent: string | undefined = undefined
   const splitLength: number = typeof truncate !== 'boolean' ? truncate as number : 400
   
   const { isOpen: isExpanded, onOpen: expand, onToggle: toggle } = useDisclosure()
   
   if(truncate && ((content?.length ?? 0) >= splitLength)) {
      truncatedContent = content?.substring(0, splitLength)
   }
   
   return (
      <>
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
                  display: 'flex',
                  placeItems: 'flex-end',
                  my: 2,
               },
               '& > p, & > * > *': {
                  fontSize: forceFontSize ? '18px !important' : undefined,
               },
               '& > ul, & > ol': {
                  pl: 8,
                  my: 3,
               },
               '& > ul > li, & > ol > li': {
                  border: 'none',
                  pb: 0,
               },
            }}
      
            dangerouslySetInnerHTML={{ __html: (!isExpanded && truncatedContent) ? (truncatedContent + '...' ?? '') : (content ?? '') }}
         />
         {truncatedContent &&
         <Button variant="link" colorScheme="messenger.500" onClick={toggle}>{t(truncatedContent && !isExpanded ? 'Show more' : 'Show less')}</Button>}
      </>
   )
   
}
