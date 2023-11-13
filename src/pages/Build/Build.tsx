import * as S from './style';
import PageLayout from '../../components/PageLayout/PageLayout';
import BuildTypeButton from '../../components/Buttons/BuildTypeButton/BuildTypeButton';
import LongButton from '../../components/Buttons/LongButton/LongButton';
import {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {BuildStateAtom, buildStateAtom} from '../../atoms/buildAtom';

export default function Build() {
  const [buildState, setBuildState] =
    useRecoilState<BuildStateAtom>(buildStateAtom);

  const handleRandomSelect = useCallback(
    () =>
      setBuildState((prev) =>
        prev.type === 'random'
          ? {...prev, type: 'unselected'}
          : {...prev, type: 'random'},
      ),
    [buildState.type],
  );
  const handleCustomSelect = useCallback(
    () =>
      setBuildState((prev) =>
        prev.type === 'custom'
          ? {...prev, type: 'unselected'}
          : {...prev, type: 'custom'},
      ),
    [buildState.type],
  );

  return (
    <PageLayout>
      <S.Title>쿠키하우스 입주하기</S.Title>
      <S.Description>하나를 선택해주세요!</S.Description>
      <BuildTypeButton
        onClick={handleRandomSelect}
        margin="19.68px 0 0 0"
        title="랜덤으로 분양받을래요!"
        description={'랜덤으로 커스텀된 쿠키하우스에\n입주하게 됩니다'}
        dark={buildState.type === 'random'}
      />
      <BuildTypeButton
        onClick={handleCustomSelect}
        margin="22px 0 0 0"
        title="제가 직접 지을래요!"
        description={'과자를 선택해 쿠키하우스를 커스텀하고\n입주하게 됩니다'}
        dark={buildState.type === 'custom'}
      />
      <LongButton
        route={`/build/${buildState.type}`}
        margin="84px 0 0 0"
        disabled={buildState.type === 'unselected'}
      >
        <S.NextStepText>집 보러가기</S.NextStepText>
      </LongButton>
    </PageLayout>
  );
}