import React from "react";
import { BsBorderWidth } from "react-icons/bs";
import { ActiveTool, Editor } from "../../type";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";
interface ToolBarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}
const ToolBar = ({ editor, activeTool, onChangeActiveTool }: ToolBarProps) => {
    const fillColor = editor?.getActiveFillColor();
    const strokeColor = editor?.getActiveStrokeColor();

    if (editor?.selectedObjects.length === 0) {
        return (
            <div className="shrink-0 h-[58px] border-b w-full flex item-center overflow-x-auto z-[49] p-2 gap-x-2" />
        );
    }
    return (
        <div className="shrink-0 h-[58px] border-b w-full flex item-center overflow-x-auto z-[49] p-2 gap-x-2">
            <div className="flex items-center h-full justify-center">
                <Hint label="Color " side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("fill")}
                        size={"icon"}
                        variant={"ghost"}
                        className={cn(
                            activeTool === "fill"
                                ? "bg-slate-500"
                                : "bg-slate-400"
                        )}
                    >
                        <div
                            className="rounded-sm size-4 border "
                            style={{
                                backgroundColor: fillColor,
                            }}
                        />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Stroke Color" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("stroke-color")}
                        size={"icon"}
                        variant={"ghost"}
                        className={cn(
                            activeTool === "stroke-color"
                                ? "bg-slate-500"
                                : "bg-slate-400"
                        )}
                    >
                        <div
                            className="rounded-sm size-4 border-2 bg-white"
                            style={{
                                borderColor: strokeColor,
                            }}
                        />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Stroke width" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("stroke-width")}
                        size={"icon"}
                        variant={"ghost"}
                        className={cn(
                            activeTool === "stroke-width"
                                ? "bg-slate-500"
                                : "bg-slate-400"
                        )}
                    >
                        <BsBorderWidth className="size-4" />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Send Forward" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => editor?.bringForward()}
                        size={"icon"}
                        variant={"ghost"}
                    >
                        <ArrowUp className="size-4" />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Send Backward" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => editor?.bringBackward()}
                        size={"icon"}
                        variant={"ghost"}
                    >
                        <ArrowDown className="size-4" />
                    </Button>
                </Hint>
            </div>
        </div>
    );
};

export default ToolBar;
