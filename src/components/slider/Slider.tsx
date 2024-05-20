import styles from './Slider.module.css';
import useSlider from './useSlider';
import DateLabel from './DateLabel';
import SliderControls from './SliderControls';

const Slider = () => {
  const {
    items,
    index,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onPreviousItem,
    onNextItem,
    hasMoreItems,
  } = useSlider();

  return items && items.length ? (
    <section aria-label='Slider' className={styles.wrapper}>
      <DateLabel
        date={items[index]?.creationDate}
        className={styles['top-right']}
      />
      <div
        className={styles.container}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {items?.map((item, i) => (
          <img
            key={item.id}
            src={item.url}
            alt={`Image ${i + 1}`}
            aria-hidden={i !== index}
            className={styles.img}
            style={{
              translate: `${-100 * index}%`,
            }}
          />
        ))}
      </div>
      <DateLabel date={items[index]?.creationDate} />
      <SliderControls
        index={index}
        onPrevItem={onPreviousItem}
        onNextItem={onNextItem}
        itemsCount={items.length}
        hasMoreItems={hasMoreItems}
      />
    </section>
  ) : (
    <div>skeleton</div>
  );
};

export default Slider;
