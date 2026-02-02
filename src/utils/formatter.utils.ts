export class Formatters {
  static formatNumber(value: string) {
    const cleanedValue = value.replace(/[^\d,]/g, "");

    if (!cleanedValue || cleanedValue === ",") {
      return "";
    }

    const parts = cleanedValue.split(",");
    let integerPart = parts[0] || "";
    let decimalPart = parts[1] || "";

    if (decimalPart.length > 2) {
      decimalPart = decimalPart.substring(0, 2);
    }

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    let formattedValue = formattedInteger;
    if (parts.length > 1) {
      formattedValue += "," + decimalPart;
    }

    return formattedValue;
  }
}
