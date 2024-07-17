<template>
  <div>
    <div v-if="selectedCell" style="margin-bottom: 10px; font-size: 12px">
      <span style="color: #07c160"> {{ selectedRow }}</span
      >行* <span style="color: #07c160">{{ selectedCol }}</span
    >列 表格
    </div>
    <div class="table-selector">
      <div
        v-for="i in row * col"
        :key="i"
        class="table-cell"
        @mousemove="handleMousemove(i)"
        @click="handleCellClick"
        :class="{ selected: selectedCells.includes(i) }"
      >
        <div class="table-cell_item"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  row: {
    type: Number,
    default: 8 // 默认8行
  },
  col: {
    type: Number,
    default: 8 // 默认8列
  }
})

const emits = defineEmits(['cellClick'])

const selectedCells = ref([])
const selectedCell = ref(null)
const selectedRow = ref(null)
const selectedCol = ref(null)
const productOfRowAndCol = ref(null)

const handleMousemove = (index) => {
  selectedCells.value = []
  selectedCell.value = index
  selectedRow.value = Math.ceil(index / props.col)
  selectedCol.value = ((index - 1) % props.col) + 1
  productOfRowAndCol.value = selectedRow.value * selectedCol.value

  // 高亮显示选中的单元格所在的行和列的交叉区域
  for (let r = 1; r <= selectedRow.value; r++) {
    for (let c = 1; c <= selectedCol.value; c++) {
      const cellIndex = (r - 1) * props.col + c
      selectedCells.value.push(cellIndex)
    }
  }
}

const handleCellClick = () => {
  emits('cellClick', {
    row: selectedRow.value,
    col: selectedCol.value
  })
  selectedCells.value = []
  selectedCell.value = null
  selectedRow.value = null
  selectedCol.value = null
}
</script>

<style scoped lang="less">
.table-selector {
  display: grid;
  grid-template-columns: repeat(v-bind(col), 1fr);
  grid-template-rows: repeat(v-bind(row), 1fr);
  gap: 8px;
}

.table-cell {
  display: flex;
  border: 1px solid #eee;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 4px;
  background-color: #f0f2f5;
  &_item {
    width: 18px;
    height: 18px;
  }
  &.selected {
    background-color: #07c160;
    opacity: 0.9;
    border: 1px solid #07c160;
  }
}
</style>
