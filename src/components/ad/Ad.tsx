import { EAdType } from "../../types/EAdType";
import './Ad.css';

export default function Ad(props: { type: EAdType }) {

    let adClass = "";

    switch (props.type) {
        case EAdType.WIDE: adClass = "ad-wide"; break;
    }

    return <>
        <div className={`ad ${adClass}`}>
            <div className="ad-placement" />

            <div className="ad-not-showing">
                <span>Your ad blocker removed this ad from the website. All ads are meeting the <a href="https://acceptableads.com/" target="">Acceptable Ads</a> standard. Support us by disabling your ad blocker.</span>
            </div>

        </div>
    </>;
}