export const convertToRadian = (x) => {
  return (x * Math.PI) / 180;
};
export const convertToDegree = (x) => {
  return x * 57;
};
export const dotProduct = (point1, point2) => {
  let p1 = { x: point1.x, y: point1.y };
  let p2 = { x: point2.x, y: point2.y };
  return p1.x * p2.x + p1.y * p2.y;
};
export const absVector = (point) => {
  let p = { x: point.x, y: point.y };
  return Math.sqrt(p.x * p.x + p.y * p.y);
};
export const drawArcSvg = (
  centerPoint,
  radius,
  nPoints,
  startAngle,
  endAngle
) => {
  let step = (endAngle - startAngle) / nPoints;
  let firstX = -radius * Math.cos(convertToRadian(startAngle)) + centerPoint.x;
  let fristY = -radius * Math.sin(convertToRadian(startAngle)) + centerPoint.y;
  let path = "M" + firstX.toString() + " " + fristY.toString() + " ";
  for (let theta = startAngle + step; theta <= endAngle; theta += step) {
    let x = -radius * Math.cos(convertToRadian(theta)) + centerPoint.x;
    let y = -radius * Math.sin(convertToRadian(theta)) + centerPoint.y;
    path += "L" + x + " " + y + " ";
  }
  return path;
};
export const calcPoint = (centerPoint, radius, angle) => {
  let x = -radius * Math.cos(convertToRadian(angle)) + centerPoint.x;
  let y = -radius * Math.sin(convertToRadian(angle)) + centerPoint.y;
  return { x: x, y: y };
};
export const calcAngle = (pmin, pmax, pCurrnet, centerP, angMax, angMin) => {
  let pMin = { x: pmin.x - centerP.x, y: pmin.y - centerP.y };
  let pMax = { x: pmax.x - centerP.x, y: pmax.y - centerP.y };
  let p = { x: pCurrnet.x - centerP.x, y: pCurrnet.y - centerP.y };
  if (p.x < pMin.x) return angMax;
  if (p.x > pMax.x) return angMin;
  let angle = dotProduct(pMin, p) / (absVector(pMin) * absVector(p));
  angle = Math.acos(angle);
  angle = convertToDegree(angle);
  angle = angMax - angle;
  return angle;
};
