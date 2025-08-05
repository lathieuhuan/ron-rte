export function prepareInputHTML(html: string): string {
  // Convert &nbsp; in empty paragraphs to <br/>
  html = html.replace(/<p([^>]*)>&nbsp;<\/p>/g, '<p$1></p>')

  // Convert &nbsp; in paragraphs with only &nbsp; to <br/>
  html = html.replace(/<p([^>]*)>\s*&nbsp;\s*<\/p>/g, '<p$1></p>')

  // Handle paragraphs that contain only &nbsp; and whitespace
  html = html.replace(/<p([^>]*)>\s*&nbsp;\s*<\/p>/g, '<p$1></p>')

  // Convert standalone &nbsp; to <br/> in paragraphs
  html = html.replace(
    /<p([^>]*)>([^<]*)&nbsp;([^<]*)<\/p>/g,
    (match, attrs, before, after) => {
      // If the paragraph contains only &nbsp; and whitespace, replace with <br/>
      if ((before + after).trim() === '') {
        return `<p${attrs}><br/></p>`
      }
      return match
    }
  )

  return html
}
