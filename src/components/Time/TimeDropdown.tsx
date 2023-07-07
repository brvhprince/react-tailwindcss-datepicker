/**
 *   Project: react-tailwindcss-datepicker
 *   File: TimeDropdown
 *   Created by pennycodes on 06/07/2023.
 *   Copyright react-tailwindcss-datepicker
 */

import { useCallback, useEffect, useRef, MutableRefObject, useMemo } from 'react'

import useConfig from './hooks/useConfigContext'
import { getScrollBarWidth } from './helpers/dom'
import {getNormalizedTimeValue, isMinuteMode} from './helpers/utils'
import { ElementRef } from './helpers/types'
import { CLOCK_VALUES, MODE } from './helpers/constants'
import useTimekeeperState from './hooks/useStateContext'
import classNames from "classnames";

interface Props {
    close: () => void
}


type ElementLiRef = MutableRefObject<HTMLLIElement | null>

export default function TimeDropdown({ close }: Props) {
    const { hour24Mode } = useConfig()
    const { updateTimeValue, mode, time, meridiem, disabledTimeRangeValidator } =
        useTimekeeperState()

    const container: ElementRef = useRef(null)
    const selectedOption: ElementLiRef = useRef(null)

    const options = useMemo(() => {
        const o = CLOCK_VALUES[mode].dropdown

        let validator: (value: string, i: number) => boolean = () => true
        if (disabledTimeRangeValidator) {
            if (mode === MODE.HOURS_12) {
                if (meridiem === 'am') {
                    validator = (_, i) =>
                        disabledTimeRangeValidator.validateHour((i + 1) % 12)
                } else {
                    validator = (_, i) => {
                        // account for last number (12) which should be first (noon, 1pm, ...) in 24h format
                        const num = i === 11 ? 12 : i + 13
                        return disabledTimeRangeValidator.validateHour(num)
                    }
                }
            } else if (mode === MODE.HOURS_24) {
                validator = (_, i) =>
                    disabledTimeRangeValidator.validateHour((i + 1) % 24)
            } else if (mode === MODE.MINUTES) {
                validator = v =>
                    disabledTimeRangeValidator.validateMinute(time.hour, parseInt(v, 10))
            }
        }
        return o.map((value, i) => ({
            value,
            enabled: validator(value, i),
        }))
    }, [mode, disabledTimeRangeValidator, meridiem, time.hour])

    const selected = getNormalizedTimeValue(mode, time).toString()

    function disableBodyScroll() {
        document.documentElement.classList.add('overflow-hidden')
    }
    function enableBodyScroll() {
        document.documentElement.classList.remove('overflow-hidden')
    }

    const elsewhereClick = useCallback(
        (e: MouseEvent) => {
            if (!container.current || !e.target) {
                return
            }
            // @ts-ignore
            if (!e.target.dataset?.timedropdown) {
                close()
            }
            // if (!container.current.contains(e.target as Node)) {
            //     // close()
            // }
        },
        [close],
    )

    useEffect(() => {


        // initial scroll in list
        if (selectedOption.current && container.current) {
            container.current.scrollTop = selectedOption.current.offsetTop
        }

        // listener to close if click outside dropdown
        document.addEventListener('click', elsewhereClick, false)

        return () => {
            document.removeEventListener('click', elsewhereClick, false)
            enableBodyScroll()
        }
    }, [elsewhereClick])

    // select a value
    function select(val: string, enabled: boolean) {
        if (!enabled) return

        let parsed = parseInt(val, 10)
        if (mode === MODE.HOURS_12 && parsed === 12) {
            parsed = 0
        }
        updateTimeValue(parsed, { type: 'dropdown' })
        close()
    }

    return (
        <div
            className={classNames("absolute inline-block bg-slate-600 border border-gray-700 rounded drop-shadow top-14 py-2 z-20 h-72 w-fit overflow-x-hidden overflow-y-auto  opacity-0 animate-fadeIn",
                {
                    "left-1/2 transform -translate-x-1/2": hour24Mode,
                    "-right-3": isMinuteMode(mode),
                    "-right-5": !isMinuteMode(mode),
                })}
            ref={container}
            onMouseEnter={disableBodyScroll}
            onMouseLeave={enableBodyScroll}
            data-testid="time-dropdown"
        >
            <ul className="relative list-none p-0 m-0">
                {options.map(({ value, enabled }) => {
                    const isSelected = selected === value
                    return (
                        <li
                            ref={el => (isSelected ? (selectedOption.current = el) : '')}
                            className={
                            classNames("bg-transparent px-7 py-2 text-base", { "text-enabled-color": enabled, "text-disabled-color": !enabled }, { "cursor-pointer": enabled, "cursor-not-allowed": !enabled }, { "hover:bg-dropdown-hover-bg": enabled && isSelected }, selected && isSelected)}
                            key={value}
                            onClick={() => select(value, enabled)}
                            data-testid="time-dropdown_number"
                        >
                            {value}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
