import { DOMSerializer } from '@tiptap/pm/model'
import type { Editor } from '@tiptap/react'

type TSerializeOptions = {
  shouldProcessParagraphs?: boolean
  emptyParagraphContent?: string
}

export function getHTML(
  editor: Editor,
  options: TSerializeOptions = {}
): string {
  const { shouldProcessParagraphs = true, emptyParagraphContent = '&nbsp;' } =
    options
  const emptyParagraph = `<p$1>${emptyParagraphContent}</p>`

  // Get the editor's document
  const doc = editor.state.doc

  // Create a DOM serializer with the editor's schema
  const serializer = DOMSerializer.fromSchema(editor.schema)

  // Serialize the document to DOM
  const dom = serializer.serializeFragment(doc.content, {
    document: window.document,
  })

  // Convert DOM to HTML string
  let html = ''
  for (let i = 0; i < dom.childNodes.length; i++) {
    const child = dom.childNodes[i]
    if (child.nodeType === Node.ELEMENT_NODE) {
      html += (child as Element).outerHTML
    } else if (child.nodeType === Node.TEXT_NODE) {
      html += child.textContent
    }
  }

  if (shouldProcessParagraphs) {
    // Replace empty paragraphs
    html = html.replace(/<p([^>]*)>\s*<\/p>/g, emptyParagraph)
  }

  return html
}
