import React from "react";
import { ActiveTool } from "@/features/editor/type";
import { cn } from "@/lib/utils";
import ToolSideBarHeader from "../toolSideBarHeader/ToolSideBarHeader";
import ToolSideBarClose from "../toolSideBarClose/ToolSideBarClose";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "../shapeTool/ShapeTool";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
interface ShapeSideBarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}
const ShapeSideBar = ({
    activeTool,
    onChangeActiveTool,
}: ShapeSideBarProps) => {
    const onClose = () => {
        onChangeActiveTool("select");
    };
    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "shapes" ? "visible" : "hidden"
            )}
        >
            <ToolSideBarHeader
                title="Shapes"
                description="Add shape to your Canava Nigger!!!"
            />
            <ScrollArea>
                <div className="grid grid-cols-3">
                    <ShapeTool onClick={() => {}} icon={FaCircle} />
                    <ShapeTool onClick={() => {}} icon={FaSquare} />
                    <ShapeTool onClick={() => {}} icon={FaSquareFull} />
                    <ShapeTool onClick={() => {}} icon={IoTriangle} />
                    <ShapeTool
                        onClick={() => {}}
                        icon={IoTriangle}
                        iconClassName="rotate-180"
                    />

                    <ShapeTool onClick={() => {}} icon={FaDiamond} />
                </div>
            </ScrollArea>

            <ToolSideBarClose onClick={onClose} />
        </aside>
    );
};

export default ShapeSideBar;
