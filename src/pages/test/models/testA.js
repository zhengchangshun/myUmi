export default {
    namespace: 'testA',
    state: {
        text: 'AAA'
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {

            })
        }
    },

    effects: {},
    reducers: {}
}
