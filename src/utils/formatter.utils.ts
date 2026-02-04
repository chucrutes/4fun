type FormatToBrazillianNumber = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};
export class Formatters {
  static formatToBrazillianNumber = (
    value: number,
    options?: FormatToBrazillianNumber,
  ): string => {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: options?.minimumFractionDigits ?? 2,
      maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    }).format(value);
  };
}
