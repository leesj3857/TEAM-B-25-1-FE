import axios from 'axios';
// 서울 열린데이터광장 API를 사용하여 지하철역 정보를 가져오는 함수
export const getSubwayStationInfo = async (stationName: string): Promise<any> => {
  try {
    // 실제 사용시에는 환경변수나 설정 파일에서 가져와야 합니다
    const API_KEY = '727a4e70496c65653439624444764d'; // 서울 열린데이터광장에서 발급받은 인증키
    
    const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/SearchSTNBySubwayLineInfo/1/5/ /${stationName}`;
    console.log(url);
    const response = await axios.get(url);
    console.log(response)
    if (!response.status) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    const data = response.data; // JSON 응답을 파싱하여 받기
    return data;
    
  } catch (error) {
    console.error('지하철역 정보 조회 중 오류 발생:', error);
    throw error;
  }
};

// API를 사용하여 지하철역 호선을 조회하는 함수
export const getLineSubwayFromAPI = async (stationName: string): Promise<string[]> => {
  try {
    const jsonData = await getSubwayStationInfo(stationName);
    console.log(jsonData, 'jsonDATAajsonDATAajsonDATAajsonDATAajsonDATAajsonDATAajsonDATAajsonDATAajsonDATAajsonDATAajsonDATAajsonDATAajsonDATAajsonDATAajsonDATAajsonDATAajsonDATAa');
    if (jsonData.SearchSTNBySubwayLineInfo && jsonData.SearchSTNBySubwayLineInfo.row) {
      const rows = jsonData.SearchSTNBySubwayLineInfo.row;
      if (Array.isArray(rows) && rows.length > 0) {
        const lineNumbers = rows.map(row => {
            const lineNum = row.LINE_NUM;
            // 01호선, 02호선 형태는 숫자만 남기기
            if (lineNum && lineNum.match(/^\d+호선$/)) {
                return lineNum.replace(/^0+/, '').replace('호선', '');
            }
            return lineNum;
        });
        console.log('추출된 호선 번호들:', lineNumbers);
        return lineNumbers;
      }
    }
    
    return []; // 기본값
  } catch (error) {
    console.error('API 조회 실패, 로컬 데이터로 대체:', error);
    // API 실패시 로컬 데이터 사용
    return [];
  }
};