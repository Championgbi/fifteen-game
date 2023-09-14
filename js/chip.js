const chipToHtml = (data) => {
  return `
  <div class="${data.name}" data-number=${data.id}>${data.id}</div>
  `;
};

const cellToHtml = (data) => {
  return `
    <div class="${data.name}" data-id="${data.id}" data-x="${data.x}" data-y="${data.y}"></div>
  `;
};
export { chipToHtml, cellToHtml };
