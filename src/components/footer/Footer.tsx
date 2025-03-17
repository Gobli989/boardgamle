export default function Footer() {
    return <footer className="w-full h-24 mt-24 bg-gray-50 dark:bg-stone-800 border-t border-gray-300 dark:border-stone-600 flex flex-col justify-center items-center">
        <p className="text-black dark:text-white">
            Made with
            &nbsp;
            <span className="text-rainbow-anim inline-block">❤</span>
            &nbsp;
            by
            &nbsp;
            <a href="https://rubenxd.hu" target="_blank" className="underline">Ruben</a>
        </p>
    </footer>;
}