import { DocumentNode, GraphQLSchema, parse } from 'graphql';
import getEnumerations from '@browserql/fpql/get/enumerations';
import getName from '@browserql/fpql/get/name';

interface Schema {
  source: string
  document: DocumentNode
  schema: GraphQLSchema
}

export async function handler({ document }: Schema) {
  const enums = getEnumerations(document);

  return `export const ENUM = {
    ${enums.map((e) => {
      const name = getName(e);
      return `${name}: [
        ${e.values?.map((val) => JSON.stringify(val.name.value))}
      ]`;
    })}
  }`
}
