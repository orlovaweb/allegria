export function transformGoods(goods) {
  const artgoods = [];
  goods.forEach(p => {
    const index = artgoods.findIndex((el) => {
      return p.art === el.art;
    });
    if (index >= 0) {
      artgoods[index].size.push(p.size);
    } else {
      if (p.size) {
        artgoods.push({ ...p, size: [p.size] });
      } else {
        artgoods.push(p);
      }
    }
  });

  return artgoods;
}