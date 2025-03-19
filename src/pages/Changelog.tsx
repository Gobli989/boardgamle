import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { LeftChevronIcon } from "../icons/Icons";

export default function ChangelogPage() {
    return <div className="min-w-full min-h-screen dark:bg-stone-900 overflow-x-hidden">
        <Navbar />

        <main className="block max-w-screen-md mx-auto dark:text-white py-5 px-8 md:px-0">

            <Link to="/" className="underline-offset-2 block hover:-translate-x-5 transition">
                <LeftChevronIcon className="fill-black dark:fill-white inline-block" /> Go back home
            </Link>

            <section id="v2_0_1" className="mt-24 relative">
                <Title
                    // TODO: Change this date whenever I release it
                    date="2025. 03. 19."
                    backText="Changelog"
                >
                    Non repeating rng v2.0.1
                </Title>

                <p className="text-balance text-lg">Finally made a non repeating Random Number Generator, so all the games throughout a year all the games will be different.</p>

            </section>

            <section id="v2" className="mt-24 relative">

                <Title
                    date="2025. 03. 17."
                    backText="Changelog"
                >
                    Boardgamle v2
                </Title>

                <p className="text-balance text-lg">Boardgamle has been completely rewritten, introducing a fresh new design and several major enhancements for better user experience.</p>

                <div className="mt-10">
                    <h3 className="text-2xl font-bold">New Features & Improvements:</h3>

                    <ul className="list-disc text-lg">

                        <li>Revamped UI with animations</li>

                        <li>Updated game list</li>

                    </ul>

                    <li className="relative mt-6">
                        <span className="text-5xl font-extrabold tracking-tighter -top-6 absolute text-stone-100 dark:text-stone-800 pointer-events-none select-none text-nowrap">Big Feature</span>
                        <h4 className="font-semibold text-lg z-10 relative">Calendar feature to access the past 30 days of games</h4>

                        <p className="mt-2 text-sm">Thank your for the suggestion:</p>
                        <ul className="text-xs list-disc list-inside">
                            <li>Jack Q.</li>
                            <li>István N.</li>
                            <li>Donna L.</li>
                            <li>Levente M.</li>
                            <li>Guilherme T.</li>
                            <li>Rodrigo P.</li>
                            <li>John</li>
                        </ul>
                    </li>

                    <li className="relative mt-6">
                        <span className="text-5xl font-extrabold tracking-tighter -top-6 absolute text-stone-100 dark:text-stone-800 pointer-events-none select-none text-nowrap">Big Feature</span>
                        <h4 className="font-semibold text-lg z-10 relative">Now the rank, publishing year and complexity is visible.</h4>

                        <p className="mt-2 text-sm">Thank your for the suggestion:</p>
                        <ul className="text-xs list-disc list-inside">
                            <li>Luiz P.</li>
                        </ul>
                    </li>

                </div>

                <div className="mt-10">
                    <h3 className="text-2xl font-semibold">Developer stuff</h3>

                    <ul className="text-lg list-disc">

                        <li>LocalStorage for saving daily game progress</li>
                        <li>Automatic BoardGameGeek data parser</li>
                        <li>Switched to Tailwind CSS for styling</li>
                        <li>Added error handling with a custom design</li>
                        <li>Finally implemented a testing framework</li>

                    </ul>
                </div>

                <div className="mt-10">
                    <h3 className="text-xl font-semibold">Upcoming Plans</h3>

                    <ul className="text-sm list-disc">

                        <li>Transition to Temporal API for better date management</li>
                        <li>Fix the bug report and feedback forms</li>
                        <li>Implement a seeded random number generator that does not repear in the last 365 days</li>
                        <li>Improve user-friendly alert system</li>
                        <li>Player statistics</li>
                        <li>Sharing games and generating cool design for it.</li>

                    </ul>

                </div>

            </section>

        </main>

        <Footer />
    </div>;
}

function Title(props: { children: React.ReactNode, date?: string, backText?: string }) {
    return <>
        {props.backText && <span className="-top-14 text-8xl font-extrabold tracking-tighter absolute text-stone-100 dark:text-stone-800 pointer-events-none select-none text-nowrap">{props.backText}</span>}
        <h2 className="text-5xl font-extrabold mb-3 relative z-10 leading-10 md:leading-normal">{props.children} {props.date && <span className="text-sm font-semibold text-stone-400 italic block md:inline">{props.date}</span>}</h2>
    </>
}