import './CorrectGameEffect.css';

import { confetti } from '@tsparticles/confetti';
import { useEffect, useRef } from 'react';

export default function CorrectGameEffect(props: {play: boolean, setPlay: React.Dispatch<React.SetStateAction<boolean>>}) {

    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if(!props.play) return;

        for (let i = 0; i < 5; i++) {
    
            setTimeout(() => {
                confetti("tsparticles", {
                    particleCount: 100,
                    spread: 360,
                    gravity: 0,
                    decay: 0.94,
                    startVelocity: 30,
                    origin: { y: Math.random(), x: Math.random() },
                });
            }, Math.random() * 1000);

        }

        containerRef.current?.classList.add('active');
        textRef.current?.classList.add('active');

        setTimeout(() => {
            containerRef.current?.classList.remove('active');
            textRef.current?.classList.remove('active');
            props.setPlay(false);
        }, 3000);

    }, [props.play]);

    return <>
        <div className="correct-game-container" id='tsparticles' ref={containerRef}>

            <span className="correct-game-text" ref={textRef}>Correct!</span>

        </div>
    </>;
}