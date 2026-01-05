// JavaScript file to define category colours.
export function getCategoryColour(category) {
  switch (category) {
    case "Streaming": return "rgb(152, 98, 209)";
    case "Lifestyle": return "rgb(209, 98, 98)";
    case "Software":  return "rgb(98, 117, 209)";
    case "Education": return "rgb(209, 98, 159)";
    case "Entertainment": return "rgb(98, 209, 102)";
    default: return "#eadcb3";
  }
}

