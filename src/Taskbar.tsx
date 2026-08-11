import { useRef } from "react";

import './Taskbar.css'
import start_icon from './assets/start_menu_icon.png'

import {type ApplicationContext } from "./models/ApplicationModel"

interface GenericButtonProps {
    instance: ApplicationContext,
    on_click: () => void
};

interface GenericScrollableButtonListProps {
    buttons: GenericButtonProps[]
};

function GenericButton({instance, on_click} : GenericButtonProps) {
    return (
        <div className="taskbar-button" onClick={on_click}>
            <div>
                { instance.icon && <img src={instance.icon}></img> }
                <span>{instance.title}</span>            
            </div>
        </div>
    )
};

function GenericScrollableButtonList({buttons} : GenericScrollableButtonListProps) {
    const switchScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        const deltaY = e.deltaY;
        e.currentTarget.scrollBy(deltaY, 0);
    };

    return (
        <div className="taskbar-button-list" onWheel={switchScroll}>
        {
            buttons.map((each) => (
                <GenericButton key={each.instance.id} instance={each.instance} on_click={each.on_click} />
            ))
        }
        </div>
    )
}

function Dummy() {
    return (
        <>
        </>
    )
};

export default function Taskbar() {

    let counter = useRef(0);

    function generateButton(name: string) {
        return {
            title: name,
            icon: start_icon,
            id: ++counter.current,
            self: <Dummy />,
            taskbar: null
            /*on_click: () => { console.log("PRESSED!"); }*/
        };
    }
    
    const start_prop = {
        instance: generateButton("start"),
        on_click: () => console.log("PRESSED!")
    };

    let test = [];

    for (let i = 0; i < 50; ++i)
        test.push({ instance: generateButton(`app${i}`), on_click: () => console.log(`PRESSED ${i}!`) });

    return (
        <div className="root-taskbar"> {/* minimized */}
            <GenericButton {...start_prop}/>
            <GenericScrollableButtonList buttons={test} />
        </div>
    )
}