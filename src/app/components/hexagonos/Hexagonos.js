"use client";
import React, { useState } from 'react';
import styles from './Hexagonos.module.css';

export default function HexagonosSVG(props) {
    const [hoveredPaths, setHoveredPaths] = useState([]);

    const handleMouseEnter = (index) => {
        setHoveredPaths(prevState => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
        });
    };

    const handleMouseLeave = (index) => {
        setTimeout(() => {
            setHoveredPaths(prevState => {
                const newState = [...prevState];
                newState[index] = false;
                return newState;
            });
        }, 1000);
    };

    return (
        !props.segundo ? (
            <svg
                width="206"
                height="229"
                viewBox="0 0 206 229"
                fill="none"
                className={props.svgStyle ? props.svgStyle : ""}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M-18.1823 127.082L-2.10216 97.7405L31.3481 96.9958L48.7182 125.592L32.638 154.933L-0.812257 155.678L-18.1823 127.082Z"
                    stroke="#EF233C"
                    strokeWidth="7"
                    fill={hoveredPaths[0] ? "#EF233C" : "none"}
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={() => handleMouseLeave(0)}
                    className={styles.path} />
                <path
                    d="M53.0685 82.2635L69.1487 52.9223L102.599 52.1776L119.969 80.774L103.889 110.115L70.4386 110.86L53.0685 82.2635Z"
                    stroke="#EF233C"
                    strokeWidth="7"
                    fill={hoveredPaths[1] ? "#EF233C" : "none"}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={() => handleMouseLeave(1)}
                    className={styles.path} />
                <path
                    d="M-15.9315 52.2635L0.148696 22.9223L33.599 22.1776L50.969 50.774L34.8889 80.1152L1.4386 80.8599L-15.9315 52.2635Z"
                    fill={hoveredPaths[2] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={() => handleMouseLeave(2)}
                    className={styles.path} />
                <path
                    d="M-20.3844 203.092L-4.30418 173.751L29.1461 173.006L46.5162 201.602L30.436 230.944L-3.01428 231.688L-20.3844 203.092Z"
                    fill={hoveredPaths[3] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={() => handleMouseLeave(3)}
                    className={styles.path} />
                <path
                    d="M52.3648 157.183L68.445 127.842L101.895 127.097L119.265 155.693L103.185 185.034L69.7349 185.779L52.3648 157.183Z"
                    fill={hoveredPaths[4] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(4)}
                    onMouseLeave={() => handleMouseLeave(4)}
                    className={styles.path} />
                <path
                    d="M117.114 121.274L133.194 91.9326L166.644 91.1879L184.014 119.784L167.934 149.125L134.484 149.87L117.114 121.274Z"
                    fill={hoveredPaths[5] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(5)}
                    onMouseLeave={() => handleMouseLeave(5)}
                    className={styles.path} />
                <path
                    d="M51.4136 234.102L67.4938 204.761L100.944 204.016L118.314 232.613L102.234 261.954L68.7837 262.699L51.4136 234.102Z"
                    fill={hoveredPaths[6] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(6)}
                    onMouseLeave={() => handleMouseLeave(6)}
                    className={styles.path} />
                <path
                    d="M120.163 193.193L136.243 163.852L169.693 163.107L187.063 191.704L170.983 221.045L137.533 221.79L120.163 193.193Z"
                    fill={hoveredPaths[7] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(7)}
                    onMouseLeave={() => handleMouseLeave(7)}
                    className={styles.path} />
            </svg>
        ) : (
            <svg
                width="227"
                height="233"
                viewBox="0 0 227 233"
                fill="none"
                className={props.svgStyle ? props.svgStyle : ""}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M292.063 64.7947L275.983 94.1358L242.533 94.8805L225.163 66.2841L241.243 36.943L274.693 36.1983L292.063 64.7947Z"
                    fill={hoveredPaths[0] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={() => handleMouseLeave(0)}
                    className={styles.path} />
                <path
                    d="M223.314 105.704L207.234 135.045L173.784 135.79L156.414 107.193L172.494 77.8521L205.944 77.1074L223.314 105.704Z"
                    fill={hoveredPaths[1] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={() => handleMouseLeave(1)}
                    className={styles.path} />
                <path
                    d="M152.063 150.522L135.983 179.863L102.533 180.608L85.1628 152.011L101.243 122.67L134.693 121.926L152.063 150.522Z"
                    fill={hoveredPaths[2] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={() => handleMouseLeave(2)}
                    className={styles.path} />
                <path
                    d="M221.063 180.522L204.983 209.863L171.533 210.608L154.163 182.011L170.243 152.67L203.693 151.926L221.063 180.522Z"
                    fill={hoveredPaths[3] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={() => handleMouseLeave(3)}
                    className={styles.path} />
                <path
                    d="M294.265 -11.2157L278.185 18.1254L244.735 18.8702L227.365 -9.72625L243.445 -39.0674L276.895 -39.8121L294.265 -11.2157Z"
                    fill={hoveredPaths[4] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(4)}
                    onMouseLeave={() => handleMouseLeave(4)}
                    className={styles.path} />
                <path
                    d="M225.516 29.6936L209.436 59.0347L175.986 59.7795L158.616 31.1831L174.696 1.84192L208.146 1.0972L225.516 29.6936Z"
                    fill={hoveredPaths[5] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(5)}
                    onMouseLeave={() => handleMouseLeave(5)}
                    className={styles.path} />
                <path
                    d="M152.767 75.6027L136.687 104.944L103.237 105.689L85.8665 77.0921L101.947 47.751L135.397 47.0063L152.767 75.6027Z"
                    fill={hoveredPaths[6] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(6)}
                    onMouseLeave={() => handleMouseLeave(6)}
                    className={styles.path} />
                <path
                    d="M88.0179 111.512L71.9377 140.853L38.4875 141.598L21.1174 113.001L37.1976 83.66L70.6478 82.9153L88.0179 111.512Z"
                    fill={hoveredPaths[7] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(7)}
                    onMouseLeave={() => handleMouseLeave(7)}
                    className={styles.path} />
                <path
                    d="M153.718 -1.31665L137.638 28.0245L104.188 28.7692L86.8177 0.172802L102.898 -29.1683L136.348 -29.9131L153.718 -1.3665Z"
                    fill={hoveredPaths[8] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(8)}
                    onMouseLeave={() => handleMouseLeave(8)}
                    className={styles.path} />
                <path
                    d="M84.969 39.5923L68.8888 68.9335L35.4386 69.6782L18.0685 41.0818L34.1487 11.7407L67.5989 10.9959L84.969 39.5923Z"
                    fill={hoveredPaths[9] ? "#EF233C" : "none"}
                    stroke="#EF233C"
                    strokeWidth="7"
                    onMouseEnter={() => handleMouseEnter(9)}
                    onMouseLeave={() => handleMouseLeave(9)}
                    className={styles.path} />
            </svg>
        )
    );
}
