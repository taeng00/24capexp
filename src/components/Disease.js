import React, { useState } from 'react'; // React와 useState 훅을 임포트합니다.
import './Disease.css'; // CSS 파일을 임포트합니다.

const Disease = () => {
  // 현재 단계를 나타내는 상태와 증상을 나타내는 상태를 선언합니다.
  const [step, setStep] = useState(1); // 현재 단계 상태 (1단계부터 시작)
  const [symptoms, setSymptoms] = useState({
    step1: '', // 1단계에서 선택한 증상
    step2: '', // 2단계에서 선택한 증상
    step3: '' // 3단계에서 선택한 증상
  });

  // 증상 변경을 처리하는 함수입니다. 단계와 해당 값을 매개변수로 받습니다.
  const handleSymptomsChange = (stepNumber, value) => {
    // 기존 증상 상태를 복사하고, 해당 단계의 증상을 업데이트합니다.
    setSymptoms({
      ...symptoms,
      [`step${stepNumber}`]: value
    });

    // 3단계 이하일 경우 다음 단계로 이동합니다.
    if (stepNumber < 3) {
      setStep(stepNumber + 1);
    }
  };

  // 모든 단계가 완료되었을 때 호출되는 함수입니다.
  const handleComplete = () => {
    setStep(4); // 4단계로 상태를 변경하여 결과를 보여줍니다.
  };

  // 결과를 표시하는 컴포넌트입니다. 선택한 증상을 기반으로 진단 결과를 보여줍니다.
  const Result = ({ symptoms }) => {
    const { step1, step2, step3 } = symptoms; // 증상 상태에서 각 단계의 증상을 추출합니다.

    // 진단 데이터입니다. 증상 조합에 따른 질병을 정의합니다.
    const diagnosis = {
      '눈 이상': {
        '눈이 벌겋게 붓는다': {
          '눈 주위 털이 빠진다': {
            name: '알레르기성 안검염',
            description: '눈꺼풀이 알레르기 반응으로 붓는 질병입니다.',
            image: '/diseaseimages/eyes1.png'
          },
          '바닥이나 발을 이용해 귀를 긁는다': {
            name: '알레르기성 안검염',
            description: '눈꺼풀이 알레르기 반응으로 붓는 질병입니다.',
            image: '/diseaseimages/eyes1.png'
          },
          '고름과 같은 분비물이 나온다': {
            name: '세균성 안검염',
            description: '눈꺼풀에 염증이 생겨 붉어지고 부어오를 증상을 동반합니다.',
            image: '/diseaseimages/eyes2.png'
          },
          '눈꺼풀에 다래끼 같은 것이 생긴다': {
            name: '세균성 안검염',
            description: '눈꺼풀에 염증이 생겨 붉어지고 부어오를 증상을 동반합니다.',
            image: '/diseaseimages/eyes2.png'
          }
        },
        '눈이 가렵다': {
          '눈 주위 털이 빠진다': {
            name: '건조성 각결막염',
            description: '눈이 건조해져서 생기는 염증입니다.',
            image: '/images/dry_eye.jpg'
          },
          '눈에 고름이 난다': {
            name: '포도막염',
            description: '눈의 내부 구조가 염증에 의해 붓는 질병입니다.',
            image: '/images/uveitis.jpg'
          }
        }
      }
    };

    // 선택한 증상에 맞는 진단 결과를 찾습니다. 없을 경우 기본 값을 사용합니다.
    const result = diagnosis[step1]?.[step2]?.[step3] || {
      name: '알 수 없는 질병',
      description: '해당 증상에 대한 정보를 찾을 수 없습니다.',
      image: '/images/default.jpg'
    };

    return (
      <div className="disease">
        <h6>결과</h6>
        <p>선택한 증상:</p>
        <ul>
          <li>카테고리: {step1}</li>
          <li>증상 1: {step2}</li>
          <li>증상 2: {step3}</li>
        </ul>
        <div className="disease-info">
          <h6>{result.name}</h6>
          <p>{result.description}</p>
          <img src={result.image} alt={result.name} className="disease-image" />
        </div>
      </div>
    );
  };

  // 1단계: 증상 카테고리를 선택하는 컴포넌트입니다.
  const Step1 = ({ nextStep, selected }) => {
    const selectCategory = (value) => {
      nextStep(1, value); // 카테고리를 선택하고 다음 단계로 이동합니다.
    };

    return (
      <div className="category-box">
        <h6>1단계: 증상 카테고리 선택</h6>
        <div className="button-group">
          <button className={selected === '눈 이상' ? 'selected' : ''} onClick={() => selectCategory('눈 이상')}>
            눈 이상
          </button>
          <button className={selected === '귀 이상' ? 'selected' : ''} onClick={() => selectCategory('귀 이상')}>
            귀 이상
          </button>
          <button className={selected === '행동 이상' ? 'selected' : ''} onClick={() => selectCategory('행동 이상')}>
            행동 이상
          </button>
        </div>
      </div>
    );
  };

  // 2단계: 증상을 선택하는 컴포넌트입니다.
  const Step2 = ({ nextStep, selected }) => {
    const selectSymptom1 = (value) => {
      nextStep(2, value); // 증상을 선택하고 다음 단계로 이동합니다.
    };

    return (
      <div className="category-box">
        <h6>2단계: 증상 선택</h6>
        <div className="button-group">
          <button
            className={selected === '눈이 벌겋게 붓는다' ? 'selected' : ''}
            onClick={() => selectSymptom1('눈이 벌겋게 붓는다')}
          >
            눈이 벌겋게 붓는다
          </button>
          <button
            className={selected === '눈을 자주 찌푸린다' ? 'selected' : ''}
            onClick={() => selectSymptom1('눈을 자주 찌푸린다')}
          >
            눈을 자주 찌푸린다
          </button>
        </div>
      </div>
    );
  };

  // 3단계: 추가 증상을 선택하는 컴포넌트입니다.
  const Step3 = ({ nextStep, selected }) => {
    const selectSymptom2 = (value) => {
      nextStep(3, value); // 추가 증상을 선택하고 다음 단계로 이동합니다.
    };

    return (
      <div className="category-box">
        <h6>3단계: 추가 증상 선택</h6>
        <div className="button-group">
          <button
            className={selected === '눈 주위 털이 빠진다' ? 'selected' : ''}
            onClick={() => selectSymptom2('눈 주위 털이 빠진다')}
          >
            눈 주위 털이 빠진다
          </button>
          <button
            className={selected === '바닥이나 발을 이용해 귀를 긁는다' ? 'selected' : ''}
            onClick={() => selectSymptom2('바닥이나 발을 이용해 귀를 긁는다')}
          >
            바닥이나 발을 이용해 귀를 긁는다
          </button>
          <button
            className={selected === '고름과 같은 분비물이 나온다' ? 'selected' : ''}
            onClick={() => selectSymptom2('고름과 같은 분비물이 나온다')}
          >
            고름과 같은 분비물이 나온다
          </button>
          <button
            className={selected === '눈꺼풀에 다래끼 같은 것이 생긴다' ? 'selected' : ''}
            onClick={() => selectSymptom2('눈꺼풀에 다래끼 같은 것이 생긴다')}
          >
            눈꺼풀에 다래끼 같은 것이 생긴다
          </button>
        </div>
      </div>
    );
  };

  // Disease 컴포넌트의 렌더링 부분입니다. 단계별로 조건부 렌더링을 사용합니다.
  return (
    <div className="content">
      <div className="banner">
        <img alt="배너이미지" src="/dogbanner.png" />
        <h1>증상별 질병 검색</h1>
        <img alt="배너이미지" src="/catbanner.png" />
      </div>
      <div className="container">
        <div className="steps">
          {step >= 1 && (
            <div className="step">
              <Step1 nextStep={handleSymptomsChange} selected={symptoms.step1} />
            </div>
          )}
          {step >= 2 && (
            <div className="step">
              <Step2 nextStep={handleSymptomsChange} selected={symptoms.step2} />
            </div>
          )}
          {step >= 3 && (
            <>
              <div className="step">
                <Step3 nextStep={handleSymptomsChange} selected={symptoms.step3} />
              </div>
              <div className="complete-container">
                <button className="complete-button" onClick={handleComplete}>
                  선택완료
                </button>
              </div>
            </>
          )}
          {step >= 4 && (
            <div className="result">
              <Result symptoms={symptoms} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Disease; // Disease 컴포넌트를 기본 내보내기(export) 합니다.
