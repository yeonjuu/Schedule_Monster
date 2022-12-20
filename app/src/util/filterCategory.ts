import { useSelector } from 'react-redux';

function filterCategory(categoryId: string, type: string): any {
  const value = useSelector((state: any) => {
    return categoryId === 'all'
      ? state[type]
      : state[type].filter((val: any): any => {
          return val.category == categoryId;
        });
  });
  return value;
}

export default filterCategory;
