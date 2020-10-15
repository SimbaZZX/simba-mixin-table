/**
 * 全局统一的带分页表格的混入
 * 使用方法：
 * import axios from "axios";
 * import tableMixin from "@/mixin/tableMixin";
 * 
 * 在组件中混入,传入自定义的名字：
 *  export default {
        mixins: [tableMixin('User')]
    }
 * 
    1.引入表格组件和分页组件，根据需要自行配置列
    2.必须在methods中提供一个名为getUserData(params)的方法，用于查询业务数据，如
     methods: {
        async getUserData(params) {
        let res = await axios.get("http://demo.simbajs.com:89/art/articlelist", {
            params,
        });
        return res;
        }
    }
    注意方法名是根据传入的名称来的，如传入Order则方法名为getOrderList

    3.表格和分页组件的参数都不能修改，如：table的数据源必须是User.data，分页必须是User.pageIndex等
    4.如需加入其它查询条件，则在data中定义User对象存放查询参数
    5.如果需要重新加载表格，必须调用this.refreshUserTable()/this.getUserList()
 */
export default function (name) {
    return {
        watch: {
            [`${name}.pageIndex`]() {
                this[`get${name}List`]()
            },
        },
        data() {
            return {
                [name]: {
                    data: [],
                    pageIndex: 1,
                    pageSize: 5,
                    count: 0,
                },
            };
        },
        created() {
            this[`get${name}List`]()
        },
        methods: {
            [`refresh${name}Table`]() {
                this[name].pageIndex = 1
                this[`get${name}List`]()
            },
            async [`get${name}List`]() {
                let { data: { list, count } } = await this[`get${name}Data`](this[name])
                this[name].data = list;
                this[name].count = count;
            },
        },
    }

}