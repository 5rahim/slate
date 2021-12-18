import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BiDotsVertical } from '@react-icons/all-files/bi/BiDotsVertical'
import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { BiEdit } from '@react-icons/all-files/bi/BiEdit'
import { BiError } from '@react-icons/all-files/bi/BiError'
import { BiErrorCircle } from '@react-icons/all-files/bi/BiErrorCircle'
import { BiExit } from '@react-icons/all-files/bi/BiExit'
import { BiFolder } from '@react-icons/all-files/bi/BiFolder'
import { BiFolderOpen } from '@react-icons/all-files/bi/BiFolderOpen'
import { BiLinkAlt } from '@react-icons/all-files/bi/BiLinkAlt'
import { BiLinkExternal } from '@react-icons/all-files/bi/BiLinkExternal'
import { BiTrash } from '@react-icons/all-files/bi/BiTrash'
import { RiArticleLine } from '@react-icons/all-files/ri/RiArticleLine'
import { RiFile3Line } from '@react-icons/all-files/ri/RiFile3Line'
import { ComponentVisibility, HideItemInStudentView } from '@slate/components/ComponentVisibility'
import { DeletionAlert } from '@slate/components/DeletionAlert'
import { RichTextContent } from '@slate/components/UI/RichTextContent'
import { Modules } from '@slate/generated/graphql'
import { useChangeModuleFolder, useDeleteModule } from '@slate/graphql/schemas/modules/hooks'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useLinkHref } from '@slate/hooks/useLinkHref'
import { useModuleFolder } from '@slate/hooks/useModuleFolder'
import { useModuleShortcut } from '@slate/hooks/useModuleShortcut'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { UnitModuleTypes } from '@slate/types/UnitModules'
import { Utils } from '@slate/utils'
import { Button } from 'chalkui/dist/cjs/Components/Button/Button'
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from 'chalkui/dist/cjs/Components/Dropdown/Dropdown'
import { Icon } from 'chalkui/dist/cjs/Components/Icon/Icon'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Flex, Link, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import { Badge } from 'chalkui/dist/cjs/Components/Layout/Badge'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import {
   AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
} from 'chalkui/dist/cjs/Components/Modal/AlertDialog'
import { Skeleton } from 'chalkui/dist/cjs/Components/Skeleton/Skeleton'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const UnitModuleEdit = dynamic(() => import('@slate/modules/Course/Instructor/Units/Modules/UnitModuleEdit'))
const UnitModuleMove = dynamic(() => import('@slate/modules/Course/Instructor/Units/Modules/UnitModuleMove'))
const UnitModuleMoveToFolder = dynamic(() => import('@slate/modules/Course/Instructor/Units/Modules/UnitModuleMoveToFolder'))
const UnitModuleShortcut = dynamic(() => import('@slate/modules/Course/Instructor/Units/Modules/UnitModuleShortcut'))

interface ModuleItemProps {
   data: Modules
   id: string
}

/**
 * As shortcut
 * initialData -> shortcut data,
 *
 * @param {Modules} initialData
 * @param {string} id
 * @returns {JSX.Element}
 * @constructor
 */
