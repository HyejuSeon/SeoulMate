import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 유저 로그인시 받는 데이터 전체
export const userState = atom({
    key: 'userState',
    default: { user: null },
    effects_UNSTABLE: [persistAtom],
});

// 유저 로그인시 받는 데이터(토큰이 있는)
export const tokenState = atom({
    key: 'tokenState',
    default: { token: null },
    effects_UNSTABLE: [persistAtom],
});

// 유저 정보.
export const userInfoState = atom({
    key: 'userInfoState',
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});

// 모든 게시글 정보
export const allBoardContentState = atom({
    key: 'allBoardContentState',
    default: [],
});

// 검색 랜드마크 정보
export const searchLandmarkInfoState = atom({
    key: 'searchLandmarkInfoState',
    default: [],
});
//  랜드마크 정보
export const landmarkPicState = atom({
    key: 'landmarkPicState',
    default: '',
});
