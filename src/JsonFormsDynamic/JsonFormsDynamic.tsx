import React from 'react';
import { JsonSchema } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import { JsonFormsDynamicProps, JsonFormsDynamicState } from '../types';
import { uiSchemeStrategyGenerator } from '../Generator';

const emptySchema: JsonSchema = {
  type: 'object',
  properties: {},
  required: [],
};

export class JsonFormsDynamic<T extends unknown> extends React.Component<
  JsonFormsDynamicProps<T>,
  JsonFormsDynamicState<T>
> {
  constructor(props: JsonFormsDynamicProps<T>) {
    super(props);
    const { schema, data } = this.props;
    this.state = { data, schema: schema || emptySchema };
  }

  render() {
    const { onChange, data, schema } = this.props;

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
  }
}
