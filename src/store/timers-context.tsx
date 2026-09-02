import { createContext, useContext, useReducer, type ReactNode } from "react";

export type Timer = {
    name: string;
    duration: number;
}

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
};

type TimersContextType = TimersState & {
    addTimer: (timerData: Timer) => void;
    startTimer: () => void;
    stopTimer: () => void;
};

type Action = AddingTimerAction | startStopTimerAction;

type AddingTimerAction = {
    type: 'ADD_TIMER';
    payload: Timer;
}

type startStopTimerAction = {
    type: 'START_TIMER' | 'STOP_TIMER';
}

const initialState: TimersState = {
    isRunning: false,
    timers: [],
};

export function useTimersContext() {
    const timerCtx = useContext(TimersContext);
    if (timerCtx === null) {
        throw new Error('useTimersContext must be used within a TimersContextProvider');
    }
    else return timerCtx;
}


const TimersContext = createContext<TimersContextType | null>(null);

type TimersContextProviderProps = {
    children: ReactNode;
};
function TimersReducer(state: TimersState, action: Action): TimersState {
    switch (action.type) {
        case 'ADD_TIMER': {
            return {
                ...state,
                timers: [...state.timers,
                {
                    name: action.payload.name,
                    duration: action.payload.duration
                }],
            };
        }
        case 'START_TIMER':
            {
                console.log('Button clicked')
                return { ...state, isRunning: true };
            } case 'STOP_TIMER':
            return { ...state, isRunning: false };
        default:
            return state;
    }
    // console.log('Adding timer', state)
}

export default function TimersContextProvider({ children }: TimersContextProviderProps) {

    const [timersState, dispatch] = useReducer(TimersReducer, initialState);
    const ctx: TimersContextType = {
        isRunning: timersState.isRunning,
        timers: timersState.timers,
        addTimer: (timerData: Timer) => {
            dispatch({ type: 'ADD_TIMER', payload: timerData });
        },
        startTimer: () => {
            dispatch({ type: 'START_TIMER' });
        },
        stopTimer: () => {
            dispatch({ type: 'STOP_TIMER' });
        },
    };

    return (
        <TimersContext.Provider value={ctx}>
            {children}
        </TimersContext.Provider>
    );
};
