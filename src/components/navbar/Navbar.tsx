import "./NavbarItem.css";

import { BugIcon, CalendarIcon, ChatIcon, InfoIcon, ListIcon, MoonIcon, SunIcon, XIcon } from "../../icons/Icons";
import { useReducer, useState } from "react";
import { useOverlay } from "../OverlayContext";
import InfoOverlay from "../overlays/InfoOverlay";
import BugReportOverlay from "../overlays/BugReportOverlay";
import FeedbackOverlay from "../overlays/FeebackOverlay";
import CalendarOverlay from "../overlays/CalendarOverlay";

export default function Navbar() {

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const overlay = useOverlay();
    const [open, setOpen] = useState<boolean>(false);

    return <>

        <button className="w-12 h-12 p-2 block md:hidden" onClick={() => setOpen(!open)}>
            <ListIcon className="w-full h-full fill-black dark:fill-white" />
        </button>

        <nav className={`fixed ${open ? "left-0 md:left-0" : "-left-full md:left-0"} top-0 h-screen w-screen md:w-12 bg-neutral-50 dark:bg-stone-800 flex flex-col md:items-center px-5 md:px-0 pt-5 gap-2 z-10 transition-all`}>

            {/* Close button */}
            <button className="absolute top-5 right-5 w-6 h-6 block md:hidden" onClick={() => setOpen(false)}>
                <XIcon className="fill-black dark:fill-white" />
            </button>

            <p className="font-bold text-2xl block md:hidden dark:text-white">Boardgamle</p>

            <NavbarItem
                icon={<InfoIcon className="fill-black dark:fill-white" />}
                name="Info"
                onClick={() => {
                    overlay.showAlert({
                        id: "info_overlay",
                        showCloseButton: true,
                        content: <InfoOverlay />
                    });
                }}
            />

            <NavbarItem
                icon={
                    document.body.classList.contains("dark") ?
                        <MoonIcon className="fill-black dark:fill-white" /> :
                        <SunIcon className="fill-black dark:fill-white" />
                }
                name="Toggle Dark mode"
                onClick={() => {
                    document.body.classList.toggle("dark");
                    forceUpdate();
                }}
            />

            <NavbarItem
                icon={<CalendarIcon className="fill-black dark:fill-white" />}
                name="Previous days"
                onClick={() => overlay.showAlert({
                    id: "calendar_overlay",
                    showCloseButton: true,
                    content: <CalendarOverlay />
                })}
            />

            <NavbarItem
                icon={<BugIcon className="fill-black dark:fill-white" />}
                name="Report a bug!"
                onClick={() => overlay.showAlert({
                    id: "bugreport_overlay",
                    showCloseButton: true,
                    content: <BugReportOverlay />
                })}
            />

            <NavbarItem
                icon={<ChatIcon className="fill-black dark:fill-white" />}
                name="Give feedback!"
                onClick={() => overlay.showAlert({
                    id: "feedback_overlay",
                    showCloseButton: true,
                    content: <FeedbackOverlay />
                })}
            />

        </nav>
    </>;
}

function NavbarItem(props: {
    icon?: React.ReactNode,
    name?: string,
    onClick?: () => void,
}) {
    return <button
        className="w-full md:w-10 h-10 dark:text-white hover:bg-neutral-200 dark:hover:bg-stone-600 rounded-xl transition-colors navbar-item after:dark:bg-stone-600 after:!content-[attr(data-name)] flex flex-row justify-start md:justify-center items-center gap-5"
        data-name={props.name}
        onClick={props.onClick}
        aria-label={props.name}
        >
        {props.icon}

        <span className="inline md:hidden">
            {props.name}
        </span>

    </button>;
}