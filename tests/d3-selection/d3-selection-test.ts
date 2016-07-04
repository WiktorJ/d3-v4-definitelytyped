
/**
 * Typescript definition tests for d3/d3-selection module
 * 
 * Note: These tests are intended to test the definitions only
 * in the sense of typing and call signature consistency. They
 * are not intended as functional tests.
 */

import * as d3Selection from '../../src/d3-selection';


// ---------------------------------------------------------------------------------------
// Some preparatory work for definition testing below
// ---------------------------------------------------------------------------------------

// Generic DOM related variables
let xDoc: Document,
    xWindow: Window;

interface BodyDatum {
    foo: string;
    bar: number;
}

interface DivDatum {
    padding: string;
    text: string;
}

interface SVGDatum {
    width: number;
    height: number;
}

interface CircleDatum {
    nodeId: string;
    name: string;
    label: string;
    cx: number;
    cy: number;
    r: number;
}

interface CircleDatumAlternative {
    nodeId: string;
    name: string;
    label: string;
    cx: number;
    cy: number;
    r: number;
    color: string;
}

// ---------------------------------------------------------------------------------------
// Tests of Top-Level Selection Functions
// ---------------------------------------------------------------------------------------


// test top-level .selection() -----------------------------------------------------------

let topSelection: d3Selection.Selection<HTMLElement, any, null, undefined> = d3Selection.selection();

// test top-level select() ---------------------------------------------------------------

// Using select() with string argument and no type parameters creates selection
// with Group element of type BaseType and datum of type 'any'. The parent element is of type HTMLElement with datum of type 'any'

let baseTypeEl: d3Selection.Selection<d3Selection.BaseType, any, HTMLElement, any> = d3Selection.select('body');

// Using select() with string argument and type parameters creates selection
// with Group element of type HTMLBodyElement and datum of BodyDatum type. The parent element is of type HTMLElement with datum of type 'any'

let body: d3Selection.Selection<HTMLBodyElement, BodyDatum, HTMLElement, any> = d3Selection.select<HTMLBodyElement, BodyDatum>('body');

// Using select() with node argument and no type parameters creates selection
// with Group element of type BaseType and datum of type 'any' The parent element is of type 'null' with datum of type 'undefined'

let baseTypeEl2: d3Selection.Selection<d3Selection.BaseType, any, null, undefined> = d3Selection.select(baseTypeEl.node());
// let body2: d3Selection.Selection<HTMLElement, any, null, undefined> = d3Selection.select(baseTypeEl.node()); // Fails, group element types not of compatible for baseTypeEl

let body3: d3Selection.Selection<HTMLBodyElement, any, null, undefined> = d3Selection.select(body.node()); // element types match, but datum is of type 'any' as it cannot be inferred from .node()

// Using select() with node argument and type parameters creates selection
// with Group element of type HTMLBodyElement and datum of BodyDatum type. The parent element is of type 'null' with datum of type 'undefined'

let body4: d3Selection.Selection<HTMLBodyElement, BodyDatum, null, undefined> = d3Selection.select<HTMLBodyElement, BodyDatum>(body.node());

// d3Selection.select<HTMLBodyElement, BodyDatum>(baseTypeEl.node()); // fails as baseTypeEl.node() is not of type HTMLBodyElement


// TODO: The below are related to github issue #2 (BaseType choice)

// d3Selection.select(xDoc); // Note: Creates error because BaseType for selection is Element (-> e.g. classList property missing)
// d3Selection.select(xWindow); // Note: Creates error because BaseType for selection is Element (-> e.g. classList property missing)


// test top-level selectAll() -------------------------------------------------------------


// Using selectAll(), selectAll(null) or selectAll(undefined) creates an empty selection

let emptyRootSelection: d3Selection.Selection<undefined, undefined, null, undefined> = d3Selection.selectAll();
emptyRootSelection = d3Selection.selectAll(null);
emptyRootSelection = d3Selection.selectAll(undefined);

// Using selectAll(...) with string argument and no type parameters creates selection
// with Group elements of type BaseType and datum of type 'any'. The parent element is of type HTMLElement with datum of type 'any'

let baseTypeElements: d3Selection.Selection<d3Selection.BaseType, any, HTMLElement, any> = d3Selection.selectAll('div');

// Using selectAll() with string argument and type parameters creates selection
// with Group element of type HTMLDivElement and datum of DivDatum type. The parent element is of type HTMLElement with datum of type 'any'

let divElements: d3Selection.Selection<HTMLDivElement, DivDatum, HTMLElement, any> = d3Selection.selectAll<HTMLDivElement, DivDatum>('div');

// Using selectAll(...) with node array argument and no type parameters creates selection
// with Group element of type BaseType and datum of type 'any' The parent element is of type 'null' with datum of type 'undefined'

