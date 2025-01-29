import { createContext, useContext, useState } from "react";
import { XIcon } from "../icons/Icons";

const context = createContext<{
    closeAlert:(id:string) => void,
    showAlert: (alert: Alert) => void,
    alerts: Alert[]
}>({
    closeAlert: () => {},
    showAlert: () => {},
    alerts: [],
});

export default function OverlayProvider(props: { children?: React.ReactNode }) {

    const [alerts, setAlerts] = useState<Alert[]>([]);

    return <context.Provider value={{
        closeAlert,
        showAlert,
        alerts
    }}>
        {/* Overlay Container */}
        {alerts.length > 0 && <div className="fixed top-0 left-0 w-screen h-screen z-20 flex justify-center items-center backdrop-blur-md bg-black/5">
            {alerts.map((alert) => (
                <div className="bg-white dark:text-white dark:bg-stone-800 border border-stone-200 dark:border-stone-600 p-5 min-w-96 max-w-screen-sm rounded-lg relative" key={`alert-${alert.id}`}>

                    {alert.showCloseButton && <button className="absolute right-5 top-5" onClick={() => closeAlert(alert.id)}>
                        <XIcon className="fill-black dark:fill-white" />
                    </button>}

                    {alert.content}
                </div>
            ))}
        </div>}

        {props.children}
    </context.Provider>;

    function closeAlert(id: string) {
        setAlerts(
            alerts.filter(a => a.id !== id)
        );
    }

    function showAlert(alert: Alert) {
        setAlerts([
            ...alerts,
            alert
        ]);
    }

}

// eslint-disable-next-line react-refresh/only-export-components
export function useOverlay() {
    return useContext(context);
}

export type Alert = {
    id: string,
    content: React.ReactNode,
    showCloseButton?: boolean,
}