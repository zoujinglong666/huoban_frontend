import {showConfirmDialog} from 'vant';

const useConfirm = (onConfirm: () => void,  title?: string, message?: string) => {
  showConfirmDialog ( {
    title: title? title : '确认删除吗',
  } )
    .then ( () => {
      onConfirm ();
    } )
};

export default useConfirm;
