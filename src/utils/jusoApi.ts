import axios from 'axios';

export interface JusoResult {
  bdNm: string;
  roadAddr: string;
  roadAddrPart1: string;
}

export async function fetchBuildingNamesByAddress(keyword: string): Promise<JusoResult[]> {
  const confmKeyDEV = 'U01TX0FVVEgyMDI1MDUyMDE3MzcxNjExNTc2MjY='; 
  const confmKeyPROD = 'U01TX0FVVEgyMDI1MDUyMDE3MzcxNjExNTc2MjI=';
  const url = 'https://business.juso.go.kr/addrlink/addrLinkApi.do';

  try {
    const { data } = await axios.get(url, {
      params: {
        confmKey: confmKeyDEV,
        currentPage: 1,
        countPerPage: 10,
        keyword,
        resultType: 'json',
      },
    });

    // API 응답 구조에 따라 파싱
    const jusoList = data?.results?.juso || [];
    return jusoList.map((item: any) => ({
      bdNm: item.bdNm,
      roadAddr: item.roadAddr,
      roadAddrPart1: item.roadAddrPart1,    
    }));
  } catch (error) {
    console.error('도로명주소 API 호출 오류:', error);
    return [];
  }
} 