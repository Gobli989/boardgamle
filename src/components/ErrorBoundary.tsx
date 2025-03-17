import { useRouteError } from "react-router-dom"

export default function ErrorBoundary() {
    const error = useRouteError();

    if (error instanceof Error) {
        const e = error as Error;

        return <ErrorMain>
            <p className="text-sm text-stone-500">An error was thrown while playing the game, this is all we know:</p>
            <p className="font-mono">{e.message}</p>

            <p className="mt-12 text-sm text-stone-500">Error stack trace, please send it as a bug report:</p>
            <textarea className="w-full resize-none bg-stone-800 h-32 p-5 rounded-lg font-mono text-nowrap" readOnly defaultValue={e.stack} />

            <div className="mt-5">
                <button className="px-5 py-3 bg-lime-500 rounded-lg text-black text-sm float-end" onClick={() => {
                    navigator.clipboard.writeText(`message: ${e.message}; stack:${e.stack}`);
                }}>
                    Copy everything that I need
                </button>

                <button className="px-5 py-3 bg-red-500 rounded-lg text-black text-sm" onClick={() => {
                    window.location.reload();
                }}>
                    Refresh page
                </button>
            </div>
        </ErrorMain>
    }

    return <p>Unknown error was thrown.</p>
}

function ErrorMain(props: { children?: React.ReactNode }) {
    return (
        <div className="w-screen h-screen dark:bg-stone-900 text-white flex flex-col items-center justify-center">

            <h1 className="text-4xl text-center font-bold pt-5 dark:text-white">Boardgamle</h1>

            <div className="max-w-screen-sm w-full mx-12 p-5 border border-stone-500 rounded-lg mt-5">

                {props.children}
            </div>


        </div>
    );
}