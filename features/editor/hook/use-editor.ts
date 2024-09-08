import { useCallback, useState, useMemo } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps, CIRCLE_OPTIONS, Editor, RECTANGLE_OPTIONS, SQUARE_OPTIONS, TRIANGLE_OPTIONS, STAR_OPTIONS, DIAMOND_OPTIONS, ARROW_OPTIONS, LINE_OPTIONS, DASHED_LINE_OPTIONS, DOTTED_LINE_OPTIONS, FILL_COLOR, STROKE_COLOR, STROKE_WIDTH, EditorHookProps } from "@/features/editor/type";
import { useCanvasEvents } from "./use-canvas-events";
import { isTextType } from "../utils";

const buildEdior = ({ canvas, setFillColor, setStrokeColor, setStrokeWidth, fillColor, strokeColor, strokeWidth, selectedObjects }: BuildEditorProps): Editor => {

    const addToCanvas = (object: fabric.Object) => {
        center(object);
        canvas.add(object);
        canvas.setActiveObject(object);

    }

    const getWorkspace = () => {
        return canvas.getObjects().find((object) => object.name === "clip");
    }

    const center = (object: fabric.Object) => {
        const workSpace = getWorkspace();
        const center = workSpace?.getCenterPoint();
        //@ts-ignore
        canvas._centerObject(object, center);
    }

    return {

        changeFillColor: (value: string) => {
            setFillColor(value)
            canvas.getActiveObjects().forEach((object) => {
                object.set({ fill: value });
            });
            canvas.renderAll();
        },
        changeStrokeColor: (value: string) => {
            setStrokeColor(value)
            canvas.getActiveObjects().forEach((object) => {

                if (isTextType(object.type)) {
                    object.set({ fill: value });
                    return;

                }

                object.set({ stroke: value });
            });
            canvas.renderAll();

        },
        changeStrokeWidth: (value: number) => {
            setStrokeWidth(value)
            canvas.getActiveObjects().forEach((object) => {
                object.set({ strokeWidth: value });
            });
            canvas.renderAll();

        },
        //Line
        addLine: () => {
            const line = new fabric.Line(
                [0, 0, 100, 0],
                {
                    ...LINE_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth
                }
            );
            addToCanvas(line)
        },
        addDashedLine: () => {
            const dashedLine = new fabric.Line(
                [0, 0, 100, 0],
                {
                    ...DASHED_LINE_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth
                }
            );
            addToCanvas(dashedLine)
        },
        addDottedLine: () => {
            const dottedLine = new fabric.Line(
                [0, 0, 100, 0],
                {
                    ...DOTTED_LINE_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth
                }
            );
            addToCanvas(dottedLine)
        },
        //Shapes
        addCircle: () => {
            const circle = new fabric.Circle({
                ...CIRCLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            });
            addToCanvas(circle)
        },
        addRectangle: () => {
            const rectangle = new fabric.Rect({
                ...RECTANGLE_OPTIONS
                , rx: 10,
                ry: 10,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            })
            addToCanvas(rectangle)
        },
        addSquare: () => {
            const square = new fabric.Rect({
                ...SQUARE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            })
            addToCanvas(square)
        },
        addTraingle: () => {
            const triangle = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            })
            addToCanvas(triangle)
        },
        addStar: () => {
            const star = new fabric.Polygon([
                { x: 50, y: 0 },
                { x: 60, y: 35 },
                { x: 100, y: 35 },
                { x: 70, y: 57 },
                { x: 80, y: 91 },
                { x: 50, y: 70 },
                { x: 20, y: 91 },
                { x: 30, y: 57 },
                { x: 0, y: 35 },
                { x: 40, y: 35 },
            ], {
                ...STAR_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth


            });
            addToCanvas(star)
        },
        addDiamond: () => {
            const diamond = new fabric.Polygon([
                { x: 50, y: 0 },
                { x: 100, y: 50 },
                { x: 50, y: 100 },
                { x: 0, y: 50 },
            ], {
                ...DIAMOND_OPTIONS,
                left: 200,
                top: 200,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            });
            addToCanvas(diamond)
        },
        addArrowRight: () => {
            const arrowRight = new fabric.Polygon([
                { x: 0, y: 50 },
                { x: 100, y: 50 },
                { x: 100, y: 30 },
                { x: 150, y: 70 },
                { x: 100, y: 110 },
                { x: 100, y: 90 },
                { x: 0, y: 90 },
            ], {
                ...ARROW_OPTIONS,
                left: 200,
                top: 200,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            });
            addToCanvas(arrowRight)
        },
        addArrowLeft: () => {
            const arrowLeft = new fabric.Polygon([
                { x: 150, y: 50 },
                { x: 50, y: 50 },
                { x: 50, y: 30 },
                { x: 0, y: 70 },
                { x: 50, y: 110 },
                { x: 50, y: 90 },
                { x: 150, y: 90 },
            ], {
                ...ARROW_OPTIONS,
                left: 200,
                top: 200,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            });
            addToCanvas(arrowLeft)
        },
        addArrowUp: () => {
            const arrowUp = new fabric.Polygon([
                { x: 70, y: 150 },
                { x: 70, y: 50 },
                { x: 50, y: 50 },
                { x: 90, y: 0 },
                { x: 130, y: 50 },
                { x: 110, y: 50 },
                { x: 110, y: 150 },
            ], {
                ...ARROW_OPTIONS,
                left: 200,
                top: 200,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            });
            addToCanvas(arrowUp)
        },
        addArrowDown: () => {
            const arrowDown = new fabric.Polygon([
                { x: 70, y: 0 },
                { x: 70, y: 100 },
                { x: 50, y: 100 },
                { x: 90, y: 150 },
                { x: 130, y: 100 },
                { x: 110, y: 100 },
                { x: 110, y: 0 },
            ], {
                ...ARROW_OPTIONS,
                left: 200,
                top: 200,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth
            });
            addToCanvas(arrowDown)
        },
        canvas,
        getActiveFillColor: () => {

            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return fillColor
            }

            const value = selectedObject.get("fill") || fillColor;

            return value as string;

        },
        getActiveStrokeColor: () => {

            const selectedObject = selectedObjects[0];

            if (!selectedObject) {
                return fillColor
            }

            const value = selectedObject.get("stroke") || strokeColor;

            return value;

        },
        strokeWidth,
        selectedObjects,
    }
}

