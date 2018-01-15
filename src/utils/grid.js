/* eslint-disable  import/prefer-default-export */

const gridWidth = 12;
const gridSizes = ['xs', 'sm', 'md', 'lg'];

export const flexboxGridColumnWidth = partition =>
  gridSizes.reduce((acc, size) => {
    acc[size] = gridWidth * partition;
    return acc;
  }, {});

/* eslint-enable  import/prefer-default-export */
