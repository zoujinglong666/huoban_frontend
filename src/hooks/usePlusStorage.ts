import { decrypt, encrypt } from "@/utils/storage/encryption";

// 过期时间常量（1天的毫秒数）
const EXPIRE_ONE_DAY = 24 * 60 * 60 * 1000;

export const usePlusStorage = (type: "localStorage" | "sessionStorage" = "localStorage") => {
  const storage = window[type];

  const isStorageTypeValid = (t: string): t is "localStorage" | "sessionStorage" => {
    return t === "localStorage" || t === "sessionStorage";
  };

  const clear = () => {
    storage.clear();
  };

  const getItem = (key: string) => {
    if (!key) return null;
    const encryptedValue = storage.getItem(key);
    if (!encryptedValue) return null;

    const storageVal = JSON.parse(decrypt(encryptedValue) as string);
    const now = Date.now();

    // If expire is null or undefined, the item does not expire
    if (storageVal.expire === null || storageVal.expire === undefined || now < storageVal.expire) {
      return storageVal.value;
    } else {
      removeItem(key);
      return null;
    }
  };

  const setItem = (key: string, value: any, expire?: number) => {
    if (!isStorageTypeValid(type)) {
      throw new Error("Invalid storage type");
    }

    // 空值处理
    if (value === '' || value === null || value === undefined) {
      value = '';
    }
// 过期时间为空情况处理
    if (expire === undefined || expire === null) {
      expire = 0;  // Use 0 to indicate no expiration
    }

    // 过期时间处理：如果没有提供过期时间，则不设置过期时间
    const data = {
      value,
      time: Date.now(),
      expire: expire ? Date.now() + expire*1000 : null,
    };

    storage.setItem(key, encrypt(JSON.stringify(data)));
  };

  const removeItem = (key: string) => {
    if (!key) return;
    storage.removeItem(key);
  };

  return { clear, getItem, setItem, removeItem };
};
