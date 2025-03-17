export default function BugReportOverlay() {
    return <>
        <h1 className="text-2xl font-bold">Report a bug!</h1>

        <p>
            Have your found any bugs or non intentional "features"?
            Report them here and we will try to resolve them!
            If you have an idea for a new feature, please
            use the Feeback form.
        </p>

        <form name="bug_report" method="post" className="block">
            <input type="hidden" name="form-name" value="bug_report" />

            <div className="mt-5">
                <label className="block leading-none mb-1" htmlFor="fb_name">
                    Name
                    <span className="block text-xs italic text-stone-500">This is to give credit for a bugfix.</span>
                </label>
                <input className="outline-none border border-neutral-200 dark:border-stone-600 dark:bg-stone-800 rounded-xl w-full p-2" type="text" id="fb_name" name="fb_name" placeholder="John Doe" required />
            </div>

            <div className="mt-5">
                <label className="block" htmlFor="br_email">Email</label>
                <input className="outline-none border border-stone-200 dark:border-stone-600 dark:bg-stone-800 rounded-xl w-full p-2" type="email" id="email" placeholder="someone@example.com" />
            </div>

            <div className="mt-5">
                <label className="block leading-none" htmlFor="br_message">
                    Message
                    <span className="block text-xs italic text-stone-500">
                        Please give clear step by step instructions
                        on how to reproduce the bug and what you expected to happen.
                    </span>
                </label>
                <textarea
                    className="w-full border border-stone-200 p-2 rounded-xl resize-none dark:border-stone-600 dark:bg-stone-800"
                    name="br_message"
                    id="br_message"
                    rows={12}
                    placeholder="Your message comes here..."
                />

            </div>

            <button className="rounded-xl bg-lime-500 dark:text-black px-5 py-2 mt-3" type="submit">Send Report</button>

        </form>

    </>;
}