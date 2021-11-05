import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { Box, BoxProps, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Button, Heading, SimpleGrid } from 'chalkui/dist/cjs/React'
import { motion } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface LayoutOptions {
   children?: React.ReactNode
}

type LayoutProps = LayoutOptions & BoxProps


const Layout: React.FC<LayoutProps> = ({ children, ...rest }: LayoutProps) => {
   const { colorMode } = useColorMode()
   
   const { t } = useTranslation(['common', 'contact'], { useSuspense: false })
   
   return (
      <>
         
         <div style={{ height: 0, visibility: 'hidden' }}>&nbsp;</div>
         
         <Box>
            
            {/*Sidebar*/}
            <motion.span
               initial={{
                  opacity: 0,
                  x: -60,
               }}
               animate={{
                  opacity: 1, x: 0,
               }}
               transition={{ duration: 0.5 }}
            >
               
               <Box
                  backgroundColor={'secondary'}
                  backgroundImage={'url(assets/patterns/flowers.jpg)'}
                  backgroundBlendMode={'multiply'}
                  position="fixed"
                  left="0"
                  width="100%"
                  height="100%"
                  top="0"
                  right="0"
                  display={['none', 'none', 'none', 'block']}
                  maxWidth={[0, 0, 0, '35rem']}
                  alignItems="center"
               >
                  
                  <Box
                     background={'url(/assets/online-learning.jpg) 0% 41%'}
                     // backgroundSize={'cover'}
                     height="200px"
                     backgroundSize="105%"
                     backgroundPosition="68% 32%"
                  />
                  
                  
                  <motion.div
                     initial={{
                        opacity: 0,
                        x: -60,
                     }}
                     animate={{
                        opacity: 1, x: 0,
                     }}
                     transition={{ duration: 0.5, delay: 1 }}
                  >
                     
                     <Flex
                        backgroundColor="secondary"
                        backgroundImage={'url(assets/patterns/seigaiha.png)'}
                        backgroundBlendMode={'color-burn'}
                        flexDirection="column"
                        p={10}
                     >
                        
                        <Box mb={3}>
                           <Heading size="lg" color="white">{t('contact:headings.part1')}</Heading>
                           <Flex alignItems="flex-end">
                              <Heading size="lg" color="white" mr={3}>{t('contact:headings.part2')}</Heading>
                              <Heading size="xl" color="brand.100">Slate.</Heading>
                           </Flex>
                        </Box>
                        
                        <Box color="white" fontSize="xl" mb={5}>{t('contact:description')}</Box>
                        
                        <Box>
                           <Button as="a" href="/">{t('Learn more')}</Button>
                        </Box>
                     
                     </Flex>
                  
                  </motion.div>
               
               </Box>
            
            </motion.span>
            
            {/*Main*/}
            <Box
               pl={[0, 0, 0, '35rem']}
            >
               <Box
                  as="section"
               >
                  <Box
                     {...rest}
                  >
                     <SimpleGrid justifyContent="center" alignContent="center">
                        
                        {children}
                     
                     </SimpleGrid>
                  
                  </Box>
               </Box>
            </Box>
         </Box>
      </>
   )
}

export default Layout
