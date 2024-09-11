<template>
  <div>
    <button @click="exportToExcel">导出到Excel</button>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      // 示例的表头信息
      columns: [
        { title: 'ID' },
        { title: '点名称' },
        { title: '点别名' },
        { title: '机柜ID' },
        { title: '子系统ID' },
        { title: '是否写入' },
        { title: '地址' },
        { title: '类型' },
        { title: '信号类型' },
        { title: '点值' },
        { title: '消息' },
        { title: '创建时间' },
        { title: '子系统名称' },
        { title: '最后恢复时间' },
        { title: '操作员' },
        { title: '操作员ID' },
      ],
      // 示例的数据
      dataSource: [
        {
          "id": 47,
          "pointName": "plc23a_38",
          "pointNickName": "电解质涂布",
          "cabinetId": 10,
          "subsystemId": 151,
          "ifWrite": 0,
          "addr": "4.0",
          "type": 3,
          "signalType": 1,
          "pointValue": null,
          "message": "主机报警",
          "createTime": "2024-08-22 16:26:39",
          "subsystemName": "涂布机-电解质涂布",
          "lastRecoveryTime": null,
          "operator": null,
          "operatorId": null
        },
        {
          "id": 1385,
          "pointName": "plc22_105",
          "pointNickName": "阴极搅拌车间1H2S",
          "cabinetId": 1,
          "subsystemId": 127,
          "ifWrite": 1,
          "addr": "7.4",
          "type": 3,
          "signalType": 1,
          "pointValue": null,
          "message": "高报警",
          "createTime": "2024-08-22 16:26:37",
          "subsystemName": "消防系统",
          "lastRecoveryTime": null,
          "operator": null,
          "operatorId": null
        },
        {
          "id": 1406,
          "pointName": "plc22_126",
          "pointNickName": "极片电芯O2高报警值设定",
          "cabinetId": 1,
          "subsystemId": 127,
          "ifWrite": 1,
          "addr": "7.3",
          "type": 1,
          "signalType": 2,
          "pointValue": null,
          "message": "阈值报警",
          "createTime": "2024-08-22 16:26:36",
          "subsystemName": "消防系统",
          "lastRecoveryTime": null,
          "operator": null,
          "operatorId": null
        },
        {
          "id": 491,
          "pointName": "plc25a_42",
          "pointNickName": "真空封装",
          "cabinetId": 16,
          "subsystemId": 120,
          "ifWrite": 0,
          "addr": "5.0",
          "type": 3,
          "signalType": 1,
          "pointValue": null,
          "message": "主机报警",
          "createTime": "2024-08-22 16:26:36",
          "subsystemName": "真空包装机",
          "lastRecoveryTime": null,
          "operator": null,
          "operatorId": null
        },
        {
          "id": 1419,
          "pointName": "plc22_139",
          "pointNickName": "阴极清洗房O2低报警值设定",
          "cabinetId": 1,
          "subsystemId": 127,
          "ifWrite": 1,
          "addr": "7.82",
          "type": 1,
          "signalType": 2,
          "pointValue": null,
          "message": "阈值报警",
          "createTime": "2024-08-22 16:26:34",
          "subsystemName": "消防系统",
          "lastRecoveryTime": null,
          "operator": null,
          "operatorId": null
        },
        {
          "id": 170,
          "pointName": "plc24a_22",
          "pointNickName": "阴极涂布",
          "cabinetId": 13,
          "subsystemId": 153,
          "ifWrite": 0,
          "addr": "2.0",
          "type": 3,
          "signalType": 1,
          "pointValue": null,
          "message": "主机报警",
          "createTime": "2024-08-22 16:26:34",
          "subsystemName": "涂布机-阴极涂布机",
          "lastRecoveryTime": null,
          "operator": null,
          "operatorId": null
        },
        {
          "id": 1411,
          "pointName": "plc22_131",
          "pointNickName": "带电电芯O2低报警值设定",
          "cabinetId": 1,
          "subsystemId": 127,
          "ifWrite": 1,
          "addr": "7.5",
          "type": 1,
          "signalType": 2,
          "pointValue": null,
          "message": "阈值报警",
          "createTime": "2024-08-22 16:26:32",
          "subsystemName": "消防系统",
          "lastRecoveryTime": null,
          "operator": null,
          "operatorId": null
        },
        {
          "id": 47,
          "pointName": "plc23a_38",
          "pointNickName": "电解质涂布主机报警",
          "cabinetId": 10,
          "subsystemId": 151,
          "ifWrite": 0,
          "addr": "4.0",
          "type": 3,
          "signalType": 1,
          "pointValue": null,
          "message": "主机报警",
          "createTime": "2024-08-22 16:23:28",
          "subsystemName": "涂布机-电解质涂布",
          "lastRecoveryTime": null,
          "operator": "超级管理员",
          "operatorId": 1
        },
        {
          "id": 1385,
          "pointName": "plc22_105",
          "pointNickName": "阴极搅拌车间1H2S高报警",
          "cabinetId": 1,
          "subsystemId": 127,
          "ifWrite": 1,
          "addr": "7.4",
          "type": 3,
          "signalType": 1,
          "pointValue": null,
          "message": "高报警",
          "createTime": "2024-08-22 16:23:28",
          "subsystemName": "消防系统",
          "lastRecoveryTime": null,
          "operator": "超级管理员",
          "operatorId": 1
        },
        {
          "id": 491,
          "pointName": "plc25a_42",
          "pointNickName": "真空封装主机报警",
          "cabinetId": 16,
          "subsystemId": 120,
          "ifWrite": 0,
          "addr": "5.0",
          "type": 3,
          "signalType": 1,
          "pointValue": null,
          "message": "主机报警",
          "createTime": "2024-08-22 16:23:27",
          "subsystemName": "真空包装机",
          "lastRecoveryTime": null,
          "operator": "超级管理员",
          "operatorId": 1
        }

        // 其他数据对象
      ]
    };
  },
  methods: {
    exportToExcel() {
      // 获取表头
      const columnHeader = this.columns.map(column => column.title);

      // 构造 worksheetData，第一行是表头，后面是数据
      const worksheetData = [
        columnHeader,
        ...this.dataSource.map(row => Object.values(row)),
      ];

      // 使用 aoa_to_sheet 创建工作表
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // 设置列宽
      worksheet['!cols'] = columnHeader.map(header => {
        return { wch: header.length * 2 }; // 根据表头长度动态设置列宽
      });

      // 创建一个新的工作簿
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // 导出 Excel 文件
      XLSX.writeFile(workbook, "table_data.xlsx");
    }
  }
};
</script>
