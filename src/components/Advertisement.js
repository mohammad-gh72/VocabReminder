import advertisementStyle from "../styles-modules/Advertisement.module.css";

export default function Advertisement() {
  return (
    <div className={advertisementStyle.adParent}>
      <span className={advertisementStyle.textsParent}>
        <div className={advertisementStyle.sloganParent}>
          <p className={advertisementStyle.slogan}>
            Your brand, right here! Advertise now
          </p>
          <p className={advertisementStyle.bonus}>
            Be the first and get a one week&nbsp;
            <storage style={{ color: "#ff0342" }}> Free Bonus</storage> !
          </p>
        </div>
        <p className={advertisementStyle.email}>
          Contact me : ghmailbox72@gmail.com
        </p>
      </span>
    </div>
  );
}
