export function checkIsVeryLightColor(hexColor: string) {
  // Remove the '#' if it's present
  const cleanHex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor

  // Ensure valid hex length (assume RRGGBB for simplicity, can extend for RGB)
  if (cleanHex.length !== 6) {
    return false
  }

  // Parse the r, g, b values
  const r = parseInt(cleanHex.substring(0, 2), 16)
  const g = parseInt(cleanHex.substring(2, 4), 16)
  const b = parseInt(cleanHex.substring(4, 6), 16)

  // Calculate luminance using the WCAG formula (relative luminance)
  // L = 0.2126 * R + 0.7152 * G + 0.0722 * B, where R, G, B are sRGB values.
  // For standard sRGB, we can directly use the R, G, B values from 0-255.
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

  return luminance > 0.9
}
