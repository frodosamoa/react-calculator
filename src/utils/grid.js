const gridWidth = 12;
const gridSizes = ['xs', 'sm', 'md', 'lg'];

const createRowSizeObject = (gridSizes, gridWidth, partition) =>
  gridSizes.reduce((acc, size) => {
      acc[size] = gridWidth * partition;
      return acc;
    }, {});

export const fullRow = createRowSizeObject(gridSizes, gridWidth, 1);
export const threeFourthsRow = createRowSizeObject(gridSizes, gridWidth, 3/4);
export const twoThirdsRow = createRowSizeObject(gridSizes, gridWidth, 2/3);
export const halfRow = createRowSizeObject(gridSizes, gridWidth, 1/2);
export const thirdRow = createRowSizeObject(gridSizes, gridWidth, 1/3);
export const fourthRow = createRowSizeObject(gridSizes, gridWidth, 1/4);
