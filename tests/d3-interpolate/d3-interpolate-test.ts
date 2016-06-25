/**
 * Typescript definition tests for d3/d3-ease module
 * 
 * Note: These tests are intended to test the definitions only
 * in the sense of typing and call signature consistency. They
 * are not intended as functional tests.
 */

import * as d3Color from '../../src/d3-color';
import * as d3Interpolate from '../../src/d3-interpolate';

// Preparatory steps -------------------------------------------------------------------

interface InterpolationFn<T> {
    (t: number): T;
}

let iNum: InterpolationFn<number>,
    iString: InterpolationFn<string>,
    iArrayNum: InterpolationFn<Array<number>>,
    iArrayStr: InterpolationFn<Array<string>>,
    iKeyVal: InterpolationFn<{ [key: string]: any }>,
    iRGBColorObj: InterpolationFn<d3Color.RGBColor>,
    iZoom: d3Interpolate.ZoomInterpolationFn;

let num: number,
    str: string,
    arrNum: number[],
    arrStr: string[],
    objKeyVal: { [key: string]: any },
    objRGBColor: d3Color.RGBColor,
    zoom: [number, number, number];

// test interpolate(a, b) signature ----------------------------------------------------

iNum = d3Interpolate.interpolate('1', 5);


// color interpolator returning a color string
iString = d3Interpolate.interpolate('seagreen', d3Color.rgb(100, 100, 100));
iString = d3Interpolate.interpolate('seagreen', 'steelblue'); // as used with valid color name string

// regular string interpolator interpolating number strings (as the strings are not valid color strings)
iString = d3Interpolate.interpolate(1, '5');

iArrayNum = d3Interpolate.interpolate(['1', '2'], [4, 8]);
iArrayStr = d3Interpolate.interpolate(['1', '2'], ['4', '8']);

iKeyVal = d3Interpolate.interpolate({ x: 0, y: 1 }, { x: 1, y: 10, z: 100 });


// test interpolateNumber(a, b) signature ----------------------------------------------------

iNum = d3Interpolate.interpolateNumber(0, 100);
num = iNum(0.5);

// test interpolateNumber(a, b) signature ----------------------------------------------------

iNum = d3Interpolate.interpolateRound(0, 100);
num = iNum(0.5);

// test interpolateString(a, b) signature ----------------------------------------------------

iString = d3Interpolate.interpolateString('-1', '2');
str = iString(0.5);

// test interpolateArray(a, b) signature ----------------------------------------------------

iArrayNum = d3Interpolate.interpolateArray<number>([1, 2], [4, 8]); // explicit typing
arrNum = iArrayNum(0.5);

iArrayNum = d3Interpolate.interpolateArray<number>(['1', '2'], [4, 8]); // explicit typing
arrNum = iArrayNum(0.5);

iArrayStr = d3Interpolate.interpolateArray<string>(['1', '2'], ['4', '8']); // explicit typing
arrStr = iArrayStr(0.5);

iArrayStr = d3Interpolate.interpolateArray([1, 2], ['4', '8']); // infered typing <string>
arrStr = iArrayStr(0.5);

// test interpolateObject(a, b) signature ----------------------------------------------------

iKeyVal = d3Interpolate.interpolateObject({ x: 0, y: 1 }, { x: 1, y: 10, z: 100 });
objKeyVal = iKeyVal(0.5);

iRGBColorObj = d3Interpolate.interpolateObject<d3Color.RGBColor>(d3Color.rgb('steelblue'), d3Color.rgb('seagreen'));
objRGBColor = iRGBColorObj(0.5);

// test interpolateTransformCss(a, b) signature ----------------------------------------------------

iString = d3Interpolate.interpolateTransformCss('rotate(0deg)', 'rotate(60deg)');
str = iString(0.5);

// test interpolateTransformSvg(a, b) signature ----------------------------------------------------

iString = d3Interpolate.interpolateTransformSvg('rotate(0)', 'rotate(60)');
str = iString(0.5);


// test interpolateZoom(a, b) signature ----------------------------------------------------

iZoom = d3Interpolate.interpolateZoom([50, 50, 300], [100, 100, 500]);
zoom = iZoom(0.5);

console.log('Recommended transition duration = %d', iZoom.duration);

// test quantize(interpolator, n) signature ------------------------------------------------

arrNum = d3Interpolate.quantize(d3Interpolate.interpolateRound(-1, 2), 4); // infered template parameter type
arrStr = d3Interpolate.quantize<string>(d3Interpolate.interpolateString('-1', '2'), 4); // explicit template parameter typing

// arrStr = d3Interpolate.quantize<string>(d3Interpolate.interpolateRound(-1, 2), 4); // test fails, due to explicit typing v argument type mismatch

// test interpolateRgb(a, b) signatures ----------------------------------------------------------------

// without gamma correction
iString = d3Interpolate.interpolateRgb('seagreen', 'steelblue');
iString = d3Interpolate.interpolateRgb(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));
str = iString(0.5);

// with gamma correction
iString = d3Interpolate.interpolateRgb.gamma(2.2)("purple", "orange");

// test interpolateRgbBasis(color) and  interpolateRgbBasisClosed(color) signatures -------------------------

iString = d3Interpolate.interpolateRgbBasis(['seagreen', d3Color.rgb('steelblue'), 'rgb(100, 100, 100)']);
iString = d3Interpolate.interpolateRgbBasisClosed(['seagreen', d3Color.rgb('steelblue'), 'rgb(100, 100, 100)']);

// test interpolateHsl(a, b) and interpolateHslLong(a, b)----------------------------------------------------------------

iString = d3Interpolate.interpolateHsl('seagreen', 'steelblue');
iString = d3Interpolate.interpolateHsl(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));

iString = d3Interpolate.interpolateHslLong('seagreen', 'steelblue');
iString = d3Interpolate.interpolateHslLong(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));

// test interpolateLab(a, b) --------------------------------------------------------------------------------------------

iString = d3Interpolate.interpolateLab('seagreen', 'steelblue');
iString = d3Interpolate.interpolateLab(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));

// test interpolateHcl(a, b) and interpolateHclLong(a, b) ----------------------------------------------------------------

iString = d3Interpolate.interpolateHcl('seagreen', 'steelblue');
iString = d3Interpolate.interpolateHcl(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));

iString = d3Interpolate.interpolateHclLong('seagreen', 'steelblue');
iString = d3Interpolate.interpolateHclLong(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));

// test interpolateCubehelix(a, b) and interpolateCubehelixLong(a, b) ---------------------------------------------------

// without gamma correction
iString = d3Interpolate.interpolateCubehelix('seagreen', 'steelblue');
iString = d3Interpolate.interpolateCubehelix(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));
str = iString(0.5);

// with gamma correction
iString = d3Interpolate.interpolateCubehelix.gamma(2.2)("purple", "orange");

// without gamma correction
iString = d3Interpolate.interpolateCubehelixLong('seagreen', 'steelblue');
iString = d3Interpolate.interpolateCubehelixLong(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));
str = iString(0.5);

// with gamma correction
iString = d3Interpolate.interpolateCubehelixLong.gamma(2.2)("purple", "orange");



// test interpolateBasis(splineNodes) and interpolateBasisClosed(splineNodes: Array<number>) ----------------------------

iNum = d3Interpolate.interpolateBasis([1, 50, 30, 10]);

iNum = d3Interpolate.interpolateBasisClosed([1, 50, 30, 10]);