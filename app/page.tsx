import LatestIssues from "@/app/LatestIssues";
import IssueSummary from "@/app/IssueSummary";
import prisma from "@/prisma/client";

export default async function Home({searchParams}: {searchParams: {page: string}}) {
  const open = await prisma.issue.count({where: {status: 'OPEN'}})
  const closed = await prisma.issue.count({where: {status: 'CLOSED'}})
  const inProgress = await prisma.issue.count({where: {status: 'IN_PROGRESS'}})
  return (
    <IssueSummary open={open} closed={closed} inProgress={inProgress}/>

  )
}
