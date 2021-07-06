// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @ NB: DEPRECATED: КОМПОНЕНТ С ЗАПРЕДЕЛЬНО ВЫСОКИМ "ТЕХНИЧЕСКИМ ДОЛГОМ"            @
// @ Это рефакторинг версии кода, написанного первоначальной командой разработчиков. @
// @ Ни при каких условиях не использовать подходы из этого компонента               @
// @ в других частях системы. Иначе будет очень больно сопровождать.                 @
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import values from 'lodash/values';
import forEach from 'lodash/forEach';
import compact from 'lodash/compact';
import upperFirst from 'lodash/upperFirst';
import trimStart from 'lodash/trimStart';
import replace from 'lodash/replace';

const regDuplicate = /(.)\1\1/;
const SPACE_BAR = ' ';
const HYPHEN = '-';

export const validateFullName = (fields) => {
    const result = {
        firstSymbolFirstName: false,
        firstSymbolLastName: false,

        moreOneSymbolFirstName: false,
        moreOneSymbolLastName: false,

        otherSymbolsFirstName: false,
        otherSymbolsLastName: false,

        threeSymbolsFirstName: false,
        threeSymbolsLastName: false,

        countSymbols: false,
        notEmpty: false,
        notDuplicate: false,
        notHyphen: false,
    };

    const errorMessages = {};
    let text = fields.fullName || '';
    text = text.toLowerCase();
    text = replace(text, '  ', ' ');
    const split = text.split(SPACE_BAR);

    const checkDuplicate = (value) => regDuplicate.test(value);
    const checkFirstThreeSymbols = (constant) =>
        checkDuplicate(constant.toUpperCase());
    const checkFirstSymbol = (firstSymbol) =>
        firstSymbol.toUpperCase() === firstSymbol;
    const checkOtherSymbols = (otherSymbols) =>
        otherSymbols.toLowerCase() === otherSymbols;
    const fullNameTrim = (fullName) => {
        const fullNameSplit = fullName.split(SPACE_BAR);

        return fullNameSplit.length >= 2 &&
        fullNameSplit[fullNameSplit.length - 1] !== ''
            ? compact(fullNameSplit)
            : fullNameSplit;
    };

    if (split.length >= 2) {
        let [lastName, firstName, midName = ''] = split;
        lastName = trimStart(upperFirst(lastName));
        firstName = trimStart(upperFirst(firstName));

        const firstSymbolFirstName = firstName.slice(0, 1);
        const firstSymbolLastName = lastName.slice(0, 1);
        const firstSymbolMidName = midName.slice(0, 1) || '';

        const threeSymbolsFirstName = firstName.slice(0, 3);
        const threeSymbolsLastName = lastName.slice(0, 3);

        const otherSymbolsFirstName = firstName.slice(1);
        const otherSymbolsLastName = lastName.slice(1);

        result.notDuplicate =
            !checkDuplicate(firstName) && !checkDuplicate(lastName);

        result.notEmpty = !isEmpty(text);

        result.moreOneSymbolFirstName = firstName.length > 1;
        result.moreOneSymbolLastName = lastName.length > 1;

        result.threeSymbolsFirstName = !checkFirstThreeSymbols(
            threeSymbolsFirstName,
        );
        result.threeSymbolsLastName = !checkFirstThreeSymbols(threeSymbolsLastName);

        result.firstSymbolFirstName = checkFirstSymbol(firstSymbolFirstName);
        result.firstSymbolLastName = checkFirstSymbol(firstSymbolLastName);

        result.otherSymbolsFirstName = checkOtherSymbols(otherSymbolsFirstName);
        result.otherSymbolsLastName = checkOtherSymbols(otherSymbolsLastName);

        result.countSymbols = text.length <= 77;

        result.notHyphen =
            firstSymbolFirstName !== HYPHEN &&
            firstSymbolLastName !== HYPHEN &&
            firstSymbolMidName !== HYPHEN;
    }

    if (!result.notHyphen) {
        errorMessages.firstSymbolNotBeAHyphen = 'firstSymbolNotBeAHyphen';
    }

    if (!result.firstSymbolFirstName) {
        errorMessages.firstSymbolFirstName = 'firstSymbolFirstName';
    }

    if (!result.firstSymbolLastName) {
        errorMessages.firstSymbolLastName = 'firstSymbolLastName';
    }

    if (!result.moreOneSymbolFirstName) {
        errorMessages.moreOneSymbolFirstName = 'moreOneSymbolFirstName';
    }

    if (!result.moreOneSymbolLastName) {
        errorMessages.moreOneSymbolLastName = 'moreOneSymbolLastName';
    }

    if (!result.otherSymbolsFirstName) {
        errorMessages.otherSymbolsFirstName = 'otherSymbolsFirstName';
    }

    if (!result.otherSymbolsLastName) {
        errorMessages.otherSymbolsLastName = 'otherSymbolsLastName';
    }

    if (!result.threeSymbolsFirstName) {
        errorMessages.threeSymbolsFirstName = 'threeSymbolsFirstName';
    }

    if (!result.threeSymbolsLastName) {
        errorMessages.threeSymbolsLastName = 'threeSymbolsLastName';
    }

    if (!result.countSymbols) {
        errorMessages.countSymbols = 'countSymbols';
    }

    if (!result.notEmpty) {
        errorMessages.notEmpty = 'notEmpty';
    }

    if (!result.notDuplicate) {
        errorMessages.notDuplicate = 'notDuplicate';
    }

    return {
        active: isEmpty(filter(values(result), value => !value)),
        errorMessages,
        replaceToUpperCaseFirstSymbol: () => {
            const fullName = fullNameTrim(text);

            forEach([0, 1, 2], (value, index) => {
                if (fullName[index]) {
                    const upperFirstStr = upperFirst(fullName[index]);
                    fullName[index] = upperFirstStr;
                }
            });

            return fullName.slice(0, 3).join(SPACE_BAR);
        },
    };
};
