export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export type TFontSizeOption = {
  label: string;
  value: "paragraph" | `heading-${Level}`;
};

export const PARAGRAPH_OPTION = { label: "Paragraph", value: "paragraph" };

export const HEADING_OPTIONS: TFontSizeOption[] = [
  { label: "Heading 1", value: "heading-1" },
  { label: "Heading 2", value: "heading-2" },
  { label: "Heading 3", value: "heading-3" },
  { label: "Heading 4", value: "heading-4" },
  { label: "Heading 5", value: "heading-5" },
  { label: "Heading 6", value: "heading-6" },
];
