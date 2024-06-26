import LatestIssues from "@/app/LatestIssues";
import IssueSummary from "@/app/IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "@/app/IssueChart";
import {Flex, Grid} from "@radix-ui/themes";
import {Metadata} from "next";

export default async function Home({searchParams}: {searchParams: {page: string}}) {
  const open = await prisma.issue.count({where: {status: 'OPEN'}})
  const closed = await prisma.issue.count({where: {status: 'CLOSED'}})
  const inProgress = await prisma.issue.count({where: {status: 'IN_PROGRESS'}})
  return (
      <Grid columns={{initial: '1', md: '2'}} gap={'5'}>
        <Flex direction='column' gap={'5'}>
            <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
            <IssueChart open={open} closed={closed} inProgress={inProgress}/>
        </Flex>
        <LatestIssues/>
      </Grid>
  )
}

export const metadata: Metadata = {
    title: 'Issue tracker - Dashboard',
    description: 'View a summary of project issues'
}