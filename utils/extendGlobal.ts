Array.prototype.sum = function () {
  return this.reduce((acc, value) => acc + value, 0);
};

Array.prototype.splitInGroupsOf = function (itemsPerGroup) {
  const result = [];
  for (let i = 0; i < this.length; i += itemsPerGroup) {
    const chunk = this.slice(i, i + itemsPerGroup);
    result.push(chunk);
  }

  return result;
};
