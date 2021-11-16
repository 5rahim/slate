module.exports = {
    schema: [
        {
            'https://slate.hasura.app/v1/graphql': {
                headers: {
                    'x-hasura-admin-secret': "X"
                },
            },
        },
    ],
    overwrite: true,
    documents: ['./src/graphql/**/*.tsx', './src/graphql/**/*.ts'],
    generates: {
        './src/generated/graphql.tsx': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                skipTypename: false,
                withHooks: false,
                withHOC: false,
                withComponent: false,
            },
        },
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
};
