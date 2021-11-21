module.exports = {
    schema: [
        {
            'https://slate.hasura.app/v1/graphql': {
                headers: {
                    'x-hasura-admin-secret': "n4jRT12LJfD0ls3jS7G3i4qTdSMvDwt0fUsju5In8oEpCTAS0OJHpGibxHvOGNAV"
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
