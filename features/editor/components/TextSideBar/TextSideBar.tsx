import React from "react";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "@/features/editor/type";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSideBarHeader from "@/features/editor/components/toolSideBarHeader/ToolSideBarHeader";
import ToolSideBarClose from "@/features/editor/components/toolSideBarClose/ToolSideBarClose";
import { Button } from "@/components/ui/button";

interface TextSideBarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

const TextSideBar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: TextSideBarProps) => {
    const onClose = () => {
        onChangeActiveTool("select");
    };

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "text" ? "visible" : "hidden"
            )}
        >
            <ToolSideBarHeader
                title="Text Options"
                description="Add text to your design"
            />
            <ScrollArea>
                <div className="p-4 space-y-4 border-b">
                    <Button
                        className="w-full"
                        onClick={() => editor?.addText("Add Text")}
                    >
                        Add TextBox
                    </Button>
                    <Button
                        className="w-full h-16"
                        variant={"secondary"}
                        size={"lg"}
                        onClick={() =>
                            editor?.addText("Add Heading", {
                                fontSize: 80,
                                fontWeight: 700,
                            })
                        }
                    >
                        <span className="font-bold text-2xl">Add Heading</span>
                    </Button>
                    <Button
                        className="w-full h-16"
                        variant={"secondary"}
                        size={"lg"}
                        onClick={() =>
                            editor?.addText("Add Subheading", {
                                fontSize: 60,
                                fontWeight: 500,
                            })
                        }
                    >
                        <span className="font-bold text-lg">
                            Add Subheading
                        </span>
                    </Button>
                    <Button
                        className="w-full h-16"
                        variant={"secondary"}
                        size={"lg"}
                        onClick={() =>
                            editor?.addText("Add Paragraph", {
                                fontSize: 40,
                            })
                        }
                    >
                        <span className="font-bold text-sm">Add Paragraph</span>
                    </Button>
                </div>
            </ScrollArea>

            <ToolSideBarClose onClick={onClose} />
        </aside>
    );
};

export default TextSideBar;
