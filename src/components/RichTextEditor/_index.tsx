import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/React'
import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { MdFormatQuote } from 'react-icons/md'
import { BiBold, BiCode, BiHeading, BiItalic, BiListOl, BiListUl, BiUnderline } from 'react-icons/bi'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
   Editor,
   Transforms,
   createEditor,
   Descendant,
   Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { Icon } from 'chalkui/dist/cjs/Components/Icon'

// import { Button, Icon, Toolbar } from '../components'

const HOTKEYS: any = {
   'mod+b': 'bold',
   'mod+i': 'italic',
   'mod+u': 'underline',
   'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

export const RichTextEditor = () => {
   const [value, setValue] = useState<Descendant[]>(initialValue)
   const renderElement = useCallback(props => <Element {...props} />, [])
   const renderLeaf = useCallback(props => <Leaf {...props} />, [])
   const editor = useMemo(() => withHistory(withReact(createEditor() as any)), [])
   
   return (
      <Slate editor={editor} value={value} onChange={(value: any) => setValue(value)}>
         <Flex
            sx={{
               width: 'full',
               border: '1px solid #ddd'
            }}
         >
            <MarkButton format="bold" icon={BiBold} />
            <MarkButton format="italic" icon={BiItalic} />
            <MarkButton format="underline" icon={BiUnderline} />
            <MarkButton format="code" icon={BiCode} />
            <BlockButton format="heading-one" icon={BiHeading} />
            <BlockButton format="heading-two" icon="looks_two" />
            <BlockButton format="block-quote" icon={MdFormatQuote} />
            <BlockButton format="numbered-list" icon={BiListOl} />
            <BlockButton format="bulleted-list" icon={BiListUl} />
         </Flex>
         <Box
            sx={{
               border: '1px solid #ddd'
            }}
         >
            <Editable
               renderElement={renderElement}
               renderLeaf={renderLeaf}
               placeholder="Enter some rich text…"
               spellCheck
               autoFocus
               onKeyDown={(event: any) => {
                  for (const hotkey in HOTKEYS) {
                     if (isHotkey(hotkey, event as any)) {
                        event.preventDefault()
                        const mark = HOTKEYS[hotkey]
                        toggleMark(editor, mark)
                     }
                  }
               }}
            />
         </Box>
      </Slate>
   )
}

const toggleBlock = (editor: any, format: any) => {
   const isActive = isBlockActive(editor, format)
   const isList = LIST_TYPES.includes(format)
   
   Transforms.unwrapNodes(editor, {
      match: (n: any) =>
         !Editor.isEditor(n) &&
         SlateElement.isElement(n) &&
         LIST_TYPES.includes((n as any).type),
      split: true,
   })
   const newProperties: any = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
   }
   Transforms.setNodes<SlateElement>(editor, newProperties)
   
   if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
   }
}

const toggleMark = (editor: any, format: any) => {
   const isActive = isMarkActive(editor, format)
   
   if (isActive) {
      Editor.removeMark(editor, format)
   } else {
      Editor.addMark(editor, format, true)
   }
}

const isBlockActive = (editor: any, format: any) => {
   const { selection } = editor
   if (!selection) return false
   
   const [match] = Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
         !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === format,
   })
   
   return !!match
}

const isMarkActive = (editor: any, format: any) => {
   const marks: any = Editor.marks(editor)
   return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }: any) => {
   switch (element.type) {
      case 'block-quote':
         return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
         return <ul {...attributes}>{children}</ul>
      case 'heading-one':
         return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
         return <h2 {...attributes}>{children}</h2>
      case 'list-item':
         return <li {...attributes}>{children}</li>
      case 'numbered-list':
         return <ol {...attributes}>{children}</ol>
      default:
         return <p {...attributes}>{children}</p>
   }
}

const Leaf = ({ attributes, children, leaf }: any) => {
   if (leaf.bold) {
      children = <strong>{children}</strong>
   }
   
   if (leaf.code) {
      children = <code>{children}</code>
   }
   
   if (leaf.italic) {
      children = <em>{children}</em>
   }
   
   if (leaf.underline) {
      children = <u>{children}</u>
   }
   
   return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }: any) => {
   const editor = useSlate()
   return (
      <Flex
         sx={{
            w: '3rem',
            h: '2.5rem',
            fontSize: 'xl',
            borderRadius: 0,
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            bgColor: isMarkActive(editor, format) ? '#e1e1e1' : 'gray.100'
         }}
         active={isBlockActive(editor, format)}
         onMouseDown={(event: any) => {
            event.preventDefault()
            toggleBlock(editor, format)
         }}
      >
         <Icon as={icon} />
      </Flex>
   )
}

const MarkButton = ({ format, icon }: any) => {
   const editor = useSlate()
   return (
      <Flex
         sx={{
            w: '3rem',
            h: '2.5rem',
            fontSize: 'xl',
            borderRadius: 0,
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            bgColor: isMarkActive(editor, format) ? '#e1e1e1' : 'gray.100'
         }}
         active={isMarkActive(editor, format)}
         onMouseDown={(event: any) => {
            event.preventDefault()
            toggleMark(editor, format)
         }}
      >
         <Icon as={icon} />
      </Flex>
   )
}

const initialValue: any = [
   {
      type: 'paragraph',
      children: [
         { text: 'This is editable ' },
         { text: 'rich', bold: true },
         { text: ' text, ' },
         { text: 'much', italic: true },
         { text: ' better than a ' },
         { text: '<textarea>', code: true },
         { text: '!' },
      ],
   },
   {
      type: 'paragraph',
      children: [
         {
            text:
               "Since it's rich text, you can do things like turn a selection of text ",
         },
         { text: 'bold', bold: true },
         {
            text:
               ', or add a semantically rendered block quote in the middle of the page, like this:',
         },
      ],
   },
   {
      type: 'block-quote',
      children: [{ text: 'A wise quote.' }],
   },
   {
      type: 'paragraph',
      children: [{ text: 'Try it out for yourself!' }],
   },
]
