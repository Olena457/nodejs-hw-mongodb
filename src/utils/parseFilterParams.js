function parseContactType(contactType) {
  if (typeof contactType !== 'string') {
    return undefined;
  }

  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
}

function parseIsFavourite(isFavourite) {
  if (typeof isFavourite !== 'string') {
    return undefined;
  }
  const isIsFavourite = (isFavourite) =>
    // [isFavourite === true || isFavourite === false].includes(isFavourite);
    ['true', 'false'].includes(isFavourite);
  if (isIsFavourite(isFavourite)) {
    return isFavourite;
  }
}

export function parseFilterParams(query) {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
}
