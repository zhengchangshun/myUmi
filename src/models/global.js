/**
 * 全局的model，umi会自动注册，可自行按照类型、模块分成多个文件
 *  production ：按需载入，development ：全量载入
 */

export default {
    namespace: 'global',
    state: {
        text:'this is global model'
    },
    reducers: {},
    effects: {},
};
