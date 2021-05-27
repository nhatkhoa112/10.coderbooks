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
