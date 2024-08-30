"use client";
import { fabric } from "fabric";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActiveTool } from "@/features/editor/type";
import { useEditor } from "@/features/editor/hook/use-editor";
import Navbar from "@/features/editor/components/navbar/navbar";
import Sidebar from "@/features/editor/components/sidebar/sidebar";
import ToolBar from "@/features/editor/components/toolbar/ToolBar";
import Footer from "@/features/editor/components/footer/Footer";
import ShapeSideBar from "@/features/editor/components/shapeSideBar/ShapeSideBar";

function Editor() {
    const [activeTool, setActiveTool] = useState<ActiveTool>("select");

    const onChangeActiveTool = useCallback(
        (tool: ActiveTool) => {
            if (tool === activeTool) {
                return setActiveTool("select");
            }
            if (tool === "draw") {
                // Todo
            }
            if (activeTool === "draw") {
                // Todo
            }

            setActiveTool(tool);
        },

        [activeTool]
    );
    const { init } = useEditor();

    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            controlsAboveOverlay: true,
            preserveObjectStacking: true,
        });
        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current!,
        });

        return () => {
            canvas.dispose();
        };
    }, [init]);

    return (
        <div className="h-full flex flex-col">
            <Navbar
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
            />
            <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex ">
                <Sidebar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <ShapeSideBar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                />
                <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
                    <ToolBar />
                    <div
                        ref={containerRef}
                        className="flex-1 h-[calc(100%-124px)] bg-muted"
                    >
                        <canvas ref={canvasRef} />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default Editor;
