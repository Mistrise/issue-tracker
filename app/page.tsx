import LatestIssues from "@/app/LatestIssues";

export default function Home({searchParams}: {searchParams: {page: string}}) {
  return (
    <LatestIssues/>
  )
}
