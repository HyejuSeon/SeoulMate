import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 랜드마크 정보
export const landmarkInfoState = atom({
    key: 'landmarkInfoState',
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});
