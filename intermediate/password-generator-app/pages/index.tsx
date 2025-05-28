import Image from "next/image";
import Head from "next/head";
import PasswordInput from "../components/password-input";
import Slider from "@/components/slider";
import Checkbox from "@/components/checkbox";

export default function Home() {
  return (
    <>
      <Head>
        <h1 className="font-display text-preset-2 text-grey-600 w-full bg-amber-700">
          Password Generator
        </h1>
      </Head>
      <div className={`font-display bg-amber-950 w-full min-w-full`}>
        <PasswordInput />
        <div className=" w-full min-w-full">
          <Slider />
          <Checkbox />
        </div>
      </div>
    </>
  );
}
