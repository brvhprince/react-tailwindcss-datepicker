/**
 *   Project: react-tailwindcss-datepicker
 *   File: TimeKeeper
 *   Created by pennycodes on 06/07/2023.
 *   Copyright react-tailwindcss-datepicker
 */

import TopBar from './TopBar'
import ClockWrapper from './ClockWrapper'
import DoneButton from './DoneButton'

export default function TimeKeeper() {

    return (
        <>

            <div className={"antialiased w-full md:w-[296px] md:min-w-[296px] bg-slate-800 inline-block relative select-none"} >
                <TopBar />
                <ClockWrapper />
                <DoneButton />
            </div>
        </>
    )
}