export const UnitModuleItem = ({ data: initialData, id }: ModuleItemProps) => {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const { linkToUnit } = useLinkHref()
   const { formatDate } = useDateFormatter()
   const cache = useStoreCache()
   const router = useRouter()
   const modules = cache.read<Modules[] | null>('modules')
   
   const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure()
   const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure()
   const { isOpen: moveIsOpen, onOpen: moveOnOpen, onClose: moveOnClose } = useDisclosure()
   const { isOpen: moveToFolderIsOpen, onOpen: moveToFolderOnOpen, onClose: moveToFolderOnClose } = useDisclosure()
   const { isOpen: cannotDeleteFolderIsOpen, onOpen: cannotDeleteFolderOnOpen, onClose: cannotDeleteFolderOnClose } = useDisclosure()
   const { isOpen: shortcutIsOpen, onOpen: shortcutOnOpen, onClose: shortcutOnClose } = useDisclosure()
   
   const [data, setData] = useState<Modules>(initialData)
   const [isShortcut, setIsShortcut] = useState(false)
   
   /** Form **/
   const cancelRef: any = useRef()
   let content = data.content.startsWith('{') || data.content.startsWith('[') ? JSON.parse(data.content) : null
   
   /** Helpers **/
   const { openFolder, hasFolder, isFolderOpen, isInOpenedFolder, shouldOpenFolder } = useModuleFolder()
   const { fetchShortcutModuleData, shortcutModule } = useModuleShortcut()
   const { publishDateHelpers } = usePublishDateSetting()
   
   /** Mutations **/
   const [deleteModule] = useDeleteModule({
      onCompleted: () => {
         deleteOnClose()
      },
   })
   
   const [changeModuleFolder] = useChangeModuleFolder()
   
   /** Effects **/
   
   /**
    * Fetch actual module data if item is shortcut
    */
   useEffect(() => {
      if (data.type === UnitModuleTypes.Shortcut) {
         setIsShortcut(true)
         fetchShortcutModuleData(data.content)
      }
   }, [initialData])
   
   useEffect(() => {
      if (shortcutModule) {
         // data -> module data + shortcut's folder, id and order
         setData({ ...shortcutModule, id: initialData.id, folder_id: initialData.folder_id, order: initialData.order })
      } else {
         setData(initialData)
      }
   }, [shortcutModule, initialData])
   
   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
   } = useSortable({
      id: id,
      transition: {
         duration: 150, // milliseconds
         easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
   })
   
   const style = {
      transform: CSS.Transform.toString(transform ? {
         x: 0,
         y: transform.y,
         scaleX: transform.scaleX,
         scaleY: 1,
      } : transform),
      transition,
   }
   
   
   const handleOnDelete = useCallback(() => {
      if (data.type !== UnitModuleTypes.Folder) return deleteOnOpen()
      
      const modulesInFolder = modules?.filter((m) => m.folder_id === data.id)
      if (!!modulesInFolder && modulesInFolder.length > 0) {
         cannotDeleteFolderOnOpen()
      } else {
         deleteOnOpen()
      }
   }, [data, modules])
   
   const handleOpenShortcutFolder = useCallback(() => {
      if (shortcutModule) {
         router.push(linkToUnit(shortcutModule.unit_id))
         shouldOpenFolder(shortcutModule) // Doesn't work
      }
   }, [shortcutModule])
   
   if (( !isFolderOpen && hasFolder(initialData) ) || ( isFolderOpen && !isInOpenedFolder(initialData) )) {
      return <></>
   }
   
   const isHighlighted = deleteIsOpen || editIsOpen || shortcutIsOpen || moveToFolderIsOpen || moveIsOpen
   
   const isAvailable = data.status === 'available' || ( data.status === 'scheduled' && Utils.Dates.publicationDateHasPassed(data.available_from) )
   
   return (
      <HideItemInStudentView showIf={isAvailable}>
         
         <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={cannotDeleteFolderOnClose}
            isOpen={cannotDeleteFolderIsOpen}
            isCentered
         >
            <AlertDialogOverlay />
            
            <AlertDialogContent>
               <AlertDialogCloseButton />
               <AlertDialogHeader>Oops!</AlertDialogHeader>
               <AlertDialogBody>
                  <Text>
                     {t('course:Folder is not empty')}
                  </Text>
               </AlertDialogBody>
               <AlertDialogFooter>
                  <Button colorScheme="primary" variant="outline" ref={cancelRef} onClick={cannotDeleteFolderOnClose}>
                     {t('Cancel')}
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
   
         {editIsOpen && <UnitModuleEdit
            isOpen={editIsOpen}
            onClose={editOnClose}
            data={initialData}
         />}
   
         {moveIsOpen && <UnitModuleMove
            data={isShortcut ? initialData : data}
            isOpen={moveIsOpen}
            onOpen={moveOnOpen}
            onClose={moveOnClose}
         />}
   
         {shortcutIsOpen && <UnitModuleShortcut
            data={data}
            isOpen={shortcutIsOpen}
            onOpen={shortcutOnOpen}
            onClose={shortcutOnClose}
         />}
   
         {moveToFolderIsOpen && <UnitModuleMoveToFolder
            data={isShortcut ? initialData : data}
            isOpen={moveToFolderIsOpen}
            onOpen={moveToFolderOnOpen}
            onClose={moveToFolderOnClose}
         />}
         
         <DeletionAlert
            onClose={deleteOnClose}
            isOpen={deleteIsOpen}
            handleDelete={() => deleteModule({ id: initialData.id })}
            type={isShortcut ? 'shortcut' : 'module'}
         />
         
         <ListItem
            ref={setNodeRef}
            style={style}
            width="100%"
            position="relative"
            bgColor={cmf('white', 'transparent')}
            _hover={{
               bgColor: cmf('gray.100', 'gray.800'),
            }}
         >
            
            <Flex
            >
               
               <ComponentVisibility.InstructorOnly>
                  <Flex
                     mr="-.5rem"
                     color={cmf("#979797", 'gray.200')}
                     height="100%"
                     alignSelf="center"
                     cursor="ns-resize"
                     {...attributes}
                     {...listeners}
                  >
                     <Icon as={BiDotsVertical} fontSize="1.6rem" />
                     <Icon as={BiDotsVertical} ml="-1.2rem" fontSize="1.6rem" />
                  </Flex>
               </ComponentVisibility.InstructorOnly>
               
               {
                  ( data.type === UnitModuleTypes.Shortcut && shortcutModule ) && (
                     <ModuleContent
                        isShortcut={isShortcut}
                        isAvailable={isAvailable}
                        highlighted={isHighlighted}
                        icon={BiLinkExternal}
                        iconColor="pink.500"
                     >
                        <Skeleton width="60%" height="15px" borderRadius="md" />
                     </ModuleContent>
                  )
               }
               
               {/*Folder*/}
               {
                  ( data.type === UnitModuleTypes.Folder ) && (
                     <ModuleContent
                        isShortcut={isShortcut}
                        isAvailable={isAvailable}
                        highlighted={isHighlighted}
                        icon={BiFolder}
                        iconColor="teal.500"
                     >
                        <Link
                           onClick={() => {
                              if (initialData.type === 'shortcut') {
                                 handleOpenShortcutFolder()
                              } else {
                                 openFolder(data)
                              }
                           }}
                        >{data.content}</Link>
                     </ModuleContent>
                  )
               }
               
               {
                  ( data.type === UnitModuleTypes.Text ) && (
                     <ModuleContent
                        isShortcut={isShortcut}
                        isAvailable={isAvailable}
                        highlighted={isHighlighted}
                     >
                        <RichTextContent truncate={400} content={data.content} />
                     </ModuleContent>
                  )
               }
               
               {
                  ( data.type === UnitModuleTypes.TextHeader ) && (
                     <ModuleContent isShortcut={isShortcut} highlighted={isHighlighted}>
                        <Text fontSize="lg" fontWeight="700">{data.content}</Text>
                     </ModuleContent>
                  )
               }
               
               {
                  ( data.type === UnitModuleTypes.Message ) && (
                     <ModuleContent
                        isShortcut={isShortcut}
                        isAvailable={isAvailable}
                        highlighted={isHighlighted}
                        icon={JSON.parse(data.content).type === '1' ? null : ( JSON.parse(data.content).type === '2'
                           ? BiError
                           : BiErrorCircle )}
                        iconColor={JSON.parse(data.content).type === '1' ? 'gray.500' : ( JSON.parse(data.content).type === '2'
                           ? 'orange.500'
                           : 'red.500' )}
                     >
                        <Text>{JSON.parse(data.content).message}</Text>
                     </ModuleContent>
                  )
               }
               
               {
                  ( data.type === UnitModuleTypes.Link ) && (
                     <ModuleContent
                        isShortcut={isShortcut}
                        isAvailable={isAvailable}
                        highlighted={isHighlighted}
                        icon={BiLinkAlt}
                        iconColor="blue.500"
                     >
                        {content.description && <Text>{content.description}</Text>}
                        <Link overflowWrap="anywhere" target="_blank" href={content.link}>{content.link}</Link>
                     </ModuleContent>
                  )
               }
               
               {
                  ( data.type === UnitModuleTypes.File ) && (
                     <ModuleContent
                        isShortcut={isShortcut}
                        isAvailable={isAvailable}
                        highlighted={isHighlighted}
                        icon={RiFile3Line}
                        iconColor="blue.500"
                     >
                        <Flex gridGap=".5rem" flexDirection={['column', 'column', 'row', 'row', 'row']}>
                           <Link target="_blank" href={content.file.url}>{content.name ?? content.file.name ?? content.file.url.slice(-36)}</Link>
                           <Badge alignSelf="flex-start" pill colorScheme="green.600">{content.file.ext}</Badge>
                        </Flex>
                     </ModuleContent>
                  )
               }
               
               {
                  ( data.type === UnitModuleTypes.Document ) && (
                     <ModuleContent
                        isShortcut={isShortcut}
                        isAvailable={isAvailable}
                        highlighted={isHighlighted}
                        icon={RiArticleLine}
                        iconColor="orange.500"
                     >
                        <Flex gridGap=".5rem">
                           <Link target="_blank" href={content.id}>{content.name}</Link>
                           {/*<Badge pill colorScheme="green.600">{content.file.ext}</Badge>*/}
                        </Flex>
                     </ModuleContent>
                  )
               }
               
               
               <ComponentVisibility.AssistantAndHigher>
                  
                  <Flex alignItems="center" mr="2">
                     
                     {publishDateHelpers.icons({ status: data.status, availableFrom: data.available_from })}
                  
                  </Flex>
                  
                  <Flex alignItems="center">
                     <Dropdown>
                        <DropdownButton
                           as={Box}
                           aria-label="Options"
                           size="lg"
                           variant="outline"
                           cursor="pointer"
                           color={cmf('gray.300', 'gray.300')}
                           _hover={{
                              color: cmf('black', 'white'),
                           }}
                        >
                           <Box
                              fontSize="1.6rem"
                           >
                              <Icon as={BiDotsVerticalRounded} />
                           </Box>
                        
                        </DropdownButton>
                        <DropdownList>
                           
                           {isShortcut && (
                              <NextLink href={linkToUnit(data.unit_id)}>
                                 <DropdownItem icon={<BiFolderOpen />}>
                                    {t('course:Open in unit')}
                                 </DropdownItem>
                              </NextLink>
                           )}
                           
                           {!isShortcut && (
                              <>
                                 <DropdownItem icon={<BiEdit />} onClick={editOnOpen}>
                                    {t('Edit')}
                                 </DropdownItem>
                                 
                                 <ComponentVisibility.InstructorOnly>
                                    <DropdownItem icon={<BiLinkExternal />} onClick={shortcutOnOpen}>
                                       {t('course:Create a shortcut')}
                                    </DropdownItem>
                                    {
                                       ( !isFolderOpen && !( data.type === UnitModuleTypes.Folder ) ) && (
                                          <>
                                             <DropdownItem icon={<BiExit />} onClick={moveOnOpen}>
                                                {t('course:Move to different unit')}
                                             </DropdownItem>
                                          </>
                                       )
                                    }
                                 </ComponentVisibility.InstructorOnly>
                              
                              </>
                           )}
                           
                           <ComponentVisibility.InstructorOnly>
                              {
                                 isFolderOpen && (
                                    <DropdownItem
                                       icon={<BiExit />} onClick={() => {
                                       changeModuleFolder({
                                          id: initialData.id,
                                          folder_id: null,
                                       })
                                    }}
                                    >
                                       {t('course:Remove from folder')}
                                    </DropdownItem>
                                 )
                              }
                              
                              {( !isFolderOpen && initialData.type !== 'folder' && data.type !== 'folder' && data.type !== 'shortcut' ) && (
                                 <DropdownItem icon={<BiFolder />} onClick={moveToFolderOnOpen}>
                                    {t('course:Move to folder')}
                                 </DropdownItem>
                              )}
                              
                              <DropdownItem icon={<BiTrash />} onClick={handleOnDelete}>
                                 {t(isShortcut ? 'course:Delete shortcut' : 'Delete')}
                              </DropdownItem>
                           </ComponentVisibility.InstructorOnly>
                        
                        </DropdownList>
                     </Dropdown>
                  </Flex>
               
               </ComponentVisibility.AssistantAndHigher>
            
            </Flex>
         
         </ListItem>
      
      </HideItemInStudentView>
   )
}

