import { Gradebook_Items } from '@slate/generated/graphql'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import React from 'react'

interface TestQuestionSidebarProps {
   gradebookItem: Gradebook_Items
}

const TestQuestionSidebar: React.FC<TestQuestionSidebarProps> = (props) => {
   
   const { children, gradebookItem, ...rest } = props
   
   return (
      <Box
         position="fixed"
      >
         
         {/*{testQuestion?.id}*/}
         
         <Box>
            {gradebookItem.max_points} maximum points
         </Box>
         
         <Box>
            This test can be graded automatically
         </Box>
      </Box>
   )
   
}

export default TestQuestionSidebar
