import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { increment } from '../store/slices/counterSlice';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const CountText = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`;

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <CountText>Redux 카운터: {count}</CountText>
      <Button onClick={() => dispatch(increment())}>+1</Button>
    </Wrapper>
  );
};

export default Counter;
