import React, { useState } from 'react'; // React와 useState 훅을 불러옵니다.
import MapContainer from './MapContainer'; // MapContainer 컴포넌트를 불러옵니다.
import './LandingPage.css'; // CSS 파일을 불러옵니다.

function LandingPage() {
  // 상태 정의: InputText는 입력 필드의 값을, Place는 검색어를 저장합니다.
  const [InputText, setInputText] = useState('');
  const [Place, setPlace] = useState('');

  // 입력 필드 값이 변경될 때 호출되는 함수입니다.
  const onChange = (e) => {
    setInputText(e.target.value); // 입력된 값을 InputText 상태에 저장합니다.
  }

  // 폼 제출 시 호출되는 함수입니다.
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼의 기본 동작(페이지 새로고침)을 막습니다.
    setPlace(InputText); // InputText의 값을 Place 상태에 저장합니다.
    setInputText(''); // 입력 필드 값을 초기화합니다.
  }

  return (
    <div className="content"> {/* 전체 내용을 감싸는 div입니다. */}
      <div className="banner"> {/* 배너 영역입니다. */}
        <img alt="배너이미지" src="/dogbanner.png" /> {/* 배너 이미지입니다. */}
        <h1>동물병원 / 매장</h1> {/* 배너 제목입니다. */}
        <img alt="배너이미지" src="/catbanner.png" /> {/* 또 다른 배너 이미지입니다. */}
      </div>
      <div className="App"> {/* 메인 앱 영역입니다. */}
        <form className="inputForm" onSubmit={handleSubmit}> {/* 폼 요소입니다. */}
          <input 
            placeholder="키워드를 입력하세요 (ex : 동물병원, 애견카페)" 
            onChange={onChange} 
            value={InputText} 
          /> {/* 키워드를 입력하는 입력 필드입니다. */}
          <button type="submit">검색</button> {/* 폼 제출 버튼입니다. */}
        </form>
        <MapContainer searchPlace={Place} /> {/* 검색된 장소를 보여줄 MapContainer 컴포넌트입니다. */}
      </div>
    </div>
  );
}

export default LandingPage; // LandingPage 컴포넌트를 내보냅니다.
