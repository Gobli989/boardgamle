import { EAdType } from "../../types/EAdType";
import './Ad.css';

export default function Ad(props: { type: EAdType, slot: string }) {

    let adClass = "";
    let adSize: { w: number, h: number } = { w: 350, h: 400 };

    switch (props.type) {
        case EAdType.TALL: {
            adClass = "ad-tall";
            adSize = { w: 350, h: 400 };
            break;
        }
        case EAdType.WIDE: {
            adClass = "ad-wide";
            adSize = { w: 360, h: 120 };
            break;
        }
    }

    return <>
        <div className={`ad ${adClass}`}>
            <div className="ad-placement">
                <>
                    <ins className="adsbygoogle"
                        style={{ display: "inline-block", width: `${adSize.w}px`, height: `${adSize.h}px` }}
                        data-ad-client="ca-pub-8336690542496783"
                        data-ad-slot={props.slot}
                        data-ad-format="auto"
                        data-full-width-responsive="true">
                    </ins>
                </>
            </div>

            <div className="ad-not-showing">
                <span>Your ad blocker removed this ad from the website. All ads are meeting the <a href="https://acceptableads.com/" target="">Acceptable Ads</a> standard. Support us by disabling your ad blocker.</span>
            </div>

        </div>
    </>;
}