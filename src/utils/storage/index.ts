import { encrypt, decrypt } from './encryption';
interface globalConfig {
  type: 'localStorage' | 'sessionStorage';
  expire: number;
  isEncrypt: boolean;
}


const config: globalConfig = {
  type: 'localStorage', //存储类型，localStorage | sessionStorage
  expire: 24 * 60, //过期时间，默认为一天，单位为分钟
  isEncrypt: true, //支持加密、解密数据处理
};

const setStorage = (key: string, value: any, expire: number = 24 * 60): boolean => {
  //设定值
  if (value === '' || value === null || value === undefined) {
    //空值重置
    value = null;
  }
  if (isNaN(expire) || expire < 0) {
    //过期时间值合理性判断
    throw new Error('Expire must be a number');
  }
  const data = {
    value, //存储值
    time: Date.now(), //存储日期
    expire: Date.now() + 1000 * 60 * expire, //过期时间
  };
  //是否需要加密，判断装载加密数据或原数据
  window[config.type].setItem(
    key,
    config.isEncrypt ? encrypt(JSON.stringify(data)) : JSON.stringify(data),
  );
  return true;
};

const getStorageFromKey = (key: string) => {

  if (!window[config.type].getItem(key)) {
    //不存在判断
    return null;
  }

  const storageVal = config.isEncrypt
    ? JSON.parse(decrypt(window[config.type].getItem(key) as string))
    : JSON.parse(window[config.type].getItem(key) as string);
  const now = Date.now();
  if (now >= storageVal.expire) {
    //过期销毁
    removeStorageFromKey(key);
    return null;
    //不过期回值
  } else {
    return storageVal.value;
  }
};


const removeStorageFromKey = (key: string) => {

  if(key===undefined||key===null){
    return;
  }
  window[config.type].removeItem(key);
};
const clearStorage = () => {
  window[config.type].clear();
};



export {
  setStorage,
  getStorageFromKey,
  removeStorageFromKey,
  clearStorage,
};
