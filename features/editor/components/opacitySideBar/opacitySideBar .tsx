import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "@/features/editor/type";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSideBarHeader from "@/features/editor/components/toolSideBarHeader/ToolSideBarHeader";
import ToolSideBarClose from "@/features/editor/components/toolSideBarClose/ToolSideBarClose";
import { Slider } from "@/components/ui/slider";
import { useEditor } from "../../hook/use-editor";

interface OpacitySideBarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const OpacitySideBar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: OpacitySideBarProps) => {
    const initialValue = editor?.getActiveOpacity() || 1;

    const selectedObjects = useMemo(
        () => editor?.selectedObjects[0],
        [editor?.selectedObjects]
    );
    const [opacity, setOpacity] = useState(initialValue);

    useEffect(() => {
        setOpacity(selectedObjects?.get("opacity") || 1);
    }, [selectedObjects]);

    const onClose = () => {
        onChangeActiveTool("select");
    };

    const onChangeOpacity = (value: number) => {
        editor?.changeOpacity(value);
        setOpacity(value);
    };

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "opacity" ? "visible" : "hidden"
            )}
        >
            <ToolSideBarHeader
                title="Opacity & Blending Mode "
                description="Change the opacity of the selected object"
            />
            <ScrollArea>
                <div className="p-4 space-y-4 border-b">
                    <Slider
                        value={[opacity]}
                        onValueChange={(value) => onChangeOpacity(value[0])}
                        max={1}
                        min={0}
                        step={0.01}
                    />
                </div>
            </ScrollArea>

            <ToolSideBarClose onClick={onClose} />
        </aside>
    );
};

export default OpacitySideBar;