let baseTypeElements2: d3Selection.Selection<d3Selection.BaseType, any, null, undefined> = d3Selection.selectAll(baseTypeElements.nodes());
// let divElements2: d3Selection.Selection<HTMLDivElement, any, null, undefined> = d3Selection.selectAll(baseTypeElements.nodes()); // Fails, group elements types not of compatible for baseTypeElements

let divElements3: d3Selection.Selection<HTMLDivElement, any, null, undefined> = d3Selection.selectAll(divElements.nodes()); // element types match, but datum is of type 'any' as it cannot be inferred from .nodes()


// Using selectAll(...) with node array argument and type parameters creates selection
// with Group element of type HTMLDivElement and datum of DivDatum type. The parent element is of type 'null' with datum of type 'undefined'

let divElements4: d3Selection.Selection<HTMLDivElement, DivDatum, null, undefined> = d3Selection.selectAll<HTMLDivElement, DivDatum>(divElements.nodes());

// d3Selection.selectAll<HTMLDivElement, DivDatum>(baseTypeElements.nodes()); // fails as baseTypeEl.node() is not of type HTMLBodyElement


// selectAll(...) accepts NodeListOf<...> argument


let xSVGCircleElementList: NodeListOf<SVGCircleElement>;
let circleSelection: d3Selection.Selection<SVGCircleElement, any, null, undefined> = d3Selection.selectAll(xSVGCircleElementList);

// selectAll(...) accepts HTMLCollection, HTMLCollectionOf<...> argument

let documentLinks: d3Selection.Selection<HTMLAnchorElement | HTMLAreaElement, any, null, undefined> = d3Selection.selectAll(document.links);



// ---------------------------------------------------------------------------------------
// Tests of Sub-Selection Functions
// ---------------------------------------------------------------------------------------



// select(...) sub-selection --------------------------------------------------------------

// Expected: datum propagates down from selected element to sub-selected descendant element
// Parent element and Parent Datum of sub-selected element is the same as starting selection

// Using select(...) sub-selection with a string argument. 

let svgEl: d3Selection.Selection<SVGSVGElement, SVGDatum, HTMLElement, any> = d3Selection.select<SVGSVGElement, SVGDatum>('svg');

let firstG: d3Selection.Selection<SVGGElement, SVGDatum, HTMLElement, any> = svgEl.select<SVGGElement>('g');
// let firstG_2: d3Selection.Selection<SVGGElement, SVGDatum, SVGSVGElement, any> = svgEl.select<SVGGElement>('g'); // fails, parent element of selection does not change with .select(...)
// firstG = svgEl.select('g'); // fails, element type defaults to 'any', but SVGGElement expexted on left-hand side
// firstG = svgEl.select<SVGSVGElement>('svg'); // fails, element type of SVGSVGElement provided, but SVGGElement expexted on left-hand side (silly test to begin with)


// Using select(...) sub-selection with a selector function argument.

function svgGroupSelector(this: SVGSVGElement, d: SVGDatum, i: number, groups: Array<SVGSVGElement>): SVGGElement {
    return this.querySelector('g'); // this-type compatible with group element-type to which the selector function will be appplied
}

firstG = svgEl.select(svgGroupSelector);

firstG = svgEl.select(function () {
    console.log('Get <svg> Element width using "this": ', this.width.baseVal.value); // 'this' type is SVGSVGElement
    return this.querySelector('g'); // this of type SVGSVGElement by type inference
});

firstG = svgEl.select(function (d, i, group) {
    console.log('Get <svg> Element width using "this": ', this.width.baseVal.value); // 'this' type is SVGSVGElement
    console.log('Width in datum:', d.width); // d is type of originating selection element Datum:  SVGDatum
    if (group.length > 1) {
        console.log('Get width of 2nd <svg> Element in group: ', group[1].width.baseVal.value); // type is SVGSVGElement
    }
    return this.querySelector('g'); // this of type SVGSVGElement by type inference
});


// firstG = svgEl.select(function() {
//     return this.querySelector('a'); // fails, return type HTMLAnchorElement is not compatible with SVGGElement expected by firstG
// });


// selectAll(...) sub-selection --------------------------------------------------------------

// Expected: datum from selected element(s) does not propagate down to sub-selected descendant elements.
// Group elements of original selection become Parent elements in sub-selection.

// selectAll(), selectAll(null) selectAll(undefined) return empty sub-selection

let emptySubSelection: d3Selection.Selection<undefined, undefined, SVGSVGElement, SVGDatum> = svgEl.selectAll();
emptySubSelection = svgEl.selectAll(null);
emptySubSelection = svgEl.selectAll(undefined);

// Using selectAll(...) sub-selection with a string argument.

let elementsUnknownData: d3Selection.Selection<d3Selection.BaseType, any, SVGSVGElement, SVGDatum> = svgEl.selectAll('g');
let gElementsOldData: d3Selection.Selection<SVGGElement, CircleDatum, SVGSVGElement, SVGDatum> = svgEl.selectAll<SVGGElement, CircleDatum>('g');
// gElementsOldData = svgEl.selectAll('g'); // fails default type parameters of selectAll for group element type and datum type do not match


