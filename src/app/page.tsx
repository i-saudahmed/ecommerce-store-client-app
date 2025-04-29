"use client";
import SectionOne from "./components/Home/SectionOne";
import Section2 from "./components/Home/Section2";
import SectionThree from "./components/Home/SectionThree";
import Product1 from "./components/Products/Products";
import SectionFour from "./components/Home/SectionFour";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <SectionOne />
      <Section2 />
      <SectionThree />
      <SectionFour />
    </>
  );
}
