// === Strings ===

export function capitalize(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats the value in euros to an appropriate string like '€Value'
 * @param value the value in euros
 * @param form 'n' (normal), 'k' (thousands), 'a' (auto-scale: k, M, B)
 * @param fractionDigits how many fraction digits to keep for Normal/Thousands mode (defaults to 2)
 * @param autoDigits how many total digits to keep for Auto mode (defaults to 3)
 * @returns the new formatted string if value is not null, else returns empty string ''
 */
export function formatEuros(
  value: number | null,
  form: 'n' | 'k' | 'a' = 'n',
  fractionDigits: number = 2,
  autoDigits: number = 3
): string {
  if (value === null) return '';

  const standardOptions = {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  };

  const THOUSAND = 1_000;
  const MILLION = 1_000_000;
  const BILLION = 1_000_000_000;

  switch (form) {
    case 'a': {
      const absValue = Math.abs(value);

      const autoOptions = {
        maximumSignificantDigits: autoDigits,
      };

      if (absValue >= BILLION) {
        return `€${(value / BILLION).toLocaleString(undefined, autoOptions)}B`;
      } else if (absValue >= MILLION) {
        return `€${(value / MILLION).toLocaleString(undefined, autoOptions)}M`;
      } else if (absValue >= THOUSAND) {
        return `€${(value / THOUSAND).toLocaleString(undefined, autoOptions)}k`;
      } else {
        return `€${value.toLocaleString(undefined, autoOptions)}`;
      }
    }

    case 'k':
      return `€${(value / THOUSAND).toLocaleString(
        undefined,
        standardOptions
      )}k`;

    case 'n':
      return `€${value.toLocaleString(undefined, standardOptions)}`;
  }
}

// === Math ===

export function mean(values: number[]): number {
  if (values.length === 0) return 0;

  const sum = values.reduce((res, v) => res + v, 0);
  return sum / values.length;
}

export type Coordinates = {
  x: number;
  y: number;
};

export function regression(values: Coordinates[]): Coordinates[] {
  const n = values.length;
  if (n === 0) return [];

  // 1. Calculate Sums
  const sumX = values.reduce((acc, p) => acc + p.x, 0);
  const sumY = values.reduce((acc, p) => acc + p.y, 0);
  const sumXY = values.reduce((acc, p) => acc + p.x * p.y, 0);
  const sumXX = values.reduce((acc, p) => acc + p.x * p.x, 0);

  // 2. Calculate Slope and Intercept
  const denominator = n * sumXX - sumX * sumX;

  // Prevent division by zero (vertical line edge case)
  if (denominator === 0) return values;

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  // 3. Generate Trend Points
  return values.map((p) => ({
    x: p.x,
    y: slope * p.x + intercept,
  }));
}
