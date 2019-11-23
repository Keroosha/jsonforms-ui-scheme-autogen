import { JsonSchema, Layout } from '@jsonforms/core';
import { objectControl, primitiveControl } from './Elements';
import { UiSchemeStrategyGeneratorProps } from '../types';

const PRIMITIVE_TYPES = ['string', 'integer', 'boolean'];

export const uiSchemeStrategyGenerator = ({
  path = '#/properties',
  schemaTemplate,
}: UiSchemeStrategyGeneratorProps): Layout => {
  const schema: Layout = { type: 'VerticalLayout', elements: [] };
  if (!schemaTemplate.properties) return schema;

  const { properties } = schemaTemplate;

  // TODO This should be not hardcoded, propagate as callback!
  const mapKeys = (key: string) => {
    const element: JsonSchema = properties[key];

    if (!element.type) throw new Error(`type not specified at ${key} parameter`);
    if (Array.isArray(element.type)) throw new Error('Array types not supported');

    if (PRIMITIVE_TYPES.includes(element.type)) return primitiveControl(`${path}/${key}`);
    if (element.type === 'object') return objectControl({ scope: `${path}/${key}/properties`, name: key, element });

    throw new Error(`Type: ${element.type} not supported`);
  };

  const elements = Object.keys(schemaTemplate.properties).map(mapKeys);

  schema.elements.push(...elements);
  return schema;
};
