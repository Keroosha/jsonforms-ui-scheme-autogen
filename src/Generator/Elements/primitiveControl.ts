import { ControlElement } from '@jsonforms/core';

export const primitiveControl = (scope: string): ControlElement => ({
  type: 'Control',
  scope,
});
