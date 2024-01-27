import Overlay from "../Overlay";

export default function BugReportOverlay(props: {
    shown: boolean,
    setShown: () => void,
}) {
    return (
        <Overlay shown={props.shown}>
            <div className="overlay-container">
                <span className="overlay-container-x" onClick={props.setShown}>
                    &times;
                </span>

                <h1>Report a bug!</h1>

                <p>
                    Have your found any bugs or non intentional "features"?
                    Report them here and we will try to resolve them!
                    If you have an idea for a new feature, please
                    use the Feeback form.
                </p>

                <form name="bug_report" method="post" className="form-container">
                    <input type="hidden" name="form-name" value="bug_report" />

                    <label className="form-label" htmlFor="fb_name">
                        Name <span className="req">*</span>
                        <span className="small">This is to give credit for a bugfix.</span>
                    </label>
                    <input className="form-input" type="email" id="fb_name" name="fb_name" placeholder="John Doe" required />

                    <label className="form-label" htmlFor="br_email">Email</label>
                    <input className="form-input" type="email" id="email" placeholder="someone@example.com" />

                    <label className="form-label" htmlFor="br_message">
                        Message
                        <span className="small">
                            Please give clear step by step instructions
                            on how to reproduce the bug and what you expected to happen.
                        </span>
                    </label>
                    <textarea
                        className="form-input"
                        name="br_message"
                        id="br_message"
                        rows={12}
                        placeholder="Your message comes here..."
                    />

                    <button className="form-button btn" type="submit">Send Report</button>

                </form>

            </div>
        </Overlay>
    );
}