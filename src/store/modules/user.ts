import {defineStore} from 'pinia'
import {createStorage} from '@/utils/Storage'
import {store} from '@/store'
import {ACCESS_TOKEN, CURRENT_USER} from '@/store/mutation-types'
import {PageEnum} from '@/enums/pageEnum'
import router from '@/router'
import {getUserInfo, loginApi, logoutApi} from "@/api/modules/login";
import {ResultEnum} from "@/enums/httpEnum";

const Storage = createStorage ( {storage: localStorage} )

interface UserInfo {
  id: string | number
  username: string
  realname: string
  nickname: string
  avatar: string
  cover: string
  gender: number
  phone: string
  sign?: string
  industry?: number
}

interface IUserState {
  token?: string
  userInfo: Nullable<UserInfo>
  lastUpdateTime: number
}

interface LoginParams {
  username: string
  password: string
}

export const useUserStore = defineStore ( {
  id: 'app-user',
  state: (): IUserState => ({
    userInfo: null,
    token: undefined,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || Storage.get ( CURRENT_USER, '' ) || {}
    },
    getToken(): string {
      return this.token || Storage.get ( ACCESS_TOKEN, '' )
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token || ''
      Storage.set ( ACCESS_TOKEN, token )
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date ().getTime ()
      Storage.set ( CURRENT_USER, info )
    },

    async Login(params: any) {
      try {
        const response = await loginApi ( params )
        const {data, code} = response
        if ( code === ResultEnum.SUCCESS && data ) {

          this.setUserInfo ( {
            ...data,
            avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          } )
          await router.replace ( PageEnum.BASE_HOME )
          // save token
        }
        return Promise.resolve ( response )
      } catch (error) {
        return Promise.reject ( error )
      }
    },

    async GetUserInfo() {
      return new Promise ( (resolve, reject) => {
        getUserInfo ()
          .then ( (res) => {
            this.setUserInfo ( {
              ...res.data,
              avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            } )
            resolve ( res.data )
          } )
          .catch ( (error) => {
            reject ( error )
          } )
      } )
    },

    async Logout() {

      await logoutApi ()
      this.setToken ( undefined )
      this.setUserInfo ( null )
      Storage.remove ( ACCESS_TOKEN )
      Storage.remove ( CURRENT_USER )
      router.replace ( PageEnum.BASE_LOGIN )
    },
  },
} )

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore ( store )
}
