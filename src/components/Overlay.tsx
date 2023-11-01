import './Overlay.css';

export default function Overlay(props: { children: React.ReactNode, shown: boolean }) {
    return (
        <div className={`overlay ${props.shown && 'overlay-shown'}`} aria-hidden={!props.shown}>
            {props.children}
        </div>
    );
}