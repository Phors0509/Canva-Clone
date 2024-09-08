import { fabric } from 'fabric';
import { useEffect } from 'react';

interface UseCanvasEventProps {
    canvas: fabric.Canvas | null;
    setselectedObjects: (object: fabric.Object[]) => void;
    clearSlercrtionCallback?: () => void;

}

export const useCanvasEvents = ({
    canvas,
    setselectedObjects,
    clearSlercrtionCallback
}: UseCanvasEventProps) => {


    useEffect(() => {
        if (canvas) {
            canvas.on("selection:created", (e) => {
                console.log("Selected:created");
                setselectedObjects(e.selected || []);
            });
            canvas.on("selection:cleared", () => {
                console.log("Selection:cleared");
                setselectedObjects([]);
                clearSlercrtionCallback?.();
            })
            canvas.on("selection:updated", (e) => {
                console.log("Selection:updated");
                setselectedObjects(e.selected || []);
            })
        }

        return () => {
            if (canvas) {
                canvas.off("selected:created");
                canvas.off("selection:cleared");
                canvas.off("selection:updated");
            }
        }

    }, [canvas, setselectedObjects, clearSlercrtionCallback]);
}