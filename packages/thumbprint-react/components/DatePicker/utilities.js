import some from 'lodash/some';
import castArray from 'lodash/castArray';
import map from 'lodash/map';

import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import endOfDay from 'date-fns/end_of_day';
import startOfDay from 'date-fns/start_of_day';
import parse from 'date-fns/parse';

// Throws an error `message` with a prefix showing that it comes from the DatePicker.
function throwError(message) {
    throw new Error(`TUI DatePicker: ${message}`);
}

// Returns true any of the given `dates` fall on a day before the day of `cutoff`.
export function hasAnyPastDays(dates, cutoff = new Date()) {
    return some(dates, date => isBefore(endOfDay(date), cutoff));
}

// Returns true any of the given `dates` fall on a day after the day of `cutoff`.
export function hasAnyFutureDays(dates, cutoff = new Date()) {
    return some(dates, date => isAfter(startOfDay(date), cutoff));
}

// Normalise the `value` prop to always be an array of dates.
export function normaliseValue(value) {
    return map(castArray(value), parse);
}

// Validate the `props` object and throw errors if there are any inconsistencies.
export function validateProps(props) {
    const days = normaliseValue(props.value);

    if (!props.allowMultiSelection && days.length > 1) {
        throwError('`allowMultiSelection` is `false` but multiple dates were provided');
    }

    const { before, after } = props.disabledDays || {};
    if (before && hasAnyPastDays(days, before)) {
        throwError(
            `Days before ${before} are disabled but one or more provided days fall before that.`,
        );
    }

    if (after && hasAnyFutureDays(days, after)) {
        throwError(
            `Days after ${after} are disabled but one or more provided days fall after that.`,
        );
    }
}
