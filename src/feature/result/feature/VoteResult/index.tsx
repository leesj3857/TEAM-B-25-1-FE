import styled from "@emotion/styled";
import PlaceRanking from "./interface/PlaceRanking";
import TotalResult from "./interface/TotalResult";
import { PlaceRankingType } from "../../type/PlaceRanking";

export default function VoteResult() {
    const placeRanking: PlaceRankingType[] = [
        {id: 1, rank: 1, name: 'Place 1', count: 100},
        {id: 2, rank: 2, name: 'Place 2', count: 90},
        {id: 3, rank: 3, name: 'Place 3', count: 80},
        {id: 4, rank: 4, name: 'Place 4', count: 70},
        {id: 5, rank: 5, name: 'Place 5', count: 60},
    ]
    return (
        <Container>
            <TotalResult number={100} />
            <PlaceRanking placeRanking={placeRanking} />
        </Container>
    )
}

const Container = styled.div`   
    
`;