import React, { useEffect, useState } from 'react'; // React와 필요한 훅들을 불러옵니다.

const { kakao } = window; // 전역 객체 window에서 kakao 객체를 가져옵니다.

const MapContainer = ({ searchPlace }) => {
  // 검색 결과를 저장할 상태를 정의합니다.
  const [Places, setPlaces] = useState([]);
  
  useEffect(() => {
    // 인포윈도우 객체를 생성합니다.
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); 
    var markers = []; // 마커들을 저장할 배열입니다.
    
    // 지도를 표시할 컨테이너 요소를 가져옵니다.
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.682510, 126.769690), // 초기 지도 중심 좌표입니다. (일산역 기준)
      level: 3, // 초기 지도 확대 레벨입니다.
    };
    const map = new kakao.maps.Map(container, options); // 지도를 생성합니다.

    const ps = new kakao.maps.services.Places(); // 장소 검색 객체를 생성합니다.

    // 키워드로 장소를 검색합니다.
    ps.keywordSearch(searchPlace, placesSearchCB);

    // 장소 검색 콜백 함수입니다.
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) { // 검색이 성공했을 경우
        let bounds = new kakao.maps.LatLngBounds(); // 검색된 장소들을 포함할 범위를 정의합니다.

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]); // 검색된 장소에 마커를 표시합니다.
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x)); // 범위에 포함시킵니다.
        }

        map.setBounds(bounds); // 지도의 범위를 검색된 장소들로 맞춥니다.
        displayPagination(pagination); // 페이지 번호를 표시합니다.
        setPlaces(data); // 검색 결과를 상태에 저장합니다.
      }
    }

    // 검색 결과 목록 하단에 페이지 번호를 표시합니다.
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호를 삭제합니다.
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      // 페이지 번호를 추가합니다.
      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i); // 페이지 번호 클릭 시 해당 페이지로 이동합니다.
            }
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    // 장소에 마커를 표시하는 함수입니다.
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x), // 장소의 좌표를 설정합니다.
      });

      // 마커 클릭 시 인포윈도우를 표시합니다.
      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]); // searchPlace가 변경될 때마다 이펙트가 실행됩니다.

  return (
    <div>
      <div
        id="myMap"
        style={{
          width: '500px',
          height: '500px',
        }}
      ></div> {/* 지도를 표시할 div입니다. */}
      <div id="result-list">
        {Places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px' }}>
            <span>{i + 1}</span> {/* 장소 순번을 표시합니다. */}
            <div>
              <h5>{item.place_name}</h5> {/* 장소 이름을 표시합니다. */}
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span> {/* 도로명 주소가 있으면 표시합니다. */}
                  <span>{item.address_name}</span> {/* 지번 주소를 표시합니다. */}
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span> {/* 전화번호를 표시합니다. */}
            </div>
          </div>
        ))}
        <div id="pagination"></div> {/* 페이지 번호를 표시할 div입니다. */}
      </div>
    </div>
  )
}

export default MapContainer; // MapContainer 컴포넌트를 내보냅니다.
