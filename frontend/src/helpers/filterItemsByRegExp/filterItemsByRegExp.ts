export function filterItemsByRegExp(
  items: { itemName: string; visible: boolean }[],
  str: string
): { itemName: string; visible: boolean }[] {
  const arr = items.map((value: { itemName: string; visible: boolean }) => {
    const pattern = new RegExp(str, 'g');
    value.itemName.match(pattern)
      ? (value.visible = true)
      : (value.visible = false);
    return value;
  });
  return arr;
}
