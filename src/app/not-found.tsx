import { NavigationLink } from "@/components/layout/navigation.link";
import { Text } from "@/components/typeography/text";

export default async function NotFound() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <Text variant={"title"}>Looks like you weren&apos;t supposed to see this!</Text>
      <NavigationLink variant={"ghost"} className="text-strong-foreground" href={"/"}>Want us to take you back home?</NavigationLink>
    </div>
  )
}
