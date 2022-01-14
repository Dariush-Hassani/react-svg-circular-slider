import { useState, useEffect } from "react";
import { drawArcSvg, calcPoint, calcAngle } from "./Functions";
import { useSwipeable } from "react-swipeable";

const Swiper = () => {
  const [greatCircle, setGreateCircle] = useState("");
  const [arc, setArc] = useState("");
  const [circlePoint, setCirclePoint] = useState({ x: 0, y: 0 });
  const [liveArc, setLiveArc] = useState("");
  const littleRadius = 120;
  const bigRadius = 180;
  const angMin = 220;
  const angMax = 320;
  const maxNumber = 1000;
  const [number, setNumber] = useState(0);
  const [screenWidth, setScreenWidth] = useState(
    document.documentElement.offsetWidth
  );
  const [centerPoint, setCenterPoint] = useState({
    x: screenWidth / 2,
    y: 140
  });
  const initialDraw = () => {
    setGreateCircle(drawArcSvg(centerPoint, littleRadius, 360, -5, 360));
    setArc(drawArcSvg(centerPoint, bigRadius, 360, angMin, angMax));
    setCirclePoint(calcPoint(centerPoint, bigRadius, angMax));
    setLiveArc(drawArcSvg(centerPoint, bigRadius, 360, angMax - 1, angMax));
    setNumber(0);
  };
  useEffect(() => {
    initialDraw();
    const resize = () => {
      setScreenWidth(document.documentElement.offsetWidth);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    setCenterPoint({
      x: screenWidth / 2,
      y: 140
    });
  }, [screenWidth]);
  useEffect(() => {
    initialDraw();
    console.log(centerPoint);
  }, [centerPoint]);
  const config = {
    delta: 1, // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: false, // call e.preventDefault *See Details*
    trackTouch: true, // track touch input
    trackMouse: true, // track mouse input
    rotationAngle: 0 // set a rotation angle
  };
  const _handleStateChange = useSwipeable({
    onSwiping: (e) => {
      console.log(circlePoint.x + " " + circlePoint.y);
      let x, y;
      if (e.event.targetTouches !== undefined) {
        x = e.event.targetTouches[0].clientX;
        y = e.event.targetTouches[0].clientY - 40;
      } else {
        x = e.event.clientX;
        y = e.event.clientY - 40;
      }
      console.log(x + " " + y);
      let p = { x: x, y: y };
      let pMin = calcPoint(centerPoint, bigRadius, angMax);
      let pMax = calcPoint(centerPoint, bigRadius, angMin);
      if (p.y - centerPoint.y > bigRadius + 50) return;
      if (p.y - centerPoint.y < pMin.y - centerPoint.y - 20) return;
      let angle = calcAngle(pMin, pMax, p, centerPoint, angMax, angMin);
      setLiveArc(drawArcSvg(centerPoint, bigRadius, 360, angle - 1, angMax));
      setCirclePoint(calcPoint(centerPoint, bigRadius, angle));
      let percent = (angMax - angle) / (angMax - angMin);
      setNumber(Math.round(percent * maxNumber));
    },
    ...config
  });
  return (
    <div {..._handleStateChange}>
      <svg height="376" width="100%" style={{ marginTop: 50 }}>
        <path d={greatCircle} fill="none" strokeWidth="35" stroke="#D6FBF7" />
        <path
          d={arc}
          fill="none"
          strokeWidth="27"
          stroke="#D6FBF7"
          strokeLinecap="round"
        />
        <path
          d={liveArc}
          fill="none"
          strokeWidth="27"
          stroke="#74e8f6"
          strokeLinecap="round"
        />
        <circle cx={circlePoint.x} cy={circlePoint.y} r="20" fill="#26273b" />
        <text text-anchor="middle" x={centerPoint.x} y={centerPoint.y + 18}>
          {number === 0 ? "Swipe" : number}
        </text>
      </svg>
    </div>
  );
};

export default Swiper;
