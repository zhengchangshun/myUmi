export default {
    namespace: 'testB',
    state: {
        text: 'BBB'
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
