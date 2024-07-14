import { ref, onActivated } from 'vue';
const useScrollCache = () => {
  const scrollRef = ref<any>(null);
  const scrollTop = ref(0);
  //再次返回页面时保持原先滚动的位置
  onActivated(() => {
    scrollRef.value.scrollTop = scrollTop.value;
  });
  //页面滚动保留滚动高度
  const onScrollBody = () => {
    scrollTop.value = scrollRef.value.scrollTop || 0;
  };

  return { onScrollBody, scrollRef };
};

export default useScrollCache;
