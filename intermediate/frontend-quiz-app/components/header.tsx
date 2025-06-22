"use client";

import Image from "next/image";
import buttons from "@/styles/Buttons.module.css";
import DaylightSVGDark from "@/public/images/icon-sun-dark.svg";
import DaylightSVGLight from "@/public/images/icon-sun-light.svg";
import NightlightSVGDark from "@/public/images/icon-moon-dark.svg";
import NightlightSVGLight from "@/public/images/icon-moon-light.svg";
import styles from "@/styles/Home.module.css";
import { HeaderProps } from "@/lib/definitions";
import fonts from "@/styles/Fonts.module.css";
import { useTheme } from "@/context/ThemeContext";

export default function Header({ title, svgImage, bgColor }: HeaderProps) {
  const { darkMode, toggleTheme } = useTheme();
  console.log("darkmode", darkMode);
  return (
    <header className={`${styles.header_container}`}>
      <div className={`${styles.icon_container}`}>
        <div style={{ backgroundColor: `${bgColor}` }}>
          {svgImage && svgImage.length > 0 ? (
            <Image
              src={svgImage}
              alt={`${title} icon`}
              width={29}
              height={29}
            />
          ) : (
            ""
          )}
        </div>

        <span className={`${fonts.txt_preset_4}`}>{title}</span>
      </div>

      <div className={`${buttons.mode_container}`}>
        <Image
          src={darkMode ? DaylightSVGLight : DaylightSVGDark}
          alt="Daylight icon"
          width={20}
          height={20}
        />
        <label className={`${buttons.switch}`}>
          <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
          <span className={`${buttons.slider} ${buttons.round}`}></span>
        </label>
        <Image
          src={darkMode ? NightlightSVGLight : NightlightSVGDark}
          alt="Daylight icon"
          width={20}
          height={20}
        />
      </div>
    </header>
  );
}
