/**
 *   Project: react-tailwindcss-datepicker
 *   File: DoneButton
 *   Created by pennycodes on 06/07/2023.
 *   Copyright react-tailwindcss-datepicker
 */
import useConfig from './hooks/useConfigContext'
import useTimekeeperState from './hooks/useStateContext'
import classNames from "classnames";

export default function DoneButton() {
    const { onDoneClick, doneButton } = useConfig()
    const { getComposedTime } = useTimekeeperState()

    if (doneButton) {
        return doneButton(getComposedTime())
    }

    if (onDoneClick) {
        return (
            <span
                onClick={e => onDoneClick(getComposedTime(), e)}
                className={classNames('bg-slate-500 block text-rose-600 uppercase border-t border-gray-700 text-center cursor-pointer py-6 tracking-wide font-semibold')}
                data-testid="done-button"
            >
				Done
			</span>
        )
    }
    return null
}
