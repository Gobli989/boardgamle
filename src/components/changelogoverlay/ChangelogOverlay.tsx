import { UPDATE_LIST } from "../../UpdateList";
import Overlay from "../Overlay";

export default function ChangelogOverlay(props: {
    shown: boolean;
    setShown: () => void;
}) {
    return (
        <Overlay shown={props.shown}>
            <div className="overlay-container">
                <span className="overlay-container-x" onClick={props.setShown}>
                    &times;
                </span>
                <h1>Changelog</h1>

                {/* Changelog */}

                {UPDATE_LIST.map((update, index) => {
                    return <>
                        <h3 key={'update-ul-title-' + index}>Update {update.version}</h3>
                        <ul key={'update-ul-' + index}>
                            {update.changes.map((changes, index) => {
                                return <li key={'update-li-' + index}>{changes}</li>
                            })}
                        </ul>
                    </>;
                })}

            </div>
        </Overlay>
    );
}
