/**
 *   Project: react-tailwindcss-datepicker
 *   File: Meridiems
 *   Created by pennycodes on 06/07/2023.
 *   Copyright react-tailwindcss-datepicker
 */

import { useCallback } from 'react'

import useTimekeeperState from './hooks/useStateContext'
import { MERIDIEM } from './helpers/constants'
import classNames from "classnames";

export default function Meridiems() {
    const { time, updateMeridiem } = useTimekeeperState()

    const setAM = useCallback(() => {
        updateMeridiem(MERIDIEM.am)
    }, [updateMeridiem])
    const setPM = useCallback(() => {
        updateMeridiem(MERIDIEM.pm)
    }, [updateMeridiem])

    const isPM = time.hour >= 12

    return (
        <div className={classNames('text-left px-3 mt-2 relative z-10 flex items-center justify-between')}>
            <button
                type="button"
                className={classNames("bg-rose-600/20 font-bold text-rose-600 inline-block p-0 cursor-pointer rounded-full h-10 w-10 text-center transition duration-200 ease-out",
                    {
                        "!bg-rose-600 !text-white": !isPM
                    })}
                data-testid="meridiem_am"
                onClick={setAM}
            >
                AM
            </button>
            <button
                type="button"
                className={classNames("bg-rose-600/20 font-bold text-rose-600 inline-block p-0 cursor-pointer rounded-full h-10 w-10 transition duration-200 ease-out text-center",
                    {
                        "!bg-rose-600 !text-white": isPM
                    })}
                data-testid="meridiem_pm"
                onClick={setPM}
            >
                PM
            </button>
        </div>
    )
}
