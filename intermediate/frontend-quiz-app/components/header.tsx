"use client";

import Image from "next/image";
import buttons from "@/styles/ToggleMode.module.css";
import DaylightSVGDark from "@/public/images/icon-sun-dark.svg";
import DaylightSVGLight from "@/public/images/icon-sun-light.svg";
import NightlightSVGDark from "@/public/images/icon-moon-dark.svg";
import NightlightSVGLight from "@/public/images/icon-moon-light.svg";
import styles from "@/styles/Header.module.css";
import { HeaderProps } from "@/lib/definitions";
import fonts from "@/styles/Fonts.module.css";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

export default function Header({ title, svgImage, bgColor }: HeaderProps) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className={`${styles.header_container}`}>
      <div className={`${styles.icon_container}`}>
        <Link href="/" aria-label="Home">
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
        </Link>

        <span className={`${fonts.txt_preset_4} ${fonts.font_styles_1}`}>
          {title}
        </span>
      </div>

      <div className={`${buttons.mode_container}`}>
        <Image
          src={darkMode ? DaylightSVGLight : DaylightSVGDark}
          alt="Daylight icon"
          width={20}
          height={20}
        />
        <label htmlFor="darkMode-toggle" className={`${buttons.switch}`}>
          <input
            id="darkMode-toggle"
            aria-label="Dark mode toggle"
            type="checkbox"
            checked={darkMode}
            onChange={toggleTheme}
          />
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
