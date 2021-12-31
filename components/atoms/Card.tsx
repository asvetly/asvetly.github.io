import styled from "styled-components";

export const Card = styled.div<{ height: string; width: string }>`
  background: #191c29;
  width: calc(${ props => props.height } / 1.5);
  height: ${ props => props.height };
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
  transform: translate3d(50%, 50%, 10xp);

  //&:hover {
  //  color: rgb(88 199 250 / 100%);
  //  transition: color 1s;
  //}
  //&:hover:before, &:hover:after {
  //  animation: none;
  //  opacity: 0;
  //}

  &::before {
    content: "";
    width: 104%;
    height: 102%;
    border-radius: 8px;
    background: linear-gradient(132deg, rgb(0,247,70), rgb(247,0,66), rgb(0,111,255), rgb(247,189,0));
    position: absolute;
    z-index: -1;
    top: -1%;
    left: -2%;
    animation: spin 3.5s linear infinite;
    background-size: 400% 400%;
  }

  &::after {
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    transform: scale(0.8);
    filter: blur(calc(${ props => props.height } / 6));
    background: linear-gradient(132deg, rgb(0,247,70), rgb(247,0,66), rgb(0,111,255), rgb(247,189,0));
    opacity: 1;
    transition: opacity .5s;
    animation: spin 3.5s linear infinite;
    background-size: 400% 400%;
  }

  @keyframes spin {
    0%{background-position:22% 0%}
    50%{background-position:79% 100%}
    100%{background-position:22% 0%}
  }
`;
