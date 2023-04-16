export function shortenCoordinatesList({
  _coordinates,
  pointsQty,
}: {
  _coordinates: any[];
  pointsQty: number;
}): [number, number][] {
  const coordinates = flat(flat(flat(_coordinates)));
  const coordsQty = coordinates.length;
  const increaseUnit = Math.floor(coordsQty / pointsQty);
  const result = [];

  for (let i = 0; i < pointsQty; i += 1) {
    const coords = getCoords(coordinates[i * increaseUnit]);
    result.push(coords);
  }
  return result;

  function getCoords(coords: any[]): [number, number] {
    if (typeof coords[0] === "number") return coords as any;
    return getCoords(coords[0]);
  }
  function flat(coords: any[]): any[] {
    let result: any[] = [];
    for (let i = 0; i < coords.length; i += 1) {
      if (typeof coords[i][0] === "number") result.push(coords[i]);
      else result = [...result, ...coords[i]];
    }
    return result;
  }
}
export function getCenterCoordinates(
  coordinates: [number, number][],
): [number, number] {
  const numCoords = coordinates.length;

  if (numCoords === 0) {
    return [0, 0];
  }

  let x = 0;
  let y = 0;
  let z = 0;

  for (let i = 0; i < coordinates.length; i += 1) {
    const coord = coordinates[i];
    const latitude = (coord[1] * Math.PI) / 180;
    const longitude = (coord[0] * Math.PI) / 180;

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  }

  x /= numCoords;
  y /= numCoords;
  z /= numCoords;

  const centralLongitude = Math.atan2(y, x);
  const centralSquareRoot = Math.sqrt(x * x + y * y);
  const centralLatitude = Math.atan2(z, centralSquareRoot);

  const center: [number, number] = [
    (centralLatitude * 180) / Math.PI,
    (centralLongitude * 180) / Math.PI,
  ];

  return center;
}
