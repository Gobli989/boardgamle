import Overlay from "../Overlay";

export default function FeedbackOverlay(props: {
    shown: boolean,
    setShown: () => void,
}) {
    return (
        <Overlay shown={props.shown}>
            <div className="overlay-container">
                <span className="overlay-container-x" onClick={props.setShown}>
                    &times;
                </span>

                <h1>Give Feedback!</h1>

                <p>
                    If a feature is missing or you have an idea for a new feature,
                    please let us know! We are always looking for ways to improve
                    the Boardgamle experience.
                    If your found a bug, please use the Bug Report form.
                </p>

                <form name="feedback" method="post" className="form-container">
                    <input type="hidden" name="form-name" value="feedback" />

                    <label className="form-label" htmlFor="fb_name">
                        Name
                        <span className="small">This is to give credit for features.</span>
                    </label>
                    <input className="form-input" type="text" id="fb_name" name="fb_name" placeholder="John Doe" required />

                    <label className="form-label" htmlFor="fb_email">Email</label>
                    <input className="form-input" type="email" id="fb_email" name="fb_email" placeholder="someone@example.com" />

                    <label className="form-label" htmlFor="fb_message">Message <span className="req">*</span></label>
                    <textarea className="form-input" name="fb_message" id="fb_message" rows={12} placeholder="Your message comes here..." required />

                    <button className="form-button btn" type="submit">Send Feedback</button>

                </form>

            </div>
        </Overlay>
    );
}