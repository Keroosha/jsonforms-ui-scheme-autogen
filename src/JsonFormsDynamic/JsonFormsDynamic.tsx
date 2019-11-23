import React from 'react';
import { JsonSchema } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { JsonFormsDynamicProps } from '../types';
import { uiSchemeStrategyGenerator } from '../Generator';

const emptySchema: JsonSchema = {
  type: 'object',
  properties: {},
  required: [],
};

export const JsonFormsDynamic = <T extends unknown>(props: JsonFormsDynamicProps<T>) => {
  const { onChange, data, schema } = props;

  const schemaTemplate = schema || emptySchema;
  const uiSchema = uiSchemeStrategyGenerator({ schemaTemplate });

  return (
    <>
      <JsonForms
        data={data}
        uischema={uiSchema}
        schema={schemaTemplate}
        renderers={materialRenderers}
        onChange={({ data: newData }) => onChange && onChange(newData)}
      />
    </>
  );
};