// Using selectAll(...) sub-selection with a selector function argument.

function svgGroupSelectorAll(this: SVGSVGElement, d: SVGDatum, i: number, groups: Array<SVGSVGElement>): NodeListOf<SVGGElement> {
    return this.querySelectorAll('g'); // this-type compatible with group element-type to which the selector function will be appplied
}

gElementsOldData = svgEl.selectAll<SVGGElement, CircleDatum>(svgGroupSelectorAll);

gElementsOldData = svgEl.selectAll<SVGGElement, CircleDatum>(function () {
    console.log('Get <svg> Element width using "this": ', this.width.baseVal.value); // 'this' type is SVGSVGElement
    return this.querySelectorAll('g'); // this of type SVGSVGElement by type inference
});

gElementsOldData = svgEl.selectAll<SVGGElement, CircleDatum>(function (d, i, group) { // fails, because Datum type is not compatible as selectAll defaults to 'any', but gElementsOldData expects CircleDatum
    console.log('Get <svg> Element width using "this": ', this.width.baseVal.value); // 'this' type is SVGSVGElement
    console.log('Width in datum:', d.width); // type of d is SVGDatum
    if (group.length > 1) {
        console.log('Get width of 2nd <svg> Element in group: ', group[1].width.baseVal.value); // type of group is SVGSVGElement[]
    }
    return this.querySelectorAll('g');
});

// gElementsOldData = svgEl.selectAll(function() { // fails, because Datum type is not compatible as selectAll defaults to 'any', but gElementsOldData expects CircleDatum
//     return this.querySelectorAll('g');  
// });

// gElementsOldData = svgEl.selectAll<SVGGElement, CircleDatum>(function() {  // fails, return type HTMLAnchorElement is not compatible with SVGGElement expected by selectAll-typing
//     return this.querySelectorAll('a');
// });

elementsUnknownData = svgEl.selectAll(svgGroupSelectorAll);

elementsUnknownData = svgEl.selectAll(function () {
    console.log('Get <svg> Element width using "this": ', this.width.baseVal.value); // 'this' type is SVGSVGElement
    return this.querySelectorAll('g'); // this of type SVGSVGElement by type inference
});

// gElementsUnknownData = svgEl.selectAll(function() { // fails, return type HTMLAnchorElement is not compatible with SVGGElement
//     return this.querySelectorAll('a');
// });


// Selection Helper methods -------------------------------------------------------------

// selector(...) and selectorAll(...) ----------------------------------------------------


// d3Selection.select<SVGGElement>(d3Selection.selector<SVGGElement>('g')); // fails, selector as argument to top-level select not supported

// supported on sub-selection
firstG = svgEl.select(d3Selection.selector<SVGGElement>('g')); // type parameter of select(...) inferred
// firstG = svgEl.select<SVGGElement>(d3Selection.selector<HTMLDivElement>('div')); // fails, select and selector mismatch

gElementsOldData = svgEl.selectAll<SVGGElement, CircleDatum>(d3Selection.selectorAll<SVGGElement>('g'));

// filter() ------------------------------------------------------------------------------

let filterdGElements: d3Selection.Selection<SVGGElement, CircleDatum, SVGSVGElement, SVGDatum>;

filterdGElements = gElementsOldData.filter('.top-level');

filterdGElements = gElementsOldData.filter(function (d, i, group) {
    console.log('Element Id of <g> DOM element: ', this.id); // this context SVGGElement
    if (group.length > 0) {
        console.log('Element Id of first <g> DOM element in group: ', group[0].id); // group: Array<SVGGElement>
    }
    return d.r > 10; // uses CircleDatum
});

// matcher() -----------------------------------------------------------------------------

filterdGElements = gElementsOldData.filter(d3Selection.matcher('.top-level'));


// ---------------------------------------------------------------------------------------
// Tests of Modification
// ---------------------------------------------------------------------------------------

// Getter return values tests -------------------------------------------------------------

let flag: boolean,
    str: string,
    dummy: any;

flag = body.classed('any-class');
str = body.attr('class');
str = body.style('background-color');
dummy = body.property('foo'); // arbitrary property
str = body.text();
str = body.html();

// Setters tests -------------------------------------------------------------------------


let circles: d3Selection.Selection<SVGCircleElement, CircleDatumAlternative, HTMLElement, any>;
let divs: d3Selection.Selection<HTMLDivElement, DivDatum, HTMLElement, any>;

// attr(...) Tests

circles = d3Selection.selectAll<SVGCircleElement, CircleDatumAlternative>('circle')
    .attr('cx', 10) // number
    .attr('stroke', 'blue'); // string

