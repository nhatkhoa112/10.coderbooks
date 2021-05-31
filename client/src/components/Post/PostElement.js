import styled from 'styled-components';

export const Reaction = styled.form`
  width: 250px;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  position: absolute;
  border: #ccc 1px solid;
  top: -60px;
  left: -5px;
  padding: 10px;
  display: ${(props) => (props.isReaction ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
`;

export const ButtonR = styled.button`
  border: none;
  background: transparent;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(0.9);
  }
`;

export const IconContainer = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1.2px solid ${({ color }) => (color ? color : '')};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const IconStyle = styled.i`
  border-radius: 50%;
  color: ${({ color }) => (color ? color : '')};
  font-size: 1.3rem;
`;

export const ReactionComment = styled.div`
  width: 80px;
  height: 60px;
  background: transparent;
  position: absolute;
  border: #ccc 1px solid;
  top: 0;
  right: 150px;
  border: none;
  padding: 10px;
  display: ${(props) => (props.isReaction ? 'flex' : 'none')};
  z-index: 100000;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonS = styled.button`
  border: none;
  background: transparent;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;
