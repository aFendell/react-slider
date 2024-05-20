import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Slider.module.css';

type Props = {
  index: number;
  onPrevItem: VoidFunction;
  onNextItem: VoidFunction;
  itemsCount: number;
  hasMoreItems: boolean;
};

const SliderControls = ({
  index,
  onPrevItem,
  onNextItem,
  itemsCount,
  hasMoreItems,
}: Props) => {
  return (
    <>
      <button
        className={`${styles['slider-btn']} ${styles['left-btn']}`}
        onClick={onPrevItem}
        aria-label='View previous image'
        disabled={index === 0}
      >
        <ChevronLeft aria-hidden />
      </button>
      <button
        className={`${styles['slider-btn']} ${styles['right-btn']}`}
        onClick={onNextItem}
        aria-label='View next image'
        disabled={index === itemsCount - 1 && !hasMoreItems}
      >
        <ChevronRight aria-hidden />
      </button>
    </>
  );
};

export default SliderControls;
