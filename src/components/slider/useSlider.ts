import * as React from 'react';
import { api } from 'src/api/mockAPI';
import { DataItem } from 'src/api/types';

const NUMBER_OF_ITEMS = 10;
const SLIDE_THRESHOLD = 50;

const useSlider = () => {
  const [items, setItems] = React.useState<DataItem[]>([]);
  const [index, setIndex] = React.useState(0);
  const [hasMoreItems, setHasMoreItems] = React.useState(false);
  const hasLoaded = React.useRef(false);
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);
  const [touchEndX, setTouchEndX] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (hasLoaded.current) return;

    const initilizeItems = async () => {
      const data = await api.getNextItems();
      if (!data) return;

      setItems((prevItems) => [...prevItems, ...data]);
      setHasMoreItems(true);
      hasLoaded.current = true;
    };

    initilizeItems();
  }, [hasLoaded]);

  const onPreviousItem = () => {
    if (index === 0) return;
    setIndex((prevIndex) => prevIndex - 1);
  };

  const onNextItem = async () => {
    if (index === items.length - 1) {
      setHasMoreItems(false);
      return;
    }

    if (index === Math.floor(items.length / 2) && hasMoreItems) {
      const nextItems = await api.getNextItems();
      if (!nextItems || nextItems.length < NUMBER_OF_ITEMS)
        setHasMoreItems(false);
      setItems((prevItems) =>
        nextItems ? [...prevItems, ...nextItems] : [...prevItems]
      );
    }

    setIndex((prevIndex) => prevIndex + 1);
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchEndX || !touchStartX) return;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > SLIDE_THRESHOLD) {
      diff < 0 ? onNextItem() : onPreviousItem();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const onDotClick = async (idx: number) => {
    if (idx > Math.floor(items.length / 2) && hasMoreItems) {
      const nextItems = await api.getNextItems();
      if (!nextItems || nextItems.length < NUMBER_OF_ITEMS)
        setHasMoreItems(false);
      setItems((prevItems) =>
        nextItems ? [...prevItems, ...nextItems] : [...prevItems]
      );
    }

    setIndex(idx);
  };

  return {
    items,
    index,
    hasMoreItems,
    onPreviousItem,
    onNextItem,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onDotClick,
  };
};

export default useSlider;