export const useEditor = ({
    clearSlercrtionCallback
}: EditorHookProps

) => {

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [selectedObjects, setselectedObjects] = useState<fabric.Object[]>([]);

    const [fillColor, setFillColor] = useState(FILL_COLOR);
    const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
    const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);

    useAutoResize({
        canvas,
        container
    });
    useCanvasEvents({
        canvas,
        setselectedObjects,
        clearSlercrtionCallback
    })

    const editor = useMemo(() => {
        if (canvas) {
            return buildEdior({
                canvas,
                fillColor,
                strokeColor,
                strokeWidth,
                setFillColor,
                setStrokeWidth,
                setStrokeColor,
                selectedObjects,
            })
        }
        return undefined
    }, [canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        selectedObjects
    ])

    const init = useCallback(({
        initialCanvas,
        initialContainer,
    }: {
        initialCanvas: fabric.Canvas,
        initialContainer: HTMLDivElement,
    }) => {

        fabric.Object.prototype.set({
            transparentCorners: false,
            borderColor: "red",
            cornerColor: "blue",
            cornerStyle: "circle",
            cornerStrokeColor: "green",
            cornerSize: 12,
            padding: 5,
            borderOpacityWhenMoving: 1,
            borderScaleFactor: 1.05,
        })

        const initWorkspace = new fabric.Rect({
            width: 900,
            height: 1200,
            name: "clip",
            fill: "white",
            selectable: false,
            hasControls: false,

            shadow: new fabric.Shadow({
                color: "rgba(0,0,0,0.9)",
                blur: 5,
            }),
        });

        initialCanvas.setWidth(initialContainer.offsetWidth);
        initialCanvas.setHeight(initialContainer.offsetHeight);

        initialCanvas.add(initWorkspace);

        initialCanvas.centerObject(initWorkspace);
        initialCanvas.clipPath = initWorkspace;

        setCanvas(initialCanvas);
        setContainer(initialContainer);



    }, []);

    return { init, editor };
}