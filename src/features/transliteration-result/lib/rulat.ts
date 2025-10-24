const letters = new Map<string, string>([
  ["Ьё", "Įjo"],
  ["Ью", "Įju"],
  ["Ья", "Įja"],
  ["Аё", "Ajo"],
  ["Оё", "Ojo"],
  ["Уё", "Ujo"],
  ["Эё", "Ęjo"],
  ["Ыё", "Yjo"],
  ["Её", "Ejo"],
  ["Аю", "Aju"],
  ["Ою", "Oju"],
  ["Ую", "Uju"],
  ["Эю", "Ęju"],
  ["Ыю", "Yju"],
  ["Ею", "Eju"],
  ["Ая", "Aja"],
  ["Оя", "Oja"],
  ["Уя", "Uja"],
  ["Эя", "Ęja"],
  ["Ыя", "Yja"],
  ["Ея", "Eja"],
  ["Ие", "Ije"],
  ["Ию", "Iju"],
  ["Ия", "Ija"],
  ["Ии", "Iji"],
  ["Яя", "Ája"],
  ["А", "A"],
  ["Б", "B"],
  ["В", "V"],
  ["Г", "G"],
  ["Д", "D"],
  ["Е", "E"],
  ["Ё", "Ó"],
  ["Ж", "Ž"],
  ["З", "Z"],
  ["И", "I"],
  ["Й", "J"],
  ["К", "K"],
  ["Л", "L"],
  ["М", "M"],
  ["Н", "N"],
  ["О", "O"],
  ["П", "P"],
  ["Р", "R"],
  ["С", "S"],
  ["Т", "T"],
  ["У", "U"],
  ["Ф", "F"],
  ["Х", "H"],
  ["Ц", "C"],
  ["Ч", "Č"],
  ["Ш", "Š"],
  ["Щ", "Ś"],
  ["Ъ", "J"],
  ["Ы", "Y"],
  ["Ь", "Í"],
  ["Э", "Ę"],
  ["Ю", "Ú"],
  ["Я", "Á"],
]);

const firstLetters = new Map<string, string>([
  ["Ё", "Jo"],
  ["Ю", "Ju"],
  ["Я", "Ja"],
]);

// Add lowercase variants
letters.forEach((latin, cyrillic) => {
  letters.set(cyrillic.toLowerCase(), latin.toLowerCase());
});

firstLetters.forEach((latin, cyrillic) => {
  firstLetters.set(cyrillic.toLowerCase(), latin.toLowerCase());
});

export const toLatin = (text: string): string => {
  let result = text;

  result = result.replace(/(^|\s)(\p{L})/gu, (match, p1, p2) => {
    const letter = firstLetters.get(p2) || p2
    return p1 + letter
  })

  letters.forEach((latin, cyrillic) => {
    const regex = new RegExp(cyrillic, 'gu')
    result = result.replace(regex, latin)
  })

  return result
};

// Basic reverse map for latin-to-cyrillic conversion
const reverseLetters = new Map<string, string>();
letters.forEach((latin, cyrillic) => {
  // Prioritize single characters and specific digraphs for reverse mapping
  if (cyrillic.length === 1 || ["Ьё", "Ью", "Ья"].includes(cyrillic)) {
    reverseLetters.set(latin, cyrillic);
  }
});
// Add reverse for first letters too
firstLetters.forEach((latin, cyrillic) => {
  reverseLetters.set(latin, cyrillic);
});

export const toCyrillic = (text: string): string => {
  let result = text;
  // Create a sorted array of latin characters from longest to shortest to match greedily
  const latinKeys = Array.from(reverseLetters.keys()).sort(
    (a, b) => b.length - a.length,
  );

  // Build a regex to find all possible latin characters
  const regex = new RegExp(
    latinKeys.map((key) => key.replace(/[.*+?^${}()|[\\]/g, "\\$&")).join("|"),
    "g",
  );

  result = result.replace(regex, (matched) => {
    const cyrillic = reverseLetters.get(matched);
    const lowerCyrillic = reverseLetters.get(matched.toLowerCase());

    if (cyrillic) return cyrillic;
    if (lowerCyrillic) {
      // Attempt to preserve case
      const isFirstCharUpper = matched[0] === matched[0].toUpperCase();
      if (isFirstCharUpper && lowerCyrillic.length > 0) {
        return lowerCyrillic.charAt(0).toUpperCase() + lowerCyrillic.slice(1);
      }
      return lowerCyrillic;
    }
    return matched; // fallback
  });

  return result;
};
