import { DataItem } from 'src/mocks/handlers';

export const api = {
  getNextItems: async () => {
    const response = await fetch('/mocks/items');
    const items: DataItem[] = await response.json();
    return items;
  },
};
