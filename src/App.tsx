import React, { useCallback, useState } from 'react';
import { JsonSchema } from '@jsonforms/core';
import { JsonFormsDynamic } from './JsonFormsDynamic';
import { TestFormData } from './types';
import { Button } from '@material-ui/core';

const testSchema: JsonSchema = {
  type: 'object',
  properties: {
    testBool: {
      type: 'boolean',
    },
    test: {
      type: 'integer',
    },
    testDeep: {
      type: 'object',
      properties: {
        lel: {
          type: 'string',
        },
      },
    },
  },
  required: [],
};

const App: React.FC = () => {
  const [data, setData] = useState<TestFormData>({});
  const [schema, setSchema] = useState<JsonSchema>(testSchema);
  const [counter, setCounter] = useState(0);

  const addField = useCallback(() => {
    const oldSchema: JsonSchema = JSON.parse(JSON.stringify(schema));
    if (!oldSchema.properties) {
      return;
    }
    oldSchema.properties[`test${counter}`] = { type: 'string' };
    setCounter(counter + 1);
    setSchema(oldSchema);
  }, [setSchema, schema, counter, setCounter]);

  return (
    <div className='App'>
      <Button onClick={addField}>Add field</Button>
      <JsonFormsDynamic<TestFormData> data={data} schema={schema} onChange={setData} />
    </div>
  );
};

export default App;
