import { http, HttpResponse } from 'msw';
import images from './ItemsX10.json';
import { DataItem } from 'src/api/types';

const NUMBER_OF_ITEMS = 3;

function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const getMockData = () => {
  const dataItems: DataItem[] = images.map((img) => ({
    ...img,
    creationDate: getRandomDate(new Date(2020, 0, 1), new Date()),
  }));

  dataItems.sort((a, b) => a.creationDate.getTime() - b.creationDate.getTime());

  return dataItems;
};

const mockData = getMockData();

const generateData = () => {
  let start = 0;

  return (numberOfItems: number) => {
    if (start >= mockData.length) return null;
    const end = Math.min(start + numberOfItems, mockData.length);
    const dataItems = mockData.slice(start, end);
    start = end;
    return dataItems;
  };
};

const getNextDataItems = generateData();

export const handlers = [
  http.get('/api/mocks/items', () => {
    const data = getNextDataItems(NUMBER_OF_ITEMS);
    return HttpResponse.json(data);
  }),
];
