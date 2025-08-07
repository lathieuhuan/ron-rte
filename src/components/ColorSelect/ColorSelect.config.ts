export type TColorOption = {
  label: string
  value: string
}

export const DEFAULT_COLOR = '#000000'

export const COLOR_OPTIONS: TColorOption[] = [
  { label: 'Black', value: '#000000' },
  { label: 'Dark Gray', value: '#444444' },
  { label: 'Gray', value: '#888888' },
  { label: 'Light Gray', value: '#cccccc' },
  { label: 'White', value: '#ffffff' },
  // Second row - Warm colors
  { label: 'Red', value: '#ff6b6b' },
  { label: 'Orange', value: '#ffa726' },
  { label: 'Yellow', value: '#ffeb3b' },
  { label: 'Light Green', value: '#8bc34a' },
  { label: 'Green', value: '#4caf50' },
  // Third row - Cool colors
  { label: 'Light Blue', value: '#81c784' },
  { label: 'Cyan', value: '#4dd0e1' },
  { label: 'Blue', value: '#42a5f5' },
  { label: 'Indigo', value: '#5c6bc0' },
  { label: 'Purple', value: '#ab47bc' },
]
