import advertisementStyle from "../styles-modules/Advertisement.module.css";
import TelegramIcon from "../icons/telegram.png";
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
            Enjoying the app? Please&nbsp;
          </strong>
          Rate and review it to support me and help others discover it.&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://chromewebstore.google.com/detail/vocab-reminder/gnckbcdhafjkkhbmonlaiokdahbfpgng"
          >
            Here
          </a>
        </p>

        {/* <p className={advertisementStyle.email}>
          Contact me : ghmailbox72@gmail.com
        </p> */}
      </span>
      <div className={advertisementStyle.hideTelegram}>
        <a
          href="https://t.me/+Dzl-AeLmn7FhZTM8"
          target="_blank"
          rel="noopener noreferrer" // Added for security
        >
          <img
            title="Get aware of updates on the Telegram channel"
            style={{ width: "20px" }}
            src={TelegramIcon}
            alt="Telegram"
          />
        </a>
      </div>
    </div>
  );
}
