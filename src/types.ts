import { JsonSchema } from '@jsonforms/core';

export type JsonFormsDynamicProps<T> = {
  data: T;
  schema?: JsonSchema;
  onChange?: (data: T) => void;
};

export type TestData = {
  testBool: boolean;
  test: number;
  testDeep: {
    lel: string;
  };
};

export type TestFormData = Partial<TestData>;

export type ObjectControlType = { scope: string; name: string; element: JsonSchema };

export type UiSchemeStrategyGeneratorProps = {
  path?: string;
  schemaTemplate: JsonSchema;
};
