/**
 * Typescript definition tests for d3/d3-geo module
 *
 * Note: These tests are intended to test the definitions only
 * in the sense of typing and call signature consistency. They
 * are not intended as functional tests.
 */

import * as d3Geo from '../../src/d3-geo';

// ----------------------------------------------------------------------
// Tests setup
// ----------------------------------------------------------------------
const feature: GeoJSON.Feature<MyGeoGeometry> = {
    'type': 'Feature',
    'id': '01',
    'properties': {
        'name': 'Alabama'
    },
    'geometry': {
        'type': 'Polygon',
        'coordinates':
        [
            [
                [-87.359296, 35.00118],
                [-85.606675, 34.984749],
                [-85.431413, 34.124869],
                [-85.184951, 32.859696],
                [-85.069935, 32.580372],
                [-84.960397, 32.421541],
                [-85.004212, 32.322956],
                [-84.889196, 32.262709],
                [-85.058981, 32.13674],
                [-85.053504, 32.01077],
                [-85.141136, 31.840985],
                [-85.042551, 31.539753],
                [-85.113751, 31.27686],
                [-85.004212, 31.003013],
                [-85.497137, 30.997536],
                [-87.600282, 30.997536],
                [-87.633143, 30.86609],
                [-87.408589, 30.674397],
                [-87.446927, 30.510088],
                [-87.37025, 30.427934],
                [-87.518128, 30.280057],
                [-87.655051, 30.247195], [-87.90699, 30.411504], [-87.934375, 30.657966], [-88.011052, 30.685351], [-88.10416, 30.499135], [-88.137022, 30.318396], [-88.394438, 30.367688], [-88.471115, 31.895754], [-88.241084, 33.796253], [-88.098683, 34.891641], [-88.202745, 34.995703], [-87.359296, 35.00118]
            ]
        ]
    }
};

const obj: GeoJSON.GeoJsonObject = {
    'type': 'Feature'
};

interface MyGeoGeometry extends GeoJSON.GeometryObject {

}

// ----------------------------------------------------------------------
// Spherical Math
// ----------------------------------------------------------------------
let area: number = d3Geo.geoArea(feature);
let bounds: [[number, number], [number, number]] = d3Geo.geoBounds(feature);
let centroid: [number, number] = d3Geo.geoCentroid(feature);
let distance: number = d3Geo.geoDistance([54, 2], [53, 1]);
let length: number = d3Geo.geoLength(feature);
let interpolateFct: (t: number) => [number, number] = d3Geo.geoInterpolate([54, 2], [53, 1]);
let rotation: d3Geo.Rotation = d3Geo.geoRotation([90, 45]);
let rotation2: d3Geo.Rotation = d3Geo.geoRotation([90, 45, 27.5]);

// ----------------------------------------------------------------------
// Rotation interface
// ----------------------------------------------------------------------
let point: [number, number] = rotation([54, 2]);
let inverted: [number, number] = rotation.invert([54, 2]);

// ----------------------------------------------------------------------
// Spherical Shapes
// ----------------------------------------------------------------------
let circleGenerator: d3Geo.CircleGenerator = d3Geo.geoCircle();
let graticuleGenerator: d3Geo.GraticuleGenerator = d3Geo.graticule();

// ----------------------------------------------------------------------
// CircleGenerator interface
// ----------------------------------------------------------------------
let polygon: GeoJSON.Polygon = circleGenerator();
// TODO is this correct?
let centerFct: ((...args: any[]) => [number, number]) | [number, number] = circleGenerator.center();
let generator1: d3Geo.CircleGenerator = circleGenerator.center(() => [54, 2]);
let generator2: d3Geo.CircleGenerator = circleGenerator.center([54, 2]);
// TODO is this correct?
let radius: ((...args: any[]) => number) | number = circleGenerator.radius();
let generator3: d3Geo.CircleGenerator = circleGenerator.radius(() => 5);
let generator4: d3Geo.CircleGenerator = circleGenerator.radius(2);
// TODO is this correct?
let precision: ((...args: any[]) => number) | number = circleGenerator.precision();
let generator5: d3Geo.CircleGenerator = circleGenerator.precision(() => 5);
let generator6: d3Geo.CircleGenerator = circleGenerator.precision(2);

