export default function minutesToFormat(duration) {
  if (Number.isInteger(duration) && duration >= 0) {
    return formatGenerator(duration);
  } else if (isNaN(duration) && duration >= 0) {
    return formatGenerator(parseInt(duration));
  } else {
    return "- ";
  }
}

function formatGenerator(d) {
  if (d <= 60) {
    return d + "m";
  } else {
    let hours = d / 60;
    let minuts = d % 60;
    if (minuts == 0) {
      return hours + "h";
    }
    let format = Math.floor(hours) + "h " + minuts + "m";
    return format;
  }
}
