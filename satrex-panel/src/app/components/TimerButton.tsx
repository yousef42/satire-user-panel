import React, { useEffect, useMemo, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface TimerComponentProps {
    expiryTimestamp?: Date;
    timerSeconds?: number;
    buttonProps?: (ButtonProps & { title?: React.ReactNode });
}

const TimerButton: React.FC<TimerComponentProps> = ({
    buttonProps,
    timerSeconds = 20,
    expiryTimestamp,
}) => {
    const [timerDone, setTimerDone] = useState(true);
    const computedExpiryTimestamp = useMemo(() => {
        if (expiryTimestamp instanceof Date) return expiryTimestamp;
        const t = new Date();
        t.setSeconds(t.getSeconds() + timerSeconds);
        return t;
    }, [expiryTimestamp, timerSeconds]);

    const {
        seconds,
        minutes,
        pause,
        restart,
    } = useTimer({ expiryTimestamp: computedExpiryTimestamp, onExpire: () => setTimerDone(true) });

    useEffect(() => {
        pause();
    }, []);

    return (
        <div className="pr flex middle center timerButton">

            <Button
                {...(buttonProps || {})}
                disabled={(buttonProps?.disabled ?? false) || !timerDone}
                onClick={() => {
                    setTimerDone(false);
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + timerSeconds);
                    restart(time);
                    buttonProps?.onClick?.();
                }}
            >
                {
                    timerDone ? buttonProps?.title : (
                        <>
                            <span>{seconds}</span>
                            :
                            <span>{minutes}</span>
                        </>
                    )
                }
            </Button>
        </div>
    );
};

export default TimerButton;
