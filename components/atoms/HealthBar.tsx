import {memo, CSSProperties} from 'react';
import styled from 'styled-components';

const HealthBarContainer = styled.div`
    & > span:not(:last-child) {
        padding-right: 3px;
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
                <span key={idx}>{idx < size - lost ? '❤️' : '🖤'}</span>
            ))}
        </HealthBarContainer>
    ),
);

HealthBar.displayName = 'HealthBar';

export default HealthBar;
