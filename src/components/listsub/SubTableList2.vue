<template>
  <n-space vertical :size="12">
    <n-space>
      <n-button @click="sortName('ascend')">Sort By Name (Ascend)</n-button>
      <n-button @click="sortName('descend')">Sort By Name (Descend)</n-button>
      <n-button @click="clearSorter">Clear Sorter</n-button>
    </n-space>
    <n-data-table
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        @update:sorter="handleSorterChange"
    />
  </n-space>
</template>

<script>
import {defineComponent, ref} from 'vue'


const columns = [
  {
    title: 'ID',
    key: 'id',
    sortOrder: false,
    sorter: (rowA, rowB) => rowA.id - rowB.id
  },
  {
    title: 'Cabinet Name',
    key: 'cabinetName',
    sortOrder: false,
    sorter: (rowA, rowB) => rowA.cabinetName.localeCompare(rowB.cabinetName)
  },
  {
    title: 'Brand',
    key: 'brand',
    sortOrder: false,
    sorter: (rowA, rowB) => rowA.brand.localeCompare(rowB.brand)
  },
  {
    title: 'Position',
    key: 'position',
    sortOrder: false,
    sorter: (rowA, rowB) => rowA.position.localeCompare(rowB.position)
  },
  {
    title: 'Create Time',
    key: 'createTime',
    sortOrder: false,
    sorter: (rowA, rowB) => {
      // 这里根据创建时间进行排序，如果需要的话
      // 如果数据中有创建时间的话，可以使用比较函数进行排序，例如：rowA.createTime.localeCompare(rowB.createTime)
      // 如果没有创建时间，则可以将排序函数设置为 null
      return null;
    }
  },
  {
    title: 'Remark',
    key: 'remark',
    sortOrder: false,
    sorter: (rowA, rowB) => {
      // 这里根据备注进行排序，如果需要的话
      // 如果数据中有备注的话，可以使用比较函数进行排序，例如：rowA.remark.localeCompare(rowB.remark)
      // 如果没有备注，则可以将排序函数设置为 null
      return null;
    }
  }
];



export default defineComponent({
  setup() {
    const tableData = ref([])
    const pagination = {pageSize: 5}


    const fetchData = () => {
      return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8099//catl/setting/cabinet/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // 如果有其他头部信息，也可以在这里添加
          },
          body: JSON.stringify({
            // 如果需要发送的数据，请在这里添加
          })
        })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok')
              }
              return response.json()
            })
            .then(data => {
              // 将返回的数据赋值给 tableData
              tableData.value = data.data // 根据您的数据结构，可能需要适当调整

            })
            .catch(error => {
              reject(error)
            })
      })
    }




    const loadData = async () => {
      try {
        const data = await fetchData()
        tableData.value = data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    loadData()

    return {
      tableData,
      columns,
      pagination,
      sortName(order) {
        // Implement sorting logic here
      },
      clearSorter() {
        // Implement clear sorter logic here
      },
      handleSorterChange(sorter) {
        // Implement sorter change logic here
      }
    }
  }
})
</script>


<style scoped>


  .n-button {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    width: 12rem;
  }

  .n-data-table-th__title{
    font-size: 0.1rem;
  }

  .n-data-table {
    font-size: 0.9rem;
  }
  .n-data-table-th{
    width: 1rem;
  }

</style>


