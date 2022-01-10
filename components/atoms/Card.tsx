import styled, {css} from 'styled-components';

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
    transform: translate3d(50%, 50%, 10 xp);

    //&:hover {
    //  color: rgb(88 199 250 / 100%);
    //  transition: color 1s;
    //}
    //&:hover:before, &:hover:after {
    //  animation: none;
    //  opacity: 0;
    //}

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
        transform: scale(0.8);
        filter: blur(1.5rem);
        opacity: 1;
        transition: opacity 0.5s;
    }

    &::after,
    &::before {
        position: absolute;
        content: '';
        z-index: -1;
        background: linear-gradient(
            132deg,
            rgb(0, 247, 70),
            rgb(247, 0, 66),
            rgb(0, 111, 255),
            rgb(247, 189, 0)
        );
        animation: spin 3.5s linear infinite;
        background-size: 400% 400%;
    }

    @keyframes spin {
        0% {
            background-position: 22% 0%;
        }
        50% {
            background-position: 79% 100%;
        }
        100% {
            background-position: 22% 0%;
        }
    }
`;

Card.defaultProps = {
    borderWidth: 2,
};
