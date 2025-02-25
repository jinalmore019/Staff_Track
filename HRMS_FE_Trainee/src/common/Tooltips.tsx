import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"


const Tooltips = ({ title, children }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{title || "tooltip"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default Tooltips
