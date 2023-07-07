/**
 *   Project: react-tailwindcss-datepicker
 *   File: TopBar
 *   Created by pennycodes on 06/07/2023.
 *   Copyright react-tailwindcss-datepicker
 */
import { useState } from 'react'

import TimeDropdown from './TimeDropdown'
import useTimekeeperState from './hooks/useStateContext'
import useConfig from './hooks/useConfigContext'
import { MODE, MERIDIEM } from './helpers/constants'
import { isHourMode } from './helpers/utils'
import classNames from "classnames";

export default function TopBar() {
    const { hour24Mode } = useConfig()
    const { mode, time, updateMeridiem, setMode } = useTimekeeperState()
    const [open, setOpen] = useState<null | 'hour' | 'minute'>(null)

    // time clicks
    function timeClick(type: 'minute' | 'hour') {
        const current = mode === MODE.MINUTES ? 'minute' : 'hour'
        if (type === current) {
            setOpen(current)
        } else {
            const m = mode === MODE.MINUTES ? MODE.HOURS_24 : MODE.MINUTES
            setMode(m)
            setOpen(null);
        }
    }

    // double ternary nastiness
    const hour = hour24Mode ? time.hour : time.hour % 12 === 0 ? 12 : time.hour % 12

    // meridiem
    const meridiem = time.hour >= 12 ? MERIDIEM.pm : MERIDIEM.am
    function toggleMeridiem() {
        const m = meridiem === MERIDIEM.am ? MERIDIEM.pm : MERIDIEM.am
        updateMeridiem(m)
    }

    const isHour = isHourMode(mode)
    const formattedMinute = ('0' + time.minute).slice(-2)

    const closeDropdown = () => setOpen(null)

    return (
        <div
            className={classNames("bg-slate-800 px-4 py-3 rounded-t-md relative",
                {
                    "flex justify-center": hour24Mode
                } )}
            data-testid="topbar"
        >

            <div
                className={classNames(" text-right relative inline-block w-12", {
                    "ml-5": !hour24Mode
                })}
            >
				<span
                    onClick={() => timeClick('hour')}
                    data-testid="topbar_hour"
                    data-timedropdown={true}
                    className={classNames("text-gray-400 inline-block text-5xl cursor-pointer select-none", {
                        "!text-rose-600 animate-popInOut": isHour
                    })}
                >
					{hour}
				</span>
                {open === 'hour' && <TimeDropdown close={closeDropdown} />}
            </div>

            <span className={classNames("text-gray-400 font-medium inline-block text-5xl align-baseline mx-5")}>
              :
            </span>

            {/* minute */}
            <div className={classNames("relative inline-block", {
                "w-12": hour24Mode
            })}>

				<span
                    onClick={() => timeClick('minute')}
                    data-testid="topbar_minute"
                    data-timedropdown={true}
                    className={classNames("text-gray-400 inline-block text-5xl cursor-pointer select-none", {
                        "!text-rose-600 animate-popInOut": !isHour
                    })}
                >
					{formattedMinute}
				</span>
                {open === 'minute' && <TimeDropdown close={closeDropdown} />}
            </div>

            {/* meridiem */}
            {!hour24Mode && (
                <button
                    name="meridiem"
                    type="button"
                    onClick={toggleMeridiem}
                    data-testid="topbar_meridiem"
                    className="text-gray-400 inline-block text-sm uppercase ml-2 py-2 px-2 align-baseline"
                >
                    {meridiem}
                </button>
            )}
        </div>
    )
}
