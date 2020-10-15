# mixin无侵入式的分页表格操作
> 项目中有很多列表页，代码都差不多，所以大部分项目都会选择封装，这里提供一种思路，局部混入，不影响全局

## 使用方式

###### 1.页面中引入组件

```
 import tableMixin from "@/mixin/tableMixin";

 //在组件中混入,根据页面场景传入自定义的名字，如Test：
 export default {
    mixins: [tableMixin('Test')]
 }
```

###### 2.引入自己项目中表格组件和分页组件(任意 UI 框架,以 elmenet 举例)

```
<el-table :data="Test.data">
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="title" label="标题" />
</el-table>

<el-pagination
    :page-size="Test.pageSize"
    :current-page.sync="Test.pageIndex"
    :total="Test.count"/>
```

###### 3.在 methods 中提供一个名为 getXXXData(params)的 Promise 方法，用于查询业务数据

> 注意方法名是根据传入的名称来的,params 是自动填充的参数，不用动

```
methods: {
    //如mixin传入Order则方法名为getOrderList
    getTestData(params) {
        return axios.get("/art/articlelist", {
            params,
        })
    }
}
```

###### 4.如需其它查询条件，则在 data 中定义对应名称的对象存放查询参数

```
data() {
    return {
      //会自动和混入中的Test合并
      Test: {
        sectionid: null,
      },
      types: [],
    };
  },
```

###### 5.混入的新方法

| 方法名称         | 作用                                     |
| ---------------- | ---------------------------------------- |
| getTestList      | 查询表格数据，如删除后调用               |
| refreshTestTable | 重载表格数据，如切换搜索条件后回到第一页 |

# 再次强调

> 相关名称都是根据 tableMixin('Test')这里传入的名称 Test 而生成的
> 不要生搬硬套，如果这都用不起来，就回家种地吧
> Q群 534937912 @Simba