circles = circles // re-assignment test chaining return-type
    .attr('cx', function (d, i, group) {
        console.log('Pre-change center x-coordinate: ', this.cx.baseVal.value); // this context SVGCircleElement
        if (group.length > 0) {
            console.log('Owner SVG Element of first group element:', group[0].ownerSVGElement); // group : Array<SVGCircleElement>
        }
        return d.cx; // numeric return value
    })
    .attr('stroke', function (d) {
        return d.color; // string return value
    });

divs = d3Selection.selectAll<HTMLDivElement, DivDatum>('div')
    .attr('contenteditable', false) // boolean
    .attr('contenteditable', function () {
        return false; // boolean return value
    });

// classed(...) Tests

divs = divs
    .classed('success', true);

divs = divs
    .classed('zero-px-padding', function (d, i, group) {
        console.log('Client Rectangle Top: ', this.getBoundingClientRect().top); // this context HTMLDivElement
        if (group.length > 0) {
            console.log('Alignment of first group element:', group[0].align); // group : Array<HTMLDivElement>
        }
        return d.padding === '0px'; // boolean return value
    });


// style(...) Tests

divs = divs
    .style('background-color', 'blue') // string
    .style('hidden', false) // boolean
    // .style('color', 'green', 'test') // fails, invalid priority value
    .style('color', 'green', 'important');

divs = divs
    .style('padding', function (d, i, group) {
        console.log('Client Rectangle Top: ', this.getBoundingClientRect().top); // this context HTMLDivElement
        if (group.length > 0) {
            console.log('Alignment of first group element:', group[0].align); // group : Array<HTMLDivElement>
        }
        return d.padding; // string return value
    })
    .style('hidden', function () {
        return true;
    }, null) // boolean return + test: priority = null
    //    .style('color', function () { return 'green'; }, 'test') // fails, test: invalid priority value
    .style('color', function () { return 'green'; }, 'important'); // boolean return + test: priority = 'important';


// property(...) Tests

circles = circles
    .property('__hitchhikersguide__', {
        value: 42,
        survival: 'towel'
    }); // any 

circles = circles
    .property('__hitchhikersguide__', function (d, i, group) {
        console.log('Pre-change center x-coordinate: ', this.cx.baseVal.value); // this context SVGCircleElement
        if (group.length > 0) {
            console.log('Owner SVG Element of first group element:', group[0].ownerSVGElement); // group : Array<SVGCircleElement>
        }
        return {
            value: 42,
            survival: 'towel'
        }; // returns not so arbitrary object, again
    });

// text(...) test

body = body
    .text('Not so meaningful blurp.') // string
    .text(42) // number will be converted to string by D3
    .text(true); // boolean will be converted to string by D3

body = body
    .text(function (d) {
        console.log('Body background color: ', this.bgColor); // this context HTMLBodyElement
        return d.foo; // BodyDatum
    })
    .text(function (d) {
        return 42; // number will be converted to string by D3
    })
    .text(function (d) {
        return true; // boolean will be converted to string by D3
    });

body = body
    .html('<div> 42 </div>');

body = body
    .html(function (d) {
        return '<div> Body Background Color: ' + this.bgColor + ', Foo Datum: ' + d.foo + '</div>'; // this context HTMLBodyElement, datum BodyDatum
    });

// ---------------------------------------------------------------------------------------
// Tests of Datum and Data Join
// ---------------------------------------------------------------------------------------


let data: Array<CircleDatum> = [
    { nodeId: 'c1', cx: 10, cy: 10, r: 5, name: 'foo', label: 'Foo' },
    { nodeId: 'c2', cx: 20, cy: 20, r: 5, name: 'bar', label: 'Bar' },
    { nodeId: 'c3', cx: 30, cy: 30, r: 5, name: 'fooBar', label: 'Foo Bar' }
];

let data2: Array<CircleDatumAlternative> = [
    { nodeId: 'c1', cx: 10, cy: 10, r: 5, name: 'foo', label: 'Foo', color: 'seagreen' },
    { nodeId: 'c2', cx: 20, cy: 20, r: 5, name: 'bar', label: 'Bar', color: 'midnightblue' },
    { nodeId: 'c4', cx: 10, cy: 15, r: 10, name: 'newbie', label: 'Newbie', color: 'red' }
];


// Tests of Datum -----------------------------------------------------------------------

// TEST GETTER
let bodyDatum: BodyDatum = body.datum();

// TEST REMOVE DATUM
body.datum(null); // removes datum, i.e. return type has group datum type 'undefined'

// TEST SETTER METHODS

let newBodyDatum: { newFoo: string };

// object-based

newBodyDatum = body.datum({ newFoo: 'new foo' }).datum(); // inferred type

// body.datum<BodyDatum>({ newFoo: 'new foo' }); // fails, data type incompatible

// function-based

newBodyDatum = body.datum(function (d) {
    console.log('HTML5 Custom Data Attributes of body: ', this.dataset); // this typings HTMLBodyElement
    console.log('Old foo:', d.foo); // current data of type BodyDatum
    return { newFoo: 'new foo' };
}).datum(); // inferred type

