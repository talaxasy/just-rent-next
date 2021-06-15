export const convertToMoneyFormat = (n: number): string => {
    return parseFloat(n.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
}