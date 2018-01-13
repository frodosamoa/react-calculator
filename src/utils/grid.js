const gridWidth = 12;
const gridSizes = ['xs', 'sm', 'md', 'lg'];

const createRowSizeObject = (gridSizes, gridWidth, partition) =>
  gridSizes.reduce((acc, size) => {
      acc[size] = gridWidth * partition;
      return acc;
    }, {});

export const fullRow = createRowSizeObject(gridSizes, gridWidth, 1);
export const fourthRow = createRowSizeObject(gridSizes, gridWidth, 1/4);
export const halfRow = createRowSizeObject(gridSizes, gridWidth, 1/2);
