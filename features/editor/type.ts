import { fabric } from "fabric";
import * as material from "material-colors";


export const selectionDependentTools = [
    "fill",
    "font",
    "filter",
    "opacity",
    "remove-bg",
    "storke-color",
    "storke-width",
]

export const color = [
    material.red["500"],
    material.pink["500"],
    material.purple["500"],
    material.deepPurple["500"],
    material.indigo["500"],
    material.blue["500"],
    material.lightBlue["500"],
    material.cyan["500"],
    material.teal["500"],
    material.green["500"],
    material.lightGreen["500"],
    material.lime["500"],
    material.yellow["500"],
    material.amber["500"],
    material.orange["500"],
    material.deepOrange["500"],
    material.brown["500"],
    material.grey["500"],
    material.blueGrey["500"],
    "transparent",
]

export type ActiveTool =
    //SideBarItem
    | "templates"
    | "images"
    | "text"
    | "shapes"
    | "ai"
    | "settings"
    //Item
    | "select"
    | "draw"
    | "fill"
    | "stroke-color"
    | "stroke-width"
    | "font"
    | "opacity"
    | "filter"
    | "remove-bg"

// ShapeSideBar
export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 1
export const STROKE_DASH_ARRY = []

export const COMMON_WIDTH_HEIGHT = {
    width: 100,
    height: 100,
};
export const COMMON_LINE_OPTIONS = {
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: 2,
    left: 100,
    top: 100,
    angle: 0,
};
export const COMMON_SHAPE_OPTIONS = {
    ...COMMON_WIDTH_HEIGHT,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
    left: 100,
    top: 100,
    angle: 0,
};
//Line
export const LINE_OPTIONS = {
    ...COMMON_LINE_OPTIONS,
};

export const DASHED_LINE_OPTIONS = {
    ...COMMON_LINE_OPTIONS,
    strokeDashArray: [5, 5],
};

export const DOTTED_LINE_OPTIONS = {
    ...COMMON_LINE_OPTIONS,
    strokeDashArray: [5, 5],
};

//Shape
export const CIRCLE_OPTIONS = {
    radius: 50,
    ...COMMON_SHAPE_OPTIONS,
};

export const RECTANGLE_OPTIONS = {

    ...COMMON_SHAPE_OPTIONS,
};

export const SQUARE_OPTIONS = {

    ...COMMON_SHAPE_OPTIONS,
};

export const TRIANGLE_OPTIONS = {

    ...COMMON_SHAPE_OPTIONS,
};

export const STAR_OPTIONS = {

    ...COMMON_SHAPE_OPTIONS,
};

export const DIAMOND_OPTIONS = {

    ...COMMON_SHAPE_OPTIONS,
};

export const ARROW_OPTIONS = {

    ...COMMON_SHAPE_OPTIONS,
};

export interface EditorHookProps {
    clearSlercrtionCallback: () => void;
}


export type BuildEditorProps = {
    canvas: fabric.Canvas;
    selectedObjects: fabric.Object[]
    fillColor: string
    strokeColor: string
    strokeWidth: number
    strokeDashArray: number[]
    setFillColor: (value: string) => void
    setStrokeColor: (valur: string) => void
    setStrokeWidth: (value: number) => void
    setStrokeDashArray: (value: number[]) => void
}



export interface Editor {
    changeFillColor: (value: string) => void;
    changeStrokeColor: (value: string) => void;
    changeStrokeWidth: (value: number) => void;
    changeStrokeDashArray: (value: number[]) => void;
    canvas: fabric.Canvas;
    getActiveFillColor: () => string
    getActiveStrokeColor: () => string
    getActiveStrokeDashArray: () => number[]
    getActiveStrokeWidth: () => number
    selectedObjects: fabric.Object[]

    //Line
    addLine: () => void;
    addDashedLine: () => void;
    addDottedLine: () => void;
    //Shapes
    addCircle: () => void;
    addRectangle: () => void;
    addSquare: () => void;
    addTraingle: () => void
    addStar: () => void
    addDiamond: () => void
    addArrowRight: () => void
    addArrowLeft: () => void
    addArrowUp: () => void
    addArrowDown: () => void
}