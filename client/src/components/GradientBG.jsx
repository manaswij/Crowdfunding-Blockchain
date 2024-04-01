import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap"
import { useGSAP } from "@gsap/react";

export default function GradientBG() {
    const interactive = useRef()

    /* gsap.registerPlugin(useGSAP);

    useGSAP(() => {
        gsap.set(interactive.current, { xPercent: -50, yPercent: -50 })

        window.addEventListener("mousemove", (e) => {
            gsap.to(interactive.current, {
                duration: 0.5,
                x: Math.round(e.clientX),
                y: Math.round(e.clientY),
                z: 0,
                ease: "power1.out",
                overwrite: "auto",
            });
        });
    }, null); */
    

    return (
        <div className='gradient-bg'>
            <svg xmlns='https://www.w3.org/2000/svg'>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in='SourceGraphic' stdDeviation={"10"} result='blur' />
                        <feColorMatrix in='blur' mode={"matrix"} values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8' result='goo' />
                        <feBlend in={"SourceGraphic"} in2={"goo"} />
                    </filter>
                </defs>
            </svg>
            <div className="gradients-container">
                <div className="g g1"></div>
                <div className="g g2"></div>
                <div className="g g3"></div>
                <div className="g g4"></div>
                <div className="g g5"></div>
                {/* <div ref={interactive} className="interactive"></div> */}
            </div>
        </div>
    )
}