// newBodyDatum = body.datum<BodyDatum>(function (d) { // fails, data type incompatible with return value type
//     console.log('HTML5 Custom Data Attributes of body: ', this.dataset); // this typings HTMLBodyElement
//     return { newFoo: 'new foo' };
// }).datum(); // inferred type


// SCENARIO 1: Fully type-parameterized

// object-based

d3Selection.select<SVGSVGElement, SVGDatum>('#svg-1')
    .select<SVGGElement>('g.circles-group') // first matching element only
    .datum<CircleDatumAlternative[]>(data2)
    .classed('has-transform-property', function (d) {
        console.log('Color of first data element array', d.length > 0 ? d[0].color : 'Data array empty');
        return this.transform !== undefined;
    });

// SCENARIO 2: Partially type-parameterized (To have DOM object type -> 'this' and datum-type in 'classed' method call)

d3Selection.select('#svg-1') // irrelevant typing to get contextual typing in last step of chain
    .select<SVGGElement>('g.circles-group')
    .datum(data2) // new data type inferred
    .classed('has-transform-property', function (d) {
        console.log('Color of first data element array', d.length > 0 ? d[0].color : 'Data array empty'); // CircleDatumAlternative type
        return this.transform !== undefined;
    });

// below fails, as 'this' in .classed(...) will default to BaseType, which does not have 'transform' property

// d3Selection.select('#svg-1') // irrelevant typing to get contextual typing in last step of chain
//     .select('g.circles-group') // missing typing of selected DOM element for use in .classed(...)
//     .datum(data2) // new data type inferred
//     .classed('has-transform-property', function (d) {
//         console.log('Color of first data element array', d.length > 0? d[0].color:  'Data array empty'); // CircleDatumAlternative type
//         return this.transform !== undefined;
//     });

// SCENARIO 3: Only inferred typing (To have datum-type in 'classed' method call, no need for DOM object access)

d3Selection.select('#svg-1') // irrelevant typing to get contextual typing in last step of chain
    .select('g.circles-group') // irrelevant typing to get contextual typing in last step of chain
    .datum(data2) // new data type inferred
    .classed('has-green-first-data-element', function (d) {
        return d.length > 0 && d[0].color === 'green';
    });


// Tests of Data Join --------------------------------------------------------------------


let dimensions: SVGDatum = {
    width: 500,
    height: 300
};

let startCircleData: Array<CircleDatumAlternative>,
    endCircleData: Array<CircleDatumAlternative>;

let circles2: d3Selection.Selection<SVGCircleElement, CircleDatumAlternative, SVGSVGElement, SVGDatum>;

// Test creating initial data-driven circle selection
// and append materialized SVGCircleElement per enter() selection element
// - use data(...) with array-signature and infer data type from arrray type passed into data(...)
// - use enter() to obtain enter selection
// - materialize svg circles using append(...) with type-parameter and string argument

circles2 = d3Selection.select<SVGSVGElement, any>('#svg2')
    .datum(dimensions)
    .attr('width', function (d) { return d.width; })
    .attr('height', function (d) { return d.height; })
    .selectAll() // create empty Selection
    .data(startCircleData) // assign data for circles to be added (no previous circles)
    .enter() // obtain enter selection
    .append<SVGCircleElement>('circle');

// UPDATE-selection with continuation in data type ---------------------------------

// Assign new data and use key(...) function for mapping
circles2 = circles2 // returned update selection has the same type parameters as original selection, if data type is unchanged
    .data<CircleDatumAlternative>(endCircleData, function (d) { return d.nodeId; });

// circles2.data<DivDatum>(endCircleData, function (d) { return d.nodeId; }); // fails, forced data type parameter and data argument mismatch 

// ENTER-selection -----------------------------------------------------------------

// TODO: Related to BaseType Choice issue

// let enterElements: d3Selection.Selection<d3Selection.EnterElement, CircleDatumAlternative, SVGSVGElement, SVGDatum>; ,fails as current BaseType is Element

let enterElements: d3Selection.Selection<SVGCircleElement, CircleDatumAlternative, SVGSVGElement, SVGDatum>;

enterElements = circles2.enter(); // enter selection

let enterCircles = enterElements
    .append<SVGCircleElement>('circle') // enter selection with materialized DOM elements (svg circles)
    .attr('cx', function (d) { return d.cx; })
    .attr('cy', function (d) { return d.cy; })
    .attr('r', function (d) { return d.r; })
    .style('stroke', function (d) { return d.color; })
    .style('fill', function (d) { return d.color; });

// EXIT-selection ----------------------------------------------------------------------

// tests exit(...) and remove()

let exitCircles = circles2.exit<CircleDatumAlternative>(); // Note: need to re-type datum type, as the exit selection elements have the 'old data'

exitCircles
    .style('opacity', function (d) {
        console.log('Circle Radius exit node: ', this.r.baseVal.value); // this type is SVGCircleElement
        return d.color === 'green' ? 1 : 0; // data type as per .exit<...>() parameterization
    })
    .remove();

