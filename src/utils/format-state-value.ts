import type { StateValue } from 'xstate';

function formatStateValue(value: StateValue): string {
  if (typeof value === 'string') return value;

  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value);

    if (entries.length > 0) {
      const [key, nestedValue] = entries[0];

      if (nestedValue !== undefined) {
        return `${key} → ${formatStateValue(nestedValue)}`;
      }

      return key;
    }
  }

  return String(value);
}

export default formatStateValue;
