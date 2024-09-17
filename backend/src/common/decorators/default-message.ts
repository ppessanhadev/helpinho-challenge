/**
 *
 * @param value Incoming value
 * @param property Property name
 * @param expectedValue Expected value to be received
 * @returns string Default message for any validation
 */
export const defaultMessage = (value: any, property: string, expectedValue: string) => {
  switch (true) {
    case typeof value == 'string' && value.trim() == '':
      return `The field ${property} must be a ${expectedValue}. Received: blank string`;

    default:
      return `The field ${property} must be a ${expectedValue}. Received: ${value}`;
  }
};
