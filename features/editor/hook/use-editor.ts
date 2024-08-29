import { useCallback, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";

export const useEditor = () => {

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    useAutoResize({
        canvas,
        container
    });
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
            fill: "black",
            selectable: false,
            hasControls: false,

            shadow: new fabric.Shadow({
                color: "rgba(0,0,0,0.8)",
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

        const test = new fabric.Rect({
            width: 100,
            height: 100,
            fill: "red",
        });

        initialCanvas.add(test);
        initialCanvas.centerObject(test);
        initialCanvas.renderAll();



    }, []);

    return { init };
}