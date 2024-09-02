import { useCallback, useState, useMemo } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps, CIRCLE_OPTIONS, Editor, RECTANGLE_OPTIONS, SQUARE_OPTIONS, TRIANGLE_OPTIONS, STAR_OPTIONS, DIAMOND_OPTIONS, ARROW_OPTIONS, LINE_OPTIONS, DASHED_LINE_OPTIONS, DOTTED_LINE_OPTIONS } from "@/features/editor/type";

const buildEdior = ({ canvas }: BuildEditorProps): Editor => {

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

        //Line
        addLine: () => {
            const line = new fabric.Line(
                [0, 0, 100, 0],
                {
                    ...LINE_OPTIONS
                }
            );
            addToCanvas(line)
        },
        addDashedLine: () => {
            const dashedLine = new fabric.Line(
                [0, 0, 100, 0],
                {
                    ...DASHED_LINE_OPTIONS,
                }
            );
            addToCanvas(dashedLine)
        },
        addDottedLine: () => {
            const dottedLine = new fabric.Line(
                [0, 0, 100, 0],
                {
                    ...DOTTED_LINE_OPTIONS,
                }
            );
            addToCanvas(dottedLine)
        },
        //Shapes
        addCircle: () => {
            const circle = new fabric.Circle({
                ...CIRCLE_OPTIONS
            });
            addToCanvas(circle)
        },
        addRectangle: () => {
            const rectangle = new fabric.Rect({
                ...RECTANGLE_OPTIONS
                , rx: 10,
                ry: 10
            })
            addToCanvas(rectangle)
        },
        addSquare: () => {
            const square = new fabric.Rect({
                ...SQUARE_OPTIONS
            })
            addToCanvas(square)
        },
        addTraingle: () => {
            const triangle = new fabric.Triangle({
                ...TRIANGLE_OPTIONS
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
            });
            addToCanvas(arrowDown)
        },



    }
}

export const useEditor = () => {

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);


    useAutoResize({
        canvas,
        container
    });

    const editor = useMemo(() => {
        if (canvas) {
            return buildEdior({
                canvas
            })
        }
        return undefined
    }, [canvas])

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