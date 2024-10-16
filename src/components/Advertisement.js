import advertisementStyle from "../styles-modules/Advertisement.module.css";

export default function Advertisement() {
  return (
    <div className={advertisementStyle.adParent}>
      <span className={advertisementStyle.textsParent}>
        {/* <div className={advertisementStyle.sloganParent}>
          <p className={advertisementStyle.slogan}>
            Your brand, right here! Advertise now.
          </p>
          <p className={advertisementStyle.bonus}>
            Be the first to advertise and enjoy a&nbsp;
            <strong style={{ color: "#ff0342" }}> Free Bonus</strong> !
          </p>
        </div> */}
        <p className={advertisementStyle.note}>
          <strong
            style={{
              color: "#F5F5DC",
              fontSize: "14px",
              transform: "translateY(-1px)",
            }}
          >
            Enjoying the app?&nbsp;
          </strong>
          Rate and review it to support me and help others discover it!
        </p>
        {/* <p className={advertisementStyle.email}>
          Contact me : ghmailbox72@gmail.com
        </p> */}
      </span>
    </div>
  );
}
