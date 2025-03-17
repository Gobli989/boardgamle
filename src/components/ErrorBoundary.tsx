import { useRouteError } from "react-router-dom"

export default function ErrorBoundary() {
    const error = useRouteError();

    if (error instanceof Error) {
        return <ErrorMain>
            <ErrorValue error={error as Error} />
        </ErrorMain>;
    }

    const webError = error as { status: number, data: string, error: Error };

    return <ErrorMain>
            <p className="text-center font-extrabold tracking-widest" style={{fontSize: "7.5rem"}}>{webError.status}</p>
            <ErrorValue error={webError.error as Error} />
        </ErrorMain>;
}

function ErrorValue(props: { error: Error }) {
    const e = props.error;

    return <>
        <p className="text-sm text-stone-500">An error was thrown, this is all we know:</p>
        <p className="font-mono text-lg">{e.message}</p>
        <p className="mt-5 text-sm text-stone-500">Error stack trace:</p>
        <textarea className="w-full resize-none bg-stone-800 h-32 p-5 rounded-lg font-mono text-nowrap overflow-hidden outline-none" readOnly defaultValue={e.stack} />
        <div className="mt-5">
            <button className="px-5 py-3 bg-lime-500 rounded-lg text-black text-sm float-end" onClick={() => {
                navigator.clipboard.writeText(`message: ${e.message}; stack:${e.stack}`);
            }}>
                Copy everything that I need
            </button>
            <button className="px-5 py-3 bg-red-500 rounded-lg text-black text-sm" onClick={() => {
                window.location.replace("/");
            }}>
                Go home
            </button>
        </div>
    </>;
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