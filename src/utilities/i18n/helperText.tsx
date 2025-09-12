import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react"
import { FC } from "react";
import { IoInformationCircleSharp } from "react-icons/io5";
type Props = {
    text: string
    position?: "top" | "bottom"
}

const HelperText: FC<Props> = ({ text, position }) => {
    return (
        <div className={`absolute ${position ? position == "top" ? "top-4 right-4" : "bottom-2 right-4" : "top-4 right-4"}`}>
            <Popover backdrop="blur" showArrow className="!max-w-[300px]" offset={20} placement="bottom">
                <PopoverTrigger>
                    <Button isIconOnly className="text-xl text-primary"><IoInformationCircleSharp /></Button>
                </PopoverTrigger>
                <PopoverContent className="!max-w-[300px] w-[300px]" >
                    <div className="px-1 py-2">
                        <span>{text}</span>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default HelperText