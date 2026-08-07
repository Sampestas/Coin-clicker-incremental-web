const SUFFIXES = [
    "",    // Ones (10^0)
    "K",   // Thousands (10^3)
    "M",   // Millions (10^6)
    "B",   // Billions (10^9)
    "T",   // Trillions (10^12)
    "Qa",  // Quadrillions (10^15)
    "Qi",  // Quintillions (10^18)
    "Sx",  // Sextillions (10^21)
    "Sp",  // Septillions (10^24)
    "Oc",  // Octillions (10^27)
    "No",  // Nonillions (10^30)
    "Dc"   // Decillions (10^33)
];
/**
 * Formats large numbers into clean, human-readable game notations.
 * @param {number} value 
 * @param {number} precision 
 * @returns {string}
 */
export function formatNumber(value, precision = 2) {
    if (value === null || value === undefined || isNaN(value)) return "0";
    if (value === 0) return "0";

    const isNegative = value < 0;
    const absoluteValue = Math.abs(value);

    if (absoluteValue < 1000){
        const result = absoluteValue % 1 === 0 ? absoluteValue.toString() : absoluteValue.toFixed(precision);
        return isNegative ? `-${result}` : result;
    }

    const tier = Math.floor(Math.log10(absoluteValue) / 3);
    if (tier >= SUFFIXES.length){
        return value.toExponential(precision);
    }

    const suffix = SUFFIXES[tier];
    const scale = Math.pow(1000, tier);
    const scaledValue = absoluteValue / scale;

    let formattedNumber = scaledValue.toFixed(precision);
    if (formattedNumber.includes('.')) {
        formattedNumber = formattedNumber.replace(/\.?0+$/, "");
    }
    return `${isNegative ? "-" : ""}${formattedNumber}${suffix}`;
}