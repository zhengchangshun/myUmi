export default {
    namespace: 'example',
    state: {
        text: 'this is page model'
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
