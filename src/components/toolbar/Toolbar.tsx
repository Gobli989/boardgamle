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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='outside-btn-icon'>
                    {/* <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                    <path style={{ fill: 'var(--text)' }} d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" />
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="outside-btn-icon"
                    >
                        {/*<!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}
                        <path
                            style={{ fill: "var(--text)" }}
                            d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="outside-btn-icon"
                    >
                        {/*<!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}
                        <path
                            style={{ fill: "var(--text)" }}
                            d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
                        />
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="outside-btn-icon"
                >
                    {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                    <path
                        style={{ fill: "var(--text)" }}
                        d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="outside-btn-icon"
                >
                    {/*<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                    <path
                        style={{ fill: "var(--text)" }}
                        d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" />
                </svg>

                <span className="outside-btn-label">Give Feedback!</span>
            </button>

        </div>
    </>;
}