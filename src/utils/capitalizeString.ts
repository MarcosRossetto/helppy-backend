export default function titleize(text: string) {

  text = text.toLocaleLowerCase().trim()
  text = text.charAt(0).toUpperCase() + text.slice(1)

  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i) === " ") {

      var charToUper = text.charAt(i + 1).toUpperCase()

      var sliceBegin = text.slice(0, (i + 1))

      var sliceEnd = text.slice(i + 2)

      text = sliceBegin + charToUper + sliceEnd
    }
  }
  return text
}