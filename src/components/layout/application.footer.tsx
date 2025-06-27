import { Text } from "../typeography/text"
import { siteConfig } from "@/config/site"
import { Anchor } from "../typeography/anchor"

export function ApplicationFooter() {
  return (
    <footer className="justify-center py-6 md:py-0 flex">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <Text className="text-balance text-center leading-loose md:text-left" tint={"subtle"} variant={"label"}>
          Built by{" "}
          <Anchor
            href={siteConfig.links.homepage}
            target="_blank"
            rel="noreferrer"
            variant={"label"}
          >
            {siteConfig.maintainer}
          </Anchor>
          . The source code is available on{" "}
          <Anchor
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            variant={"label"}
          >
            Github
          </Anchor>
          .
        </Text>
      </div>
    </footer>
  )
}