// ----------------------------------------------------------------------
// GraticuleGenerator interface
// ----------------------------------------------------------------------
let multiString: GeoJSON.MultiLineString = graticuleGenerator();
let lines: GeoJSON.LineString[] = graticuleGenerator.lines();
let polygon2: GeoJSON.Polygon = graticuleGenerator.outline();
let extent: [[number, number], [number, number]] = graticuleGenerator.extent();
let generator11: d3Geo.GraticuleGenerator = graticuleGenerator.extent([[-180, -80], [180, 80]]);
let extentMajor: [[number, number], [number, number]] = graticuleGenerator.extentMajor();
let generator12: d3Geo.GraticuleGenerator = graticuleGenerator.extentMajor([[-180, -80], [180, 80]]);
let extentMinor: [[number, number], [number, number]] = graticuleGenerator.extentMinor();
let generator13: d3Geo.GraticuleGenerator = graticuleGenerator.extentMinor([[-180, -80], [180, 80]]);
let step: [number, number] = graticuleGenerator.step();
let generator14: d3Geo.GraticuleGenerator = graticuleGenerator.step([10, 10]);
let stepMajor: [number, number] = graticuleGenerator.stepMajor();
let generator15: d3Geo.GraticuleGenerator = graticuleGenerator.stepMajor([10, 10]);
let stepMinor: [number, number] = graticuleGenerator.stepMinor();
let generator16: d3Geo.GraticuleGenerator = graticuleGenerator.stepMinor([10, 10]);
let precision1: number = graticuleGenerator.precision();
let generator17: d3Geo.GraticuleGenerator = graticuleGenerator.precision(5);

// ----------------------------------------------------------------------
// Projections
// ----------------------------------------------------------------------
let geoPath: d3Geo.GeoPath<MyGeoGeometry> = d3Geo.geoPath<MyGeoGeometry>();

let azimuthalEqualAreaRaw: d3Geo.RawProjection = d3Geo.geoAzimuthalEqualAreaRaw();
let azimuthalEquidistantRaw: d3Geo.RawProjection = d3Geo.geoAzimuthalEquidistantRaw();
let conicConformalRaw: d3Geo.RawProjection = d3Geo.geoConicConformalRaw(0, 0);
let conicEqualAreaRaw: d3Geo.RawProjection = d3Geo.geoConicEqualAreaRaw(0, 0);
let conicEquidistantRaw: d3Geo.RawProjection = d3Geo.geoConicEquidistantRaw(0, 0);
let equirectangularRaw: d3Geo.RawProjection = d3Geo.geoEquirectangularRaw();
let gnomonicRaw: d3Geo.RawProjection = d3Geo.geoGnomonicRaw();
let mercatorRaw: d3Geo.RawProjection = d3Geo.geoMercatorRaw();
let orthographicRaw: d3Geo.RawProjection = d3Geo.geoOrthographicRaw();
let stereographicRaw: d3Geo.RawProjection = d3Geo.geoStereographicRaw();
let transverseMercatorRaw: d3Geo.RawProjection = d3Geo.geoTransverseMercatorRaw();

let geoProjection: d3Geo.Projection = d3Geo.geoProjection(azimuthalEqualAreaRaw);
let mutate: () => d3Geo.Projection = d3Geo.geoProjectionMutator(() => azimuthalEqualAreaRaw);
let constructedProjection: d3Geo.Projection = mutate();

let azimuthalEqualArea: d3Geo.Projection = d3Geo.geoAzimuthalEqualArea();
let azimuthalEquidistant: d3Geo.Projection = d3Geo.geoAzimuthalEquidistant();
let conicConformal: d3Geo.ConicProjection = d3Geo.geoConicConformal();
let conicEqualArea: d3Geo.ConicProjection = d3Geo.geoConicEqualArea();
let conicEquidistant: d3Geo.ConicProjection = d3Geo.geoConicEquidistant();
let cquirectangular: d3Geo.Projection = d3Geo.geoEquirectangular();
let gnomonic: d3Geo.Projection = d3Geo.geoGnomonic();
let mercator: d3Geo.Projection = d3Geo.geoMercator();
let orthographic: d3Geo.Projection = d3Geo.geoOrthographic();
let stereographic: d3Geo.Projection = d3Geo.geoStereographic();
let transverseMercator: d3Geo.Projection = d3Geo.geoTransverseMercator();

let geoClipExtent: d3Geo.Extent = d3Geo.geoClipExtent();

