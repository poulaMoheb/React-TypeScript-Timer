import { useEffect, useRef, useState } from 'react';
import { useTimersContext, type Timer as TimerProps } from '../store/timers-context.tsx';
import Container from './UI/Container.tsx';


export default function Timer({ name, duration }: TimerProps) {
  const { isRunning } = useTimersContext();
  const [progress, setProgress] = useState(duration * 1000);
  const interval = useRef<number | null>(null);
  if (progress <= 0 && interval.current) {
    clearInterval(interval.current);
  }
  useEffect(() => {
    let timer: number;

    if (isRunning) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            return 0;
          }
          return prev - 50
        });
      }, 50);
      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current);
    }

    // Clean up the interval when the component unmounts or when isRunning changes
    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const formattedProgress = (progress / 1000).toFixed(2);
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p><progress max={duration * 1000} value={progress} /></p>
      <p>{formattedProgress}</p>
    </Container>
  );
}
