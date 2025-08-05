import { Editor } from '@tiptap/react'
import { createContext } from 'react'

export type EditorState = {
  editor: Editor | null
  disabled: boolean
}

export const EditorStateContext = createContext<EditorState>({
  editor: null,
  disabled: false,
})
