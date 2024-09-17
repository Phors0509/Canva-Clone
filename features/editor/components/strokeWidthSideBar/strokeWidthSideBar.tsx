import React from "react";
import { cn } from "@/lib/utils";
import {
    ActiveTool,
    Editor,
    STROKE_DASH_ARRY,
    STROKE_WIDTH,
} from "@/features/editor/type";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSideBarHeader from "@/features/editor/components/toolSideBarHeader/ToolSideBarHeader";
import ToolSideBarClose from "@/features/editor/components/toolSideBarClose/ToolSideBarClose";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface StrokeWidthSideBarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const StrokeWidthSideBar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: StrokeWidthSideBarProps) => {
    const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
    const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRY;

    const onClose = () => {
        onChangeActiveTool("select");
    };

    const onChangeStrokeWidth = (value: number) => {
        editor?.changeStrokeWidth(value);
    };

    const onChangeStrokeType = (value: number[]) => {
        editor?.changeStrokeDashArray(value);
    };

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "stroke-width" ? "visible" : "hidden"
            )}
        >
            <ToolSideBarHeader
                title="Stroke Options"
                description="Change the stroke width of the selected object"
            />
            <ScrollArea>
                <div className="p-4 space-y-4 border-b">
                    <Label className="text-sm">Stroke Width</Label>

                    <Slider
                        value={[widthValue]}
                        onValueChange={(value) => onChangeStrokeWidth(value[0])}
                    />
                </div>
                <div className="p-4 space-y-4 border-b">
                    <Label className="text-sm">Stroke Type</Label>
                    <Button
                        variant="secondary"
                        size="lg"
                        className={cn(
                            `w-full h-16 justify-start text-left`,
                            JSON.stringify(typeValue) === `[]` &&
                                "border-2 border-blue-500"
                        )}
                        style={{
                            padding: "8px 16px",
                        }}
                        onClick={() => onChangeStrokeType([])}
                    >
                        <div className="w-full border-4 border-black rounded-full" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className={cn(
                            `w-full h-16 justify-start text-left`,
                            JSON.stringify(typeValue) === `[5,5]` &&
                                "border-2 border-blue-500"
                        )}
                        style={{
                            padding: "8px 16px",
                        }}
                        onClick={() => onChangeStrokeType([5, 5])}
                    >
                        <div className="w-full border-4 border-dashed border-black rounded-full" />
                    </Button>
                </div>
            </ScrollArea>

            <ToolSideBarClose onClick={onClose} />
        </aside>
    );
};

export default StrokeWidthSideBar;
