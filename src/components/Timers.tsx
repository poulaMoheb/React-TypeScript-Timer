import { useTimersContext } from "../store/timers-context";
import Timer from "./Timer";

export default function Timers() {
  const timerCtx = useTimersContext();




  return <ul>{timerCtx.timers && timerCtx.timers.map((timer) => (
    <li key={timer.name}>
      <Timer {...timer} />
    </li>
  ))
  }</ul>;
}
