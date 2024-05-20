import { DataItem } from './types';

export const api = {
  getNextItems: async () => {
    const response = await fetch(`/api/mocks/items`);
    const items: DataItem[] = await response.json();
    return items;
  },
};