// ----------------------------------------------------------------------
// GeoPath interface
// ----------------------------------------------------------------------
let geoPathArea: number = geoPath.area(feature);
let geoPathBounds: [[number, number], [number, number]] = geoPath.bounds(feature);
let geoPathCentroid: [number, number] = geoPath.centroid(feature);
let geoPathProjection: d3Geo.Projection = geoPath.projection();
let geoPath2: d3Geo.GeoPath<MyGeoGeometry> = geoPath.projection(azimuthalEqualArea);
let geoPathContext: d3Geo.Context = geoPath.context();
let geoPath3: d3Geo.GeoPath<MyGeoGeometry> = geoPath.context({
    beginPath: () => { return; },
    moveTo: (x: number, y: number) => { return; },
    lineTo: (x: number, y: number) => { return; },
    arc: (x, y, radius, startAngle, endAngle) => { return; },
    closePath: () => { return; }
});
let geoPathPointRadius: number = geoPath.pointRadius();
let geoPath4: d3Geo.GeoPath<MyGeoGeometry> = geoPath.pointRadius(5);

// ----------------------------------------------------------------------
// RawProjection interface
// ----------------------------------------------------------------------
let rawProjectionPoint: [number, number] = azimuthalEqualAreaRaw(54, 2);
let rawProjectionInvertedPoint: [number, number] = azimuthalEqualAreaRaw.invert(180, 6);

// ----------------------------------------------------------------------
// Projection interface
// ----------------------------------------------------------------------
let projected: [number, number] = constructedProjection([54, 2]);
let inverted2: [number, number] = constructedProjection.invert([54, 2]);

// TODO ?????
// let stream: d3Geo.Stream = constructedProjection.stream([54, 2]);

let clipAngle: number = constructedProjection.clipAngle();
let constructedProjection1: d3Geo.Projection = constructedProjection.clipAngle(null);
let constructedProjection2: d3Geo.Projection = constructedProjection.clipAngle(45);

let clipExtent: [[number, number], [number, number]] = constructedProjection.clipExtent();
let constructedProjection3: d3Geo.Projection = constructedProjection.clipExtent(null);
let constructedProjection4: d3Geo.Projection = constructedProjection.clipExtent([[0, 0], [1, 1]]);

let scale: number = constructedProjection.scale();
let constructedProjection5: d3Geo.Projection = constructedProjection.scale(45);

let translate: [number, number] = constructedProjection.translate();
let constructedProjection6: d3Geo.Projection = constructedProjection.translate([480, 250]);

let center: [number, number] = constructedProjection.center();
let constructedProjection7: d3Geo.Projection = constructedProjection.center([0, 0]);

let rotate: [number, number, number] = constructedProjection.rotate();
let constructedProjection8: d3Geo.Projection = constructedProjection.rotate([0, 0]);
let constructedProjection9: d3Geo.Projection = constructedProjection.rotate([0, 0, 0]);

let precision2: number = constructedProjection.precision();
let constructedProjection10: d3Geo.Projection = constructedProjection.precision(0.707);

let fitExtent: d3Geo.Projection = constructedProjection.fitExtent([[0, 0], [960, 500]], obj);
let fitSize: d3Geo.Projection = constructedProjection.fitSize([960, 500], obj);

// ----------------------------------------------------------------------
// ConicProjection interface
// ----------------------------------------------------------------------
let parallels: [number, number] = conicConformal.parallels();
let conicProjection: d3Geo.ConicProjection = conicConformal.parallels([20, 20]);

// ----------------------------------------------------------------------
// Extent interface
// ----------------------------------------------------------------------
let extent2: [[number, number], [number, number]] = geoClipExtent.extent();
let geoClipExtent2: d3Geo.Extent = geoClipExtent.extent([[0, 0], [960, 500]]);
let stream: d3Geo.Stream = geoClipExtent.stream();
let geoClipExtent3: d3Geo.Extent = geoClipExtent.stream(stream);

// ----------------------------------------------------------------------
// Stream interface
// ----------------------------------------------------------------------
// Weird to be able to assign void type to a variable
let void1: void = stream.point(0,0);
let void2: void = stream.point(0,0,0);
let void3: void = stream.lineStart();
let void4: void = stream.lineEnd();
let void5: void = stream.polygonStart();
let void6: void = stream.polygonEnd();
let void7: void = stream.sphere();

// ----------------------------------------------------------------------
// Context interface
// ----------------------------------------------------------------------
let context: d3Geo.Context = {
    beginPath: () => { return; },
    moveTo: (x: number, y: number) => { return; },
    lineTo: (x: number, y: number) => { return; },
    arc: (x, y, radius, startAngle, endAngle) => { return; },
    closePath: () => { return; }
};

// ----------------------------------------------------------------------
// Projection Streams
// ----------------------------------------------------------------------
let void8: void = d3Geo.geoStream(obj, stream);
// TODO
let transformFunction: { stream: (s: d3Geo.Stream) => {} } = d3Geo.geoTransform({});

