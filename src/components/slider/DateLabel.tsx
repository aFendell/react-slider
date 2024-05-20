import styles from './Slider.module.css';

type Props = {
  date: Date;
  className?: string;
};

const DateLabel = ({ date, className }: Props) => {
  const f = new Intl.DateTimeFormat('en-IL', {
    dateStyle: 'short',
  });

  return date ? (
    <p className={`${styles['date-label']} ${className}`}>
      {f.format(new Date(date))}
    </p>
  ) : null;
};

export default DateLabel;
