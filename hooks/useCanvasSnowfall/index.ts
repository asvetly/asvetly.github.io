import {RefObject, useEffect, useRef} from 'react';

import {Animation} from './Animation';

export default function useCanvasSnowfall(
    canvasRef: RefObject<HTMLCanvasElement>,
) {
    const animation = useRef<Animation | undefined>();

    useEffect(() => {
        const canvas = canvasRef.current;
        const c2d = canvas?.getContext('2d');
        if (!canvas || !c2d) return;

        animation.current = new Animation(canvas, c2d);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        addEventListener('resize', () => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            animation.current?.init();
        });

        animation.current.init();
        animation.current.animate();
    }, [canvasRef]);
}
