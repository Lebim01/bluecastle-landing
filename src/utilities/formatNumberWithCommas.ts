export const formatNumberWithCommas = (
  rawNumber: string | number | any,
  decimals = -1,
  default_value?: string,
  removeRightZeros = true
): string => {
  if (!rawNumber && rawNumber !== 0) return default_value ?? '-'

  let text = (
    decimals == -1
      ? rawNumber
      : (typeof rawNumber == 'number' ? rawNumber : parseFloat(rawNumber))
        .toFixed(decimals)
        .replace(removeRightZeros ? /\.0+$/ : '', '')
  ).toString()

  try {
    text = text.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  } catch (err) {
    console.error('REGEX NO SUPPORTED')
    text = Number(text).toLocaleString('en-US')
  }

  return text
}
