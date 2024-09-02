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
export const STROKE_WIDTH = 1;
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

export type BuildEditorProps = {
    canvas: fabric.Canvas;
}



export interface Editor {
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