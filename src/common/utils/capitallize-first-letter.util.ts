export const capitallizeFirstLetter = ([first, ...rest] = '') =>
  first.toLocaleUpperCase() + rest.join('');
