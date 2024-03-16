import { LocalGameData } from '../../types/LocalGameData';
import './Toolbar.css';

export function Toolbar(props: {
    setLocalGameData: React.Dispatch<React.SetStateAction<LocalGameData>>,
    localGameData: LocalGameData,
}) {
    return <>
        <div className="outside">

            {/* Info overlay button */}
            <button className="outside-btn" onClick={() => {
                props.setLocalGameData({
                    ...props.localGameData,
                    overlayShown: {
                        ...props.localGameData.overlayShown,
                        info: !props.localGameData.overlayShown.info
                    }
                });
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='outside-btn-icon'>
                    {/* <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}
                    <path style={{ fill: 'var(--text)' }} d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
                <span className="outside-btn-label">Info</span>
            </button>

            {/* Calendar overlay button */}
            <button className="outside-btn" onClick={() => {
                props.setLocalGameData({
                    ...props.localGameData,
                    overlayShown: {
                        ...props.localGameData.overlayShown,
                        calendar: !props.localGameData.overlayShown.calendar
                    }
                });
            }} style={{ display: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill outside-btn-icon" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                </svg>
                <span className="outside-btn-label">Calendar</span>
            </button>

            {/* Darkmode toggle button */}
            <button
                className="outside-btn"
                onClick={() => {
                    props.setLocalGameData({
                        ...props.localGameData,
                        darkMode: !props.localGameData.darkMode
                    });
                }}
            >
                {props.localGameData.darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun-fill outside-btn-icon" viewBox="0 0 16 16">
                        <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-fill outside-btn-icon" viewBox="0 0 16 16">
                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                    </svg>
                )}
                <span className="outside-btn-label">Toggle Dark Mode</span>
            </button>

            {/* Report a bug button */}

            <button className="outside-btn"
                onClick={() => {
                    props.setLocalGameData({
                        ...props.localGameData,
                        overlayShown: {
                            ...props.localGameData.overlayShown,
                            bugReport: !props.localGameData.overlayShown.bugReport
                        }
                    });
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle-fill outside-btn-icon" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>

                <span className="outside-btn-label">Report a bug!</span>
            </button>

            {/* Give feedback button */}

            <button className="outside-btn"
                onClick={() => {
                    props.setLocalGameData({
                        ...props.localGameData,
                        overlayShown: {
                            ...props.localGameData.overlayShown,
                            feedback: !props.localGameData.overlayShown.feedback
                        }
                    });
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-fill outside-btn-icon" viewBox="0 0 16 16">
                    <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                </svg>

                <span className="outside-btn-label">Give Feedback!</span>
            </button>

            {/* Changelog button */}

            <button className="outside-btn"
                onClick={() => {
                    props.setLocalGameData({
                        ...props.localGameData,
                        overlayShown: {
                            ...props.localGameData.overlayShown,
                            changelog: !props.localGameData.overlayShown.changelog
                        }
                    });
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill outside-btn-icon" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                </svg>

                <span className="outside-btn-label">Changelog</span>
            </button>

        </div>
    </>;
}