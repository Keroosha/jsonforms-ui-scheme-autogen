import { ObjectControlType } from '../../types';
import { LabelElement, Layout } from '@jsonforms/core';
import { uiSchemeStrategyGenerator } from '../uiSchemeStrategyGenerator';

export const objectControl = ({ scope, name, element }: ObjectControlType): Layout => {
  const nestedElements = uiSchemeStrategyGenerator({ path: scope, schemaTemplate: element });
  const heading: LabelElement = { type: 'Label', text: name };
  return {
    type: 'VerticalLayout',
    elements: [heading, nestedElements],
  };
};
