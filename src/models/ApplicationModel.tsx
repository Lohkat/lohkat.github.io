import { useState, useRef } from "react";

// Definition of an app, with its static data and a clone-able base invoker
export interface ApplicationDefinition {
    title: string,
    icon: string | null,
    base: () => React.JSX.Element
};

// Instance of ApplicationContext, live
export interface ApplicationContext {
    title: string,
    icon: string | null,
    id: number,
    self: React.JSX.Element,
    taskbar: React.JSX.Element | null
};

// Class-like definition of a handler of apps
export interface ApplicationController {
    apps: ApplicationContext[],
    registries: ApplicationDefinition[],

    registerApp: (app_definition: ApplicationDefinition) => void,
    launchApp: (app_name: string) => void
};

export const CreateAppManager: () => ApplicationController = () => {
    const [apps, setApps] = useState<ApplicationContext[]>([]);
    const registries = useRef<ApplicationDefinition[]>([]);
    let current_id = useRef(0);

    const appCounter = {
        getNext: () => { return ++current_id.current; }
    };

    return ({
        apps,
        registries: registries.current,

        registerApp: (app_definition: ApplicationDefinition) => {
            registries.current.push(app_definition);
        },
        launchApp: (app_name: string) => {
            const app = registries.current.find(e => e.title === app_name);
            if (!app) throw Error("Invalid app name!");

            const BaseComponent = app.base;
            const id = appCounter.getNext();

            console.log(`Launching #${id} ${app.title}`);

            setApps((prev) => [...prev, {
                title: app.title,
                id,
                icon: app.icon,
                self: <BaseComponent />,
                taskbar: null
            }]);
        }
    });
};