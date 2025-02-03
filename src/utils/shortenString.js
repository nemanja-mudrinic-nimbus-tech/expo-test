export function shortenString(string, char) {
  let shortenDesc = '';
  if (string?.split('')[0] === '<') {
    shortenDesc =
      string?.length > char
        ? string?.substring(0, char + 100).trim() + '...'
        : string;
  } else {
    shortenDesc =
      string?.length > char
        ? string?.substring(0, char - 3).trim() + '...'
        : string;
  }

  return shortenDesc;
}
