import { useSelector } from 'react-redux';

function filterCategory(categoryId: string, type: string, data: any): any {
  const value =
    categoryId === 'all'
      ? data
      : data.filter((val: any): any => {
          return val.category == categoryId;
        });

  return value;
}

export default filterCategory;
