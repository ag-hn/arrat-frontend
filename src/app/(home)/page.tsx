import { unstable_noStore as noStore } from "next/cache";
import Image from 'next/image';

import { AnimatedGroup } from "@/components/animations/animated-group";
import { Fade } from "@/components/animations/fade";
import { TextEffect } from "@/components/animations/text-effect";
import { ApplicationLaunchArrat } from "@/components/layout/application.launch-arrat";
import { Link } from "@/components/next-view-transitions";
import { Span } from "@/components/typeography/span";
import { siteConfig } from "@/config/site";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default async function Home() {
  noStore();
  return (
    <div className="relative pb-8 pt-8 md:pb-0 lg:pt-36">
      <div className="text-center sm:mx-auto lg:mr-auto">
        <Fade className="mx-auto flex w-fit items-center justify-center gap-2 rounded-md py-1 pl-1.5 pr-3 text-xs font-medium opacity-50 md:text-base">
          <Link
            className="rounded-full px-4 py-2 dark:bg-foreground"
            target="_blank"
            href="https://drive.ohio.gov/"
          >
            <Image
              src="/Drive-Ohio.png"
              alt="DriveOhio logo"
              height={124}
              width={124}
            />
          </Link>
          +
          <Link target="_blank" href="https://www.in.gov/indot/">
            <Image src="/INDOT.png" alt="INDOT logo" height={64} width={64} />
          </Link>
        </Fade>

        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="mt-4 text-balance text-4xl md:text-7xl lg:mt-6 xl:text-[5.25rem]"
        >
          Welcome to the {siteConfig.title}
        </TextEffect>
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.025,
                  delayChildren: 0.75,
                },
              },
            },
            ...transitionVariants,
          }}
          asChild="span"
          className="mx-auto mt-8 max-w-2xl text-balance text-lg"
        >
          The{" "}
          <Span className="font-medium" tint={"strong"}>
            {" "}
            AV Readiness Road Audit Tool (ARRAT){" "}
          </Span>{" "}
          provides access to predication machine output data and scores through
          an interactive web-based map. Navigate by clicking on the map segments
          to drill into detailed road audit information and images.
        </AnimatedGroup>

        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.75,
                },
              },
            },
            ...transitionVariants,
          }}
          className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
        >
          <ApplicationLaunchArrat href={"/sessions"} />
          <ApplicationLaunchArrat href={"/session-manager"} variant={"ghost"}>
            Manage sessions
          </ApplicationLaunchArrat>
        </AnimatedGroup>
      </div>
    </div>
  );
}
