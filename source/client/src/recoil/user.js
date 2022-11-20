import { atom } from 'recoil';

export const userState = atom({
  key: "user",
  default: {
    token: '',
    name: '', // 헤더에 이름 반영하기 위해
    userType: '', //직원페이지나 고객페이지 접근 허용을 위한 내용
  },
});