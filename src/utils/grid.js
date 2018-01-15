const gridWidth = 12;
const gridSizes = ['xs', 'sm', 'md', 'lg'];

export const flexboxGridColumnWidth = (partition) =>
  gridSizes.reduce((acc, size) => {
      acc[size] = gridWidth * partition;
      return acc;
    }, {});
