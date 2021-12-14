import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BiCalendarAlt } from '@react-icons/all-files/bi/BiCalendarAlt'
import { BiCheckCircle } from '@react-icons/all-files/bi/BiCheckCircle'
import { BiDotsVertical } from '@react-icons/all-files/bi/BiDotsVertical'
import { BiDotsVerticalRounded } from '@react-icons/all-files/bi/BiDotsVerticalRounded'
import { BiEdit } from '@react-icons/all-files/bi/BiEdit'
import { BiError } from '@react-icons/all-files/bi/BiError'
import { BiErrorCircle } from '@react-icons/all-files/bi/BiErrorCircle'
import { BiExit } from '@react-icons/all-files/bi/BiExit'
import { BiFolder } from '@react-icons/all-files/bi/BiFolder'
import { BiHide } from '@react-icons/all-files/bi/BiHide'
import { BiLinkAlt } from '@react-icons/all-files/bi/BiLinkAlt'
import { BiMessageAlt } from '@react-icons/all-files/bi/BiMessageAlt'
import { BiTrash } from '@react-icons/all-files/bi/BiTrash'
import { RiArticleLine } from '@react-icons/all-files/ri/RiArticleLine'
import { RiFile3Line } from '@react-icons/all-files/ri/RiFile3Line'
import { RiMistFill } from '@react-icons/all-files/ri/RiMistFill'
import { ComponentVisibility, HideItemInStudentView } from '@slate/components/ComponentVisibility'
import { DeletionAlert } from '@slate/components/DeletionAlert'
import { RichTextContent } from '@slate/components/UI/RichTextContent'
import { Modules } from '@slate/generated/graphql'
import { useChangeModuleFolder, useDeleteModule } from '@slate/graphql/schemas/modules/hooks'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useLinkHref } from '@slate/hooks/useLinkHref'
import { useModuleFolder } from '@slate/hooks/useModuleFolder'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { UnitModuleEdit } from '@slate/modules/Course/Instructor/Units/Modules/UnitModuleEdit'
import { UnitModuleMove } from '@slate/modules/Course/Instructor/Units/Modules/UnitModuleMove'
import { UnitModuleMoveToFolder } from '@slate/modules/Course/Instructor/Units/Modules/UnitModuleMoveToFolder'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { UnitModuleTypes } from '@slate/types/UnitModules'
import { Utils } from '@slate/utils'
import { AlertDialogCloseButton, AlertDialogHeader } from 'chalkui/dist/cjs'
import { Dropdown, DropdownButton, DropdownItem, DropdownList } from 'chalkui/dist/cjs/Components/Dropdown/Dropdown'
import Icon from 'chalkui/dist/cjs/Components/Icon/Icon'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Flex, Link, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import { Badge } from 'chalkui/dist/cjs/Components/Layout/Badge'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Tooltip } from 'chalkui/dist/cjs/Components/Tooltip'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button } from 'chalkui/dist/cjs/React'
import React, { useCallback, useRef, useState } from 'react'

interface ModuleItemProps {
   data: Modules
   id: string
}

