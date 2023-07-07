import dayjs from "dayjs";
import React, { useCallback, useContext } from "react";

import { DATE_FORMAT } from "../constants";
import DatepickerContext from "../contexts/DatepickerContext";

import { PrimaryButton, SecondaryButton } from "./utils";

const Footer: React.FC = () => {
    // Contexts
    const { hideDatepicker, period, viewMode, changeDatepickerValue, configs, classNames } =
        useContext(DatepickerContext);

    // Functions
    const getClassName = useCallback(() => {
        if (typeof classNames !== "undefined" && typeof classNames?.footer === "function") {
            return classNames.footer();
        }

        return "flex items-center justify-end pb-2.5 pt-3 border-t border-gray-300 dark:border-gray-700";
    }, [classNames]);

    return (
        <div className={getClassName()}>
            <div className="w-full md:w-auto flex items-center justify-center space-x-3">
                <SecondaryButton
                    onClick={() => {
                        hideDatepicker();
                    }}
                >
                    <>{configs?.footer?.cancel ? configs.footer.cancel : "Cancel"}</>
                </SecondaryButton>
                <PrimaryButton
                    onClick={() => {
                        if (viewMode === "time") {
                            changeDatepickerValue({
                                startDate: null,
                                endDate: null,
                                time: period.time
                            });
                            hideDatepicker();
                        }
                        else if (viewMode === "datetime") {
                            if ((period.start && period.time)) {
                                changeDatepickerValue({
                                    startDate: dayjs(period.start).format(DATE_FORMAT),
                                    endDate: dayjs(period.start).format(DATE_FORMAT),
                                    time: period.time
                                });
                                hideDatepicker();
                            }
                        }
                        else {
                            if ((period.start && period.end)) {
                                changeDatepickerValue({
                                    startDate: dayjs(period.start).format(DATE_FORMAT),
                                    endDate: dayjs(period.end).format(DATE_FORMAT),
                                    time: period.time
                                });
                                hideDatepicker();
                            }
                        }

                    }}
                    disabled={!(period.start && period.end) && !period.time}
                >
                    <>{configs?.footer?.apply ? configs.footer.apply : "Apply"}</>
                </PrimaryButton>
            </div>
        </div>
    );
};

export default Footer;
