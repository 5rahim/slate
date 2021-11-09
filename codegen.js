module.exports = {
    schema: [
        {
            'https://slate.hasura.app/v1/graphql': {
                headers: {
                    'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
                    'content-type': 'application/json'
                },
            },
        },
    ],
    documents: ['./src/**/*.tsx', './src/**/*.ts'],
    overwrite: true,
    generates: {
        './src/generated/graphql.tsx': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                skipTypename: false,
                withHooks: true,
                withHOC: false,
                withComponent: false,
            },
        },
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
};
