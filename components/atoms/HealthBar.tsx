import {memo, CSSProperties} from 'react';
import styled from 'styled-components';

const HealthBarItem = styled.span<{delay?: number}>`
    animation: waving 1200ms linear infinite;
    display: inline-block;
    @keyframes waving {
        0% {
            transform: translateY(-1.5px);
        }
        50% {
            transform: translateY(1.5px);
        }
        100% {
            transform: translateY(-1.5px);
        }
    }
`;

const HealthBarContainer = styled.div`
    & > ${HealthBarItem}:not(:last-child) {
        padding-right: 5px;
    }
`;

const HealthBar = memo(
    ({
        size = 3,
        lost = 0,
        style,
    }: {
        size?: number;
        lost?: number;
        style?: CSSProperties;
    }) => (
        <HealthBarContainer style={style}>
            {Array.from({length: size}).map((_, idx) => (
                <HealthBarItem
                    key={idx}
                    style={{animationDelay: `${idx * 100}ms`}}
                >
                    {idx < size - lost ? '❤️' : '🖤'}
                </HealthBarItem>
            ))}
        </HealthBarContainer>
    ),
);

HealthBar.displayName = 'HealthBar';

export default HealthBar;