interface ModuleContentProps {
   icon?: any,
   iconColor?: any,
   children?: React.ReactNode
   highlighted?: boolean,
   isShortcut?: boolean,
   isAvailable?: boolean
}

function ModuleContent({ icon, iconColor, children, highlighted, isAvailable, isShortcut }: ModuleContentProps) {
   
   const cmf = useCMF()
   
   return (
      <Box
         px="3"
         py="3"
         width="100%"
         bgColor={highlighted ? cmf('#fff3e6', 'gray.600') : undefined}
      >
         
         <Flex
            alignItems={["flex-start", "center", "center", "center", "center"]}
            flexDirection={['column', 'row', 'row', 'row', 'row']}
            position="relative"
         >
            
            
            {icon && <Flex mr="3" position="relative">
                <IconBox
                    p=".5rem"
                    size="md"
                    fontSize="xs"
                    colorScheme={iconColor}
                    variant="secondary"
                    as={icon}
                    opacity={isAvailable ? "1" : ".5"}
                />
                
            </Flex>}
            
            <ComponentVisibility.AssistantAndHigher>
               {isShortcut && <IconBox
                   colorScheme="brand.100"
                   color="gray.900"
                   variant="primary"
                   size="xs"
                   p="1"
                   ml="-.5rem"
                   top="-.5rem"
                   as={BiLinkExternal}
                   position="absolute"
               />}
            </ComponentVisibility.AssistantAndHigher>
            
            <Box>
               {children}
            </Box>
         </Flex>
         
         {/*<Box>*/}
         {/*   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut beatae eligendi itaque, maiores nobis numquam pariatur perspiciatis temporibus, totam vero voluptate. Debitis harum quaerat vero! Accusantium possimus reprehenderit veritatis!*/}
         {/*</Box>*/}
      
      </Box>
   )
   
}

export default UnitModuleItem
