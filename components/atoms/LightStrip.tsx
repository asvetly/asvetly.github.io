import {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';

import useWindowSize from '../../hooks/useWindowSize';

const LightStripContainer = styled.ul`
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    z-index: 1;
    top: -8px;
    padding: 0;
    pointer-events: none;
    width: 100%;
`;

interface LightStripItemProps {
    globeWidth: number;
    globeHeight: number;
    globeSpacing: number;
    globeSpread: number;
    lightOffOpacity: number;
    rgbColor: string;
}

const LightStripItem = styled.li<LightStripItemProps>((props) => {
    const {
        globeWidth,
        globeHeight,
        globeSpacing,
        globeSpread,
        lightOffOpacity,
        rgbColor,
    } = props;

    return css`
        position: relative;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        list-style: none;
        padding: 0;
        width: ${globeWidth}px;
        height: ${globeHeight}px;
        border-radius: 50%;
        margin: ${globeSpacing / 2}px;
        display: inline-block;
        background: rgba(${rgbColor});
        box-shadow: 0 ${globeHeight / 6}px ${globeWidth * 2}px ${globeSpread}px
            rgba(${rgbColor});
        animation-name: flash-${rgbColor.replaceAll(',', '-')};
        animation-duration: 2s;

        &:before {
            content: '';
            position: absolute;
            background: #222;
            width: ${globeWidth - 2}px;
            height: ${globeHeight / 3}px;
            border-radius: 3px;
            top: ${-globeHeight / 6}px;
            left: 1px;
        }

        &:after {
            content: '';
            top: ${-globeHeight / 2}px;
            left: ${globeWidth - 3}px;
            position: absolute;
            width: ${globeSpacing + 12}px;
            height: ${(globeHeight / 3) * 2}px;
            border-bottom: solid #222 2px;
            border-radius: 50%;
        }

        &:last-child:after {
            content: none;
        }

        &:first-child {
            margin-left: ${-globeSpacing}px;
        }

        @keyframes flash-${rgbColor.replaceAll(',', '-')} {
            0%,
            100% {
                background: rgba(${rgbColor});
                box-shadow: 0 ${globeHeight / 6}px ${globeWidth * 2}px
                    ${globeSpread}px rgba(${rgbColor});
            }
            50% {
                background: rgba(${rgbColor}, ${lightOffOpacity});
                box-shadow: 0 ${globeHeight / 6}px ${globeWidth * 2}px
                    ${globeSpread}px rgba(${rgbColor}, 0.2);
            }
        }
    `;
});

LightStripItem.defaultProps = {
    globeWidth: 6,
    globeHeight: 15,
    globeSpacing: 20,
    globeSpread: 3,
    lightOffOpacity: 0.4,
};

interface Props {
    size?: number;
    globeWidth?: number;
    globeHeight?: number;
    globeSpacing?: number;
    globeSpread?: number;
    lightOffOpacity?: number;
}

const colors = ['0,247,70', '247,0,66', '0,111,255', '247,189,0'];

const pickColor = (i: number) => colors[(i + 1) % colors.length];

const LightStrip = (props: Props) => {
    const [width] = useWindowSize();
    const [stripLength, setStripLength] = useState(0);

    const {
        globeWidth = LightStripItem.defaultProps!.globeWidth,
        globeSpacing = LightStripItem.defaultProps!.globeSpacing,
        globeHeight,
        globeSpread,
        lightOffOpacity,
        size,
    } = props;

    useEffect(() => {
        setStripLength(width / (globeWidth! + globeSpacing!) + 3);
    }, [width, globeWidth, globeSpacing]);

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <LightStripContainer>
            {Array.from({length: size ?? stripLength}).map((_, idx) => (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <LightStripItem
                    key={idx}
                    globeWidth={globeWidth}
                    globeHeight={globeHeight}
                    globeSpacing={globeSpacing}
                    globeSpread={globeSpread}
                    lightOffOpacity={lightOffOpacity}
                    rgbColor={pickColor(idx)}
                    style={{
                        animationDuration: `${
                            Math.random() * (1.4 - 0.9) + 0.9
                        }s`,
                        transform: `rotate(${Math.random() * (7 + 7) - 7}deg)`,
                    }}
                />
            ))}
        </LightStripContainer>
    );
};

export default LightStrip;
