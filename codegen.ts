import { CodegenConfig } from '@graphql-codegen/cli';

const codegen: CodegenConfig = {
  schema: './src/schema.graphql',
  generates: {
    './src/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        federation: true,
        useIndexSignature: true,
        contextType: './context#Context',
        mappers: {
          Cart: './models#CartModel',
          Product: './models#ProductModel',
          Price: './models#PriceModel',
        }
      }
    }
  },
}

export default codegen;