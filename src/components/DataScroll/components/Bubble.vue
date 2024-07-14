<template>
  <canvas ref="bubbleRef" :width="width" :height="height" :style="canvasStyle"></canvas>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';

const props = defineProps({
  y: {
    type: Number,
    default: 0
  }
});

const canvasStyle = computed(() => {
  if (props.y === 0) {
    return {
      ...style.value,
      position: 'fixed',
      left: '100%',
    }
  } else {
    return {
      ...style.value,
    }
  }
})

const width = ref(50);
const height = ref(80);
const bubbleRef = ref(null);

const ratio = ref(window.devicePixelRatio || 1);

const initRadius = 18 * ratio.value;
const minHeadRadius = 12 * ratio.value;
const minTailRadius = 5 * ratio.value;
const initArrowRadius = 10 * ratio.value;
const minArrowRadius = 6 * ratio.value;
const arrowWidth = 3 * ratio.value;
const maxDistance = 40 * ratio.value;
const initCenterX = 25 * ratio.value;
const initCenterY = 25 * ratio.value;

const distance = computed(() => Math.max(0, Math.min(props.y * ratio.value, maxDistance)));

const style = computed(() => ({
  width: `${width.value / ratio.value}px`,
  height: `${height.value / ratio.value}px`,
  transition: 'all 1s cubic-bezier(0.25, 0.1, 0.25, 1)' // 添加缓动函数
}));

const headCenter = ref({
  x: initCenterX,
  y: initCenterY
});

onMounted(() => {
  width.value *= ratio.value;
  height.value *= ratio.value;
  draw();
});

watch(() => props.y, draw);

function draw() {
  if (!bubbleRef.value) return;
  nextTick(() => {
    const canvas = bubbleRef.value;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBubble(ctx);
    drawArrow(ctx);
  })

}

function drawBubble(ctx) {
  ctx.save();
  ctx.beginPath();

  const rate = distance.value / maxDistance;
  const headRadius = initRadius - (initRadius - minHeadRadius) * rate;
  headCenter.value.y = initCenterY - (initRadius - minHeadRadius) * rate;

  ctx.arc(headCenter.value.x, headCenter.value.y, headRadius, 0, Math.PI, true);

  const tailRadius = initRadius - (initRadius - minTailRadius) * rate;
  const tailCenterY = headCenter.value.y + distance.value;
  const tailPointL = {
    x: headCenter.value.x - tailRadius,
    y: tailCenterY
  };
  const controlPointL = {
    x: tailPointL.x,
    y: tailPointL.y - distance.value / 2
  };

  ctx.quadraticCurveTo(controlPointL.x, controlPointL.y, tailPointL.x, tailPointL.y);
  ctx.arc(headCenter.value.x, tailCenterY, tailRadius, Math.PI, 0, true);

  const headPointR = {
    x: headCenter.value.x + headRadius,
    y: headCenter.value.y
  };
  const controlPointR = {
    x: headCenter.value.x + tailRadius,
    y: headPointR.y + distance.value / 2
  };

  ctx.quadraticCurveTo(controlPointR.x, controlPointR.y, headPointR.x, headPointR.y);

  ctx.fillStyle = 'rgb(170,170,170)';
  ctx.fill();
  ctx.strokeStyle = 'rgb(153,153,153)';
  ctx.stroke();
  ctx.restore();
}

function drawArrow(ctx) {
  ctx.save();
  ctx.beginPath();

  const rate = distance.value / maxDistance;
  const arrowRadius = initArrowRadius - (initArrowRadius - minArrowRadius) * rate;

  ctx.arc(headCenter.value.x, headCenter.value.y, arrowRadius - (arrowWidth - rate), -Math.PI / 2, 0, true);
  ctx.arc(headCenter.value.x, headCenter.value.y, arrowRadius, 0, Math.PI * 3 / 2, false);

  ctx.lineTo(headCenter.value.x, headCenter.value.y - arrowRadius - arrowWidth / 2 + rate);
  ctx.lineTo(headCenter.value.x + arrowWidth * 2 - rate * 2, headCenter.value.y - arrowRadius + arrowWidth / 2);
  ctx.lineTo(headCenter.value.x, headCenter.value.y - arrowRadius + arrowWidth * 3 / 2 - rate);

  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.fill();
  ctx.strokeStyle = 'rgb(170,170,170)';
  ctx.stroke();
  ctx.restore();
}
</script>

