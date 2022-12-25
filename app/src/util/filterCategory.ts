function filterCategory(categoryId: string, data: any): any {
  const value =
    categoryId === 'all'
      ? data
      : data.filter((val: any): any => {
          return val.categoryName === categoryId;
        });

  return value;
}

export default filterCategory;