// Note: the alternative using only .exit() without typing, will fail, if access to datum properties is attemped.
// If access to d is not required, the short-hand is acceptable e.g. circles2.exit().remove();

// let exitCircles = circles2.exit(); // Note: Without explicit re-typing to the old data type, the data type default to '{}'
// exitCircles
//     .style('opacity', function (d) {
//         console.log('Circle Radius exit node: ', this.r.baseVal.value);
//         return d.color === 'green' ? 1 : 0; // fails, as data type is defaulted to {}. If datum access is required, this should trigger the thought to type .exit<...>
//     });

// MERGE ENTER + UPDATE ------------------------------------------------------------------

circles2 = enterCircles.merge(circles2); // merge enter and update selections

// FURTHER DATA-JOIN TESTs (function argument, changes in data type between old and new data)


const matrix = [
    [11975, 5871, 8916, 2868],
    [1951, 10048, 2060, 6171],
    [8010, 16145, 8090, 8045],
    [1013, 990, 940, 6907]
];

// SCENARIO 1 - Fully type parameterized, when there is a need for `this` typings in callbacks
// and enforcement of type of data used in data join as input to data(...)

let nMatrix: Array<number[]>,
    nRow: Array<number>;

let tr: d3Selection.Selection<HTMLTableRowElement, number[], HTMLTableElement, any>;
tr = d3Selection.select('body')
    .append<HTMLTableElement>('table')
    .selectAll()
    .data(matrix)
    // .data([{test: 1}, {test: 2}]) // fails, using this data statement instead, would fail assignment to tr due to the data type of tr Selection
    // .data<number[]>([{test: 1}, {test: 2}]) // fails, using this data statement instead, would fail because of its type parameter not being met by input
    .enter().append<HTMLTableRowElement>('tr');

nMatrix = tr.data(); // i.e. matrix 

let td: d3Selection.Selection<HTMLTableDataCellElement, number, HTMLTableRowElement, number[]>;
td = tr.selectAll()
    .data(function (d) { return d; }) // d : Array<number> inferred (Array[4] of number per parent <tr>)
    .enter().append<HTMLTableDataCellElement>('td')
    .text(function (d) {
        console.log('Abbreviated text for object', this.abbr); // this-type HTMLTableDataCellElement (demonstration only)
        return d;
    }); // d:number inferred

nRow = td.data(); // flattened matrix (Array[16] of number)

// SCENARIO 2 - Completely inferred types, when there is no need for `this` typings

let tr2 = d3Selection.select('body')
    .append('table')
    .selectAll('tr')
    .data(matrix)
    .enter().append('tr');

nMatrix = tr2.data(); // i.e. matrix 

let td2 = tr2.selectAll('td')
    .data(function (d) { return d; }) // d : Array<number> inferred (Array[4] of number per parent <tr>)
    .enter().append('td')
    .text(function (d) { return d; }); // d:number inferred

nRow = td2.data(); // flattened matrix (Array[16] of number)

// ---------------------------------------------------------------------------------------
// Tests of Alternative DOM Manipulation
// ---------------------------------------------------------------------------------------

// append(...) and creator(...) ----------------------------------------------------------

// without append<...> typing returned selection has group element of type BaseType
let newDiv: d3Selection.Selection<d3Selection.BaseType, BodyDatum, HTMLElement, any>;
newDiv = body.append('div');

let newDiv2: d3Selection.Selection<HTMLDivElement, BodyDatum, HTMLElement, any>;
newDiv2 = body.append<HTMLDivElement>('div');

// using creator
newDiv2 = body.append(d3Selection.creator<HTMLDivElement>('div'));
// newDiv2 = body.append(d3Selection.creator('div')); // fails, as creator returns BaseType element, but HTMLDivElement is expected.

newDiv2 = body.append(function (d) {
    console.log('Body element foo property: ', d.foo); // data of type BodyDatum
    return this.ownerDocument.createElement('div'); // this-type HTMLBodyElement
});

// newDiv2 = body.append<HTMLDivElement>(function(d) {
//     return this.ownerDocument.createElement('a'); // fails, HTMLDivElement expected by type parameter, HTMLAnchorElement returned
// });

// newDiv2 = body.append(function(d) {
//     return this.ownerDocument.createElement('a'); // fails, HTMLDivElement expected by inference, HTMLAnchorElement returned
// });

// insert(...) ---------------------------------------------------------------------------

// without insert<...> typing returned selection has group element of type BaseType
let newParagraph: d3Selection.Selection<d3Selection.BaseType, BodyDatum, HTMLElement, any>;
newParagraph = body.insert('p', 'p.second-paragraph');

let newParagraph2: d3Selection.Selection<HTMLParagraphElement, BodyDatum, HTMLElement, any>;
newParagraph2 = body.insert<HTMLParagraphElement>('p', 'p.second-paragraph');

