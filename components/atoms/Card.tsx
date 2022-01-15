import styled from 'styled-components';

export const Card = styled.div<{
    width?: string;
    borderWidth?: number;
}>`
  background: #191c29;
  padding: 3px;
  position: relative;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  font-size: 1.4em;
  color: #fff;
  cursor: pointer;

  &::before {
    width: calc(100% + ${(props) => props.borderWidth! * 2}px);
    height: calc(100% + ${(props) => props.borderWidth! * 2}px);
    border-radius: 8px;
    top: -${(props) => props.borderWidth}px;
    left: -${(props) => props.borderWidth}px;
  }

  &::after {
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    filter: blur(10px);
    opacity: 1;
    transition: opacity 0.5s;
  }

  &::after,
  &::before {
    position: absolute;
    content: '';
    z-index: -1;
    background: conic-gradient(
            from var(--aio-rotation-angle),
            rgb(0, 247, 70),
            rgb(247, 0, 66),
            rgb(0, 111, 255),
            rgb(247, 189, 0),
            rgb(0, 247, 70)
    );
    animation: spin 3.5s linear infinite;
  }

  @keyframes spin {
    0% {
      --aio-rotation-angle: 0deg;
    }
    50% {
      --aio-rotation-angle: 180deg;
    }
    100% {
      --aio-rotation-angle: 360deg;
    }
  }
`;

Card.defaultProps = {
    borderWidth: 2,
};
