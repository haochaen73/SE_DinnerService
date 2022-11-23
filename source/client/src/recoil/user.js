import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const {persistAtom} = recoilPersist();

export const userState = atom({
  key: "user",
  default: {
    // token: '',
    userIdx: '',
    name: '', // 헤더에 이름 반영하기 위해
    userType: '', //직원페이지나 고객페이지 접근 허용을 위한 내용
  },
  effects_UNSTABLE: [persistAtom],
});