newParagraph2 = body.insert(d3Selection.creator<HTMLParagraphElement>('p'), 'p.second-paragraph');
newParagraph2 = body.insert(function (d) {
    console.log('Body element foo property: ', d.foo); // data of type BodyDatum
    return this.ownerDocument.createElement('p'); // this-type HTMLParagraphElement
}, 'p.second-paragraph');

// newParagraph2 = body.insert<HTMLParagraphElement>(function(d) {
//     return this.ownerDocument.createElement('a'); // fails, HTMLParagraphElement expected by type parameter, HTMLAnchorElement returned
// }, 'p.second-paragraph');

// newParagraph2 = body.insert(function(d) {
//     return this.ownerDocument.createElement('a'); // fails, HTMLParagraphElement expected by type inference, HTMLAnchorElement returned
// }, 'p.second-paragraph');

newParagraph2 = body.insert(d3Selection.creator<HTMLParagraphElement>('p'), function (d, i, group) {
    console.log('Body element foo property: ', d.foo); // data of type BodyDatum
    return this.children[0]; // this type HTMLBodyElement
});

newParagraph2 = body.insert(
    // type
    function (d) {
        console.log('Body element foo property: ', d.foo); // data of type BodyDatum
        return this.ownerDocument.createElement('p'); // this-type HTMLParagraphElement
    },
    // before
    function (d, i, group) {
        console.log('Body element foo property: ', d.foo); // data of type BodyDatum
        return this.children[0]; // this type HTMLBodyElement
    });

// sort(...) -----------------------------------------------------------------------------

// NB: Return new selection of same type
circles2 = circles2.sort(function (a, b) {
    return (b.r - a.r);
});

// order(...) ----------------------------------------------------------------------------

// returns 'this' selection
circles2 = circles2.order();

// raise() -------------------------------------------------------------------------------

// returns 'this' selection
circles2 = circles2.raise();

// lower() -------------------------------------------------------------------------------

// returns 'this' selection
circles2 = circles2.lower();

// ---------------------------------------------------------------------------------------
// Control FLow
// ---------------------------------------------------------------------------------------

// empty() -------------------------------------------------------------------------------
let emptyFlag = gElementsOldData.empty();

// node() and nodes() --------------------------------------------------------------------

let bodyNode: HTMLBodyElement = body.node();

let gElementsNodes: Array<SVGGElement> = gElementsOldData.nodes();

// size() --------------------------------------------------------------------------------

let size: number = gElementsOldData.size();

// each() -------------------------------------------------------------------------------

// returns 'this' selection
circles = circles.each(function (d, i, group) {  // check chaining return type by re-assigning
    if (this.r.baseVal.value < d.r) { // this of type SVGCircleElement, datum of type CircleDatumAlternative
        d3Selection.select(this).attr('r', d.r);
    }
    console.log(group[i].cx.baseVal.value); // group : Array<SVGCircleElement>
});

// call() -------------------------------------------------------------------------------

function enforceMinRadius(selection: d3Selection.Selection<SVGCircleElement, CircleDatumAlternative, any, any>, minRadius: number): void {

    selection.attr('r', function (d) {
        let r: number = +d3Selection.select(this).attr('r');
        return Math.max(r, minRadius);
    });

}

// returns 'this' selection
circles = circles.call(enforceMinRadius, 40); // check chaining return type by re-assigning 

// circles.call(function (selection: d3Selection.Selection<HTMLDivElement, CircleDatum, any, any>):void {
//     // fails, group element types of selection not compatible: SVGCircleElement v HTMLDivElement
// });

// circles.call(function (selection: d3Selection.Selection<SVGCircleElement, DivDatum, any, any>):void {
//     // fails, group datum types of selection not compatible: CircleDatumAlternative v DivDatum
// });

// ---------------------------------------------------------------------------------------
// Tests of Event Handling
// ---------------------------------------------------------------------------------------

// on(...) -------------------------------------------------------------------------------

let listener: (this: HTMLBodyElement, datum: BodyDatum, index: number, group: Array<HTMLBodyElement> | NodeListOf<HTMLBodyElement>) => void;

// returns 'this' selection
body = body.on('click', listener); // check chaining return type by re-assigning

body = body.on('click', function (d) {
    console.log('onclick print body background color: ', this.bgColor); // HTMLBodyElement
    console.log('onclick print "foo" datum property: ', d.foo); // BodyDatum type
});

// get current listener
listener = body.on('click');

// remove listener
body = body.on('click', null); // check chaining return type by re-assigning


// dispatch(...) -------------------------------------------------------------------------

let fooEventParam: d3Selection.CustomEventParameters = {
    cancelable: true,
    bubbles: true,
    detail: [1, 2, 3, 4]
};

// returns 'this' selection
body = body.dispatch('fooEvent', fooEventParam); // re-assign for chaining test;

body = body.dispatch('fooEvent', function (d, i, group) { // re-assign for chaining test;
    let eParam: d3Selection.CustomEventParameters;
    console.log('fooEvent dispatch body background color', this.bgColor);
    eParam = {
        cancelable: true,
        bubbles: true,
        detail: d.foo // d is of type BodyDatum
    };
    return eParam;
});


// event and customEvent() ----------------------------------------------------------------

// TODO: Tests of event are related to issue #3 (https://github.com/tomwanzek/d3-v4-definitelytyped/issues/3)

// No tests for event, as it now is of type any

interface SuccessEvent {
    type: string;
    team: string;
    sourceEvent?: any;
}
let successEvent = { type: 'wonEuro2016', team: 'Island' };

let customListener: (this: HTMLBodyElement, finalOpponent: string) => string;

customListener = function (finalOpponent) {
    let e = <SuccessEvent>d3Selection.event;

    return e.team + ' defeated ' + finalOpponent + ' in the EURO 2016 Cup. Who would have thought!!!';
};

let resultText: string = d3Selection.customEvent(successEvent, customListener, body.node(), 'Wales');

// result = d3Selection.customEvent(successEvent, customListener, circles.nodes()[0], 'Wales'); // fails, incompatible 'this' context in call
// let resultValue: number = d3Selection.customEvent(successEvent, customListener, body.node(), 'Wales'); // fails, incompatible return types
// d3Selection.customEvent<SVGCircleElement, any>(successEvent, customListener, circles.nodes()[0], 'Wales'); // fails, incompatible 'this' context in type parameter and call
// d3Selection.customEvent<HTMLBodyElement, any>(successEvent, customListener, circles.nodes()[0], 'Wales'); // fails, incompatible 'this' context in type parameter and call
// d3Selection.customEvent<HTMLBodyElement, number>(successEvent, customListener, body.node(), 'Wales'); // fails, incompatible return types

// mouse() ---------------------------------------------------------------------------------

let position: [number, number],
    svg: SVGSVGElement,
    g: SVGGElement,
    h: HTMLElement,
    changedTouches: TouchList;

position = d3Selection.mouse(svg);
position = d3Selection.mouse(g);
position = d3Selection.mouse(h);

// touch() and touches() ---------------------------------------------------------------------

position = d3Selection.touch(svg, 0);
position = d3Selection.touch(g, 0);
position = d3Selection.touch(h, 0);

position = d3Selection.touch(svg, changedTouches, 0);
position = d3Selection.touch(g, changedTouches, 0);
position = d3Selection.touch(h, changedTouches, 0);

let positions: Array<[number, number]>;

positions = d3Selection.touches(svg, changedTouches);
positions = d3Selection.touches(g, changedTouches);
positions = d3Selection.touches(h, changedTouches);

positions = d3Selection.touches(svg, changedTouches);
positions = d3Selection.touches(g, changedTouches);
positions = d3Selection.touches(h, changedTouches);

// ---------------------------------------------------------------------------------------
// Tests of Local
// ---------------------------------------------------------------------------------------

let xElement: Element;
let foo: d3Selection.Local = d3Selection.local();
let propName: string = foo.toString();

console.log('Local Property Name: %s', propName);

xElement = foo.set(xElement, 'test');

// TODO: complete remaing tests for Local

// ---------------------------------------------------------------------------------------
// Tests of Namespace
// ---------------------------------------------------------------------------------------

let predefinedNamespaces: d3Selection.NamespaceMap = d3Selection.namespaces;

const svgNamespace: string = predefinedNamespaces['svg'];

const svgTextObject: d3Selection.NamespaceLocalObject | string = d3Selection.namespace('svg:text');

predefinedNamespaces['dummy'] = 'http://www.w3.org/2020/dummynamespace';

// ---------------------------------------------------------------------------------------
// Tests of Window
// ---------------------------------------------------------------------------------------

xWindow = d3Selection.window(xElement);
xWindow = d3Selection.window(xDoc);
xWindow = d3Selection.window(xWindow);

// ---------------------------------------------------------------------------------------
// TEST OF GITHUB ISSUE #4 (https://github.com/tomwanzek/d3-v4-definitelytyped/issues/4)
// ---------------------------------------------------------------------------------------

// fails as expected, as transition(...) method and Transition<...> interface are not defined on d3-selection
// let transition : d3Selection.Transition<any,any,any,any> = d3Selection.transition('test');

// UNEXPECTEDLY does NOT FAIL as module augmentation of Selection<...> interface in d3-transition bleeds into this test module,
// although d3-transition has not been imported

let ghostTransition = body.transition('test'); // SHOULD FAIL, method transition(...) SHOULD NOT BE AVAILABLE on body Selection<...> without d3-transition import

ghostTransition.duration(500);  // SHOULD FAIL, ghostTransition has properties of Transition<...>

body.interrupt('test'); // SHOULD FAIL, method interrupt(...) SHOULD NOT BE AVAILABLE on body Selection<...> without d3-transition import