export const ModuleItem = ({ data, id }: ModuleItemProps) => {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure()
   const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure()
   const { isOpen: moveIsOpen, onOpen: moveOnOpen, onClose: moveOnClose } = useDisclosure()
   const { isOpen: moveToFolderIsOpen, onOpen: moveToFolderOnOpen, onClose: moveToFolderOnClose } = useDisclosure()
   const { isOpen: cannotDeleteFolderIsOpen, onOpen: cannotDeleteFolderOnOpen, onClose: cannotDeleteFolderOnClose } = useDisclosure()
   const { linkToUnit } = useLinkHref()
   const { formatDate } = useDateFormatter()
   const cancelRef: any = useRef()
   const [highlightedModule, setHighlightedModule] = useState<string | null>(null)
   const cache = useStoreCache()
   const modules = cache.read<Modules[] | null>('modules')
   
   const {openFolder, hasFolder, isFolderOpen, isInOpenedFolder} = useModuleFolder()
   
   const isModuleHighlighted = useCallback((id: string) => {
      return id === highlightedModule
   }, [highlightedModule])
   
   let link_url: any
   let link_description: any
   
   let content = data.content.startsWith('{') || data.content.startsWith('[') ? JSON.parse(data.content) : null
   
   switch (data.type) {
      case UnitModuleTypes.Link:
         link_url = content.link
         link_description = content.description
         break
   }
   
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
   
   const [deleteModule] = useDeleteModule({
      onCompleted: () => {
         deleteOnClose()
      },
   })
   
   const [changeModulerFolder] = useChangeModuleFolder()
   
   function handleOnDelete() {
      if(data.type !== UnitModuleTypes.Folder) return deleteOnOpen()
      
      const modulesInFolder = modules?.filter((m) => m.folder_id === data.id)
      if(!!modulesInFolder && modulesInFolder.length > 0) {
         cannotDeleteFolderOnOpen()
      } else {
         deleteOnOpen()
      }
   }
   
   if(((!isFolderOpen && hasFolder(data)) || (isFolderOpen && !isInOpenedFolder(data)))) {
      return <></>
   }
   
   return (
      <HideItemInStudentView showIf={data.status === 'available' || ( data.status === 'scheduled' && Utils.Dates.publicationDateHasPassed(data.publish_on) )}>
         
         {/*<UnitAddArchive data={data} onClose={archiveOnClose} isOpen={archiveIsOpen} cancelRef={cancelRef} />*/}
   
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
         
         <UnitModuleEdit
            isOpen={editIsOpen}
            onClose={editOnClose}
            data={data}
         />
         
         <UnitModuleMove
            highlightModule={setHighlightedModule}
            data={data}
            isOpen={moveIsOpen}
            onOpen={moveOnOpen}
            onClose={moveOnClose}
         />
         
         <UnitModuleMoveToFolder
            highlightModule={setHighlightedModule}
            data={data}
            isOpen={moveToFolderIsOpen}
            onOpen={moveToFolderOnOpen}
            onClose={moveToFolderOnClose}
         />
         
         <DeletionAlert onClose={deleteOnClose} isOpen={deleteIsOpen} handleDelete={() => deleteModule({ id: data.id })} type={'module'} />
         
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
   
               {/*Folder*/}
               {
                  (data.type === UnitModuleTypes.Folder) && (
                     <ModuleContent highlighted={isModuleHighlighted(data.id) || deleteIsOpen || editIsOpen} icon={BiFolder} iconColor="pink.500">
                           <Link onClick={() => openFolder(data)}>{data.content}</Link>
                     </ModuleContent>
                  )
               }
               
               {
                  (data.type === UnitModuleTypes.Text) && (
                     <ModuleContent
                        highlighted={isModuleHighlighted(data.id) || deleteIsOpen || editIsOpen}
                        icon={RiMistFill} iconColor="yellow.500"
                     >
                        <RichTextContent truncate={400} content={data.content} />
                     </ModuleContent>
                  )
               }

               {
                  (data.type === UnitModuleTypes.TextHeader) && (
                     <ModuleContent highlighted={isModuleHighlighted(data.id) || deleteIsOpen || editIsOpen}>
                        <Text fontSize="lg" fontWeight="700">{data.content}</Text>
                     </ModuleContent>
                  )
               }
               
               {
                  (data.type === UnitModuleTypes.Message) && (
                     <ModuleContent
                        highlighted={isModuleHighlighted(data.id) || deleteIsOpen || editIsOpen}
                        icon={JSON.parse(data.content).type === '1' ? BiMessageAlt : (JSON.parse(data.content).type === '2' ? BiError : BiErrorCircle)}
                        iconColor={JSON.parse(data.content).type === '1' ? 'purple.500' : (JSON.parse(data.content).type === '2' ? 'orange.500' : 'red.500')}
                     >
                        <Text>{JSON.parse(data.content).message}</Text>
                     </ModuleContent>
                  )
               }
               
               {
                  (data.type === UnitModuleTypes.Link) && (
                     <ModuleContent highlighted={isModuleHighlighted(data.id) || deleteIsOpen || editIsOpen} icon={BiLinkAlt} iconColor="blue.500">
                        {content.description && <Text>{content.description}</Text>}
                        <Link overflowWrap="anywhere" target="_blank" href={content.link}>{content.link}</Link>
                     </ModuleContent>
                  )
               }
               
               {
                  (data.type === UnitModuleTypes.File) && (
                     <ModuleContent highlighted={isModuleHighlighted(data.id) || deleteIsOpen || editIsOpen} icon={RiFile3Line} iconColor="blue.500">
                        <Flex gridGap=".5rem" flexDirection={['column', 'column', 'row', 'row', 'row']}>
                           <Link target="_blank" href={content.file.url}>{content.name ?? content.file.name ?? content.file.url.slice(-36)}</Link>
                           <Badge alignSelf="flex-start" pill colorScheme="green.600">{content.file.ext}</Badge>
                        </Flex>
                     </ModuleContent>
                  )
               }
               
               {
                  (data.type === UnitModuleTypes.Document) && (
                     <ModuleContent
                        highlighted={isModuleHighlighted(data.id) || deleteIsOpen || editIsOpen}
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
                     {
                        ( data.status === 'available' || ( data.status === 'scheduled' && Utils.Dates.publicationDateHasPassed(data.publish_on) ) )
                        && <Icon as={BiCheckCircle} color="green.500" fontSize="2xl" />
                     }
                     {( data.status === 'scheduled' && !Utils.Dates.publicationDateHasPassed(data.publish_on) )
                     && (
                        <Tooltip placement="auto-end" label={`${t('Accessible on')} ${formatDate(data.publish_on, 'short with hours')}`}>
                           <Box mr="2"><Icon as={BiCalendarAlt} fontSize="2xl" /></Box>
                        </Tooltip>
                     )}
                     {( data.status !== 'available' ) && (
                        <Icon as={BiHide} fontSize="2xl" />
                     )}
                     
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
                           <DropdownItem icon={<BiEdit />} onClick={editOnOpen}>
                              {t('Edit')}
                           </DropdownItem>
                           
                           {
                              isFolderOpen ? (
                                 <DropdownItem icon={<BiExit />} onClick={() => {
                                    changeModulerFolder({
                                       id: data.id,
                                       folder_id: null
                                    })
                                 }}>
                                    {t('course:Remove from folder')}
                                 </DropdownItem>
                              ) : (
                                 <>
                                    <DropdownItem icon={<BiExit />} onClick={moveOnOpen}>
                                       {t('course:Move to different unit')}
                                    </DropdownItem>
                                    <DropdownItem icon={<BiFolder />} onClick={moveToFolderOnOpen}>
                                       {t('course:Move to folder')}
                                    </DropdownItem>
                                 </>
                              )
                           }
                           
                           <DropdownItem icon={<BiTrash />} onClick={handleOnDelete}>
                              {t('Delete')}
                           </DropdownItem>
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
   highlighted?: boolean
}

function ModuleContent({ icon, iconColor, children, highlighted }: ModuleContentProps) {
   
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
         >
            {icon && <Flex mr="3">
                <IconBox p=".5rem" size="md" fontSize="xs" colorScheme={iconColor} variant="secondary" as={icon} />
            </Flex>}
            
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
