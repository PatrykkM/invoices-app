"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HomeSkeleton from "../components/layouts/HomeSkeleton";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, [router]);

  return <HomeSkeleton />;
}
