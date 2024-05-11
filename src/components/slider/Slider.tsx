import { useEffect } from 'react';
import styles from './Slider.module.css';
import { api } from 'src/api/mockAPI';

const Slider = () => {
  useEffect(() => {
    const initilizeItems = async () => {
      const items = await api.getNextItems();
      console.log(items);
      return items;
    };
    initilizeItems();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>React Slider</h1>
    </div>
  );
};

export default Slider;
