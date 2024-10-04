export const formatCategoryName = (category) => {
    return category
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

export const convertToBullets = (input) => {
  const items = input.split("-").filter((item) => item.trim() !== "");
  return items.map((item) => `${item.trim()}`);
};