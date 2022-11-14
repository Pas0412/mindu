<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.lessee" placeholder='按承租方搜索(若为空搜索" - ")' class="handle-input mr10"></el-input>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" :icon="Plus">新增</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column v-for="(item, index) in tableTitle" :prop="item.label" :label="item.value" :key="index"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchData } from '../../api';
import axios from "axios";

interface TableItem {
  id: number,
  owner: String,
  ownerAddress: String,
  flatsName: String,
  properties: String
  purpose: String,
  lessee: String,
  ownSurface: number,
  parkingNum: number,
  selfSurface: number,
  videSurface: number,
  rentSurface: number,
  rentRate: String,
  rentPrice: number,
  monthlyRent: number,
  incrementalRate: String,
  incrementalTime: String,
  afterMonthlyRent: number,
  incrementalTime2: String,
  afterMonthlyRent2: number,
  contractStart: String,
  contractClose: String,
  leaseTerm: number,
  payment: number,
  payee: String,
  situationCollection: String,
  contact: String,
  telephone: String,
  note: String
}

const tableTitle = [{
  label:"id", value: "序号"},{
  label:"owner", value:"产权人"},{
  label:"ownerAddress",value: "产权地址"}, {
  label: "flatsName", value: "楼盘名称"},{
  label:"properties",value: "性质"},{
  label: "purpose", value: "用途"},{
  label: "lessee", value: "承租方"},{
  label: "ownSurface", value: "产权面积"},{
  label: "parkingNum", value: "车位数"},{
  label: "selfSurface", value: "自用面积"},{
  label: "videSurface", value: "空置面积"},{
  label: "rentSurface", value: "租赁面积"},{
  label: "rentRate", value: "出租率"},{
  label: "rentPrice", value: "租赁价格"},{
  label: "monthlyRent", value: "月租金"},{
  label: "incrementalRate", value: "递增率"},{
  label: "incrementalTime", value: "年递增时间"}, {
  label: "afterMonthlyRent", value: "递增后月租金"},{
  label: "incrementalTime2", value: "年递增时间2"},{
  label: "afterMonthlyRent2", value: "递增后月租金2"}, {
  label: "contractStart", value: "合同起始"},{
  label: "contractClose", value: "合同到期"},{
  label: "leaseTerm", value: "租赁年限"},{
  label: "payment", value: "付款方式"},{
  label: "payee", value: "收款人"},{
  label: "situationCollection", value: "收租情况"},{
  label: "contact", value: "联系人"},{
  label: "telephone", value: "联系电话"},{
  label: "note", value: "备注"
}]

const query = reactive({
  lessee: '',
  pageIndex: 1,
  pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据

// 查询操作
const handleSearch = () => {
  query.pageIndex = 1;
  getData(query.lessee);
};

const getData = (lessee) => {
  axios({
    method: "get",
    url: "http://localhost:8084/httz/page",
    params: {page: query.pageIndex, pageSize: 10, lessee: lessee? lessee:null}
  }).then(res => {
    // console.log(res.data.data.records.length);
    tableData.value = res.data.data.records;
    pageTotal.value = res.data.data.total;
  })
};
getData();


// 分页导航
const handlePageChange = (val: number) => {
  query.pageIndex = val;
  getData();
};

// 删除操作
const handleDelete = (index: number) => {
  // 二次确认删除
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    type: 'warning'
  })
      .then(() => {
        ElMessage.success('删除成功');
        tableData.value.splice(index, 1);
      })
      .catch(() => {});
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
  name: '',
  address: ''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
  idx = index;
  form.name = row.name;
  form.address = row.address;
  editVisible.value = true;
};
const saveEdit = () => {
  editVisible.value = false;
  ElMessage.success(`修改第 ${idx + 1} 行成功`);
  tableData.value[idx].name = form.name;
  tableData.value[idx].address = form.address;
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>

