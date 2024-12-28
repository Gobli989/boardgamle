export default function FeedbackOverlay() {
    return <>
        <h1 className="text-2xl font-bold">Give Feedback!</h1>

        <p>
            If a feature is missing or you have an idea for a new feature, please let us know! We are always looking for ways to improve the Boardgamle experience. If your found a bug, please use the Bug Report form.
        </p>

        <form name="feedback" method="post" className="block">
            <input type="hidden" name="form-name" value="feedback" />

            <div className="mt-3">
                <label className="block mb-1 leading-none" htmlFor="fb_name">
                    Name
                    <span className="block text-xs italic text-stone-500">This is to give credit for features.</span>
                </label>
                <input className="outline-none border border-stone-200 dark:border-stone-600 dark:bg-stone-800 rounded-xl w-full px-2 py-2" type="text" id="fb_name" name="fb_name" placeholder="John Doe" required />
                
            </div>

            <div className="mt-3">
                <label className="block" htmlFor="fb_email">Email</label>
                <input className="outline-none border border-stone-200 dark:border-stone-600 dark:bg-stone-800 rounded-xl w-full px-2 py-2" type="email" id="fb_email" name="fb_email" placeholder="someone@example.com" />
            </div>

            <div className="mt-3">
                <label className="block" htmlFor="fb_message">Message <span className="text-red-500">*</span></label>
                <textarea className="outline-none w-full border border-stone-200 dark:border-stone-600 dark:bg-stone-800 p-2 rounded-xl resize-none" name="fb_message" id="fb_message" rows={12} placeholder="Your message comes here..." required />
            </div>

            <button className="rounded-xl bg-lime-500 dark:text-black px-5 py-2 mt-3 float-right" type="submit">Send Feedback</button>

        </form>

    </>;
}