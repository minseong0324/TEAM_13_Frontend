import * as S from './style';
import * as SBuild from '../style';
import Cookies from '../../../assets/Cookies';
import DecorationButton from '../../../components/Buttons/DecorationButton/DecorationButton';
import LongButton from '../../../components/Buttons/LongButton/LongButton';
import {useRecoilState} from 'recoil';
import {BuildStateAtom, buildStateAtom} from '../../../atoms/buildAtom';

export default function Custom() {
  const [buildState, setBuildState] =
    useRecoilState<BuildStateAtom>(buildStateAtom);

  const handleToggleSelect = (id: number) => {
    // 쿠키 id는 인덱스 +1

    // 만약 이미 두 개가 선택된 상태면 더 이상 선택 불가
    // 변경 하려면 이전에 선택한 쿠키를 다시 클릭해서 취소해줘야 한다
    if (
      !buildState.cookieId.includes(id) &&
      buildState.cookieId[0] !== null &&
      buildState.cookieId[1] !== null
    )
      return;

    setBuildState((prev) => {
      const [cookie1, cookie2] = prev.cookieId;

      return cookie1 === id
        ? {...prev, cookieId: [null, cookie2]}
        : cookie2 === id
          ? {...prev, cookieId: [cookie1, null]}
          : cookie1 === null
            ? {...prev, cookieId: [id, cookie2]}
            : {...prev, cookieId: [cookie1, id]};
    });
  };

  return (
    <>
      <SBuild.Title>{'쿠키하우스 지을 과자재료를\n선택해주세요!'}</SBuild.Title>
      <SBuild.Description>{'두 가지를 선택해주세요!'}</SBuild.Description>
      <S.GridBox>
        {Cookies.map((image, idx) => (
          <DecorationButton
            key={idx}
            size={122}
            image={image}
            onClick={() => handleToggleSelect(idx + 1)}
            dark={buildState.cookieId.includes(idx + 1)}
          />
        ))}
      </S.GridBox>
      <LongButton
        margin="20.5px 0 0 0"
        disabled={
          buildState.cookieId[0] === null || buildState.cookieId[1] === null
        }
        route="/build/preview"
      >
        <SBuild.NextStepText>{'다 골랐어요!'}</SBuild.NextStepText>
      </LongButton>
    </>
  );
}
