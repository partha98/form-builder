import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetFormStats } from "./actions/form"
import { LuView } from "react-icons/lu"
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { ReactNode, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";


interface StatsCardsProps{
  data?: Awaited<ReturnType<typeof GetFormStats> >;
  loading: boolean;
}

export default function Home() {
  return (
    <div className="container pt-4 ">
      <Suspense fallback={<StatsCards loading={true}/>}>
        <CardStatsWrapper/>
      </Suspense>
      <Separator className="my-6"/>
        <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
      <Separator className="my-6"/>
      <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn/>
      </div>
      
    </div>
  )
}

async function CardStatsWrapper(){
  try{
    const stats = await GetFormStats();
    return <StatsCards loading={false} data={stats}/>
  }
  catch(error){
    console.log("Error while fetching form data: ",error);
  }
}

function StatsCards(props: StatsCardsProps){

  const { data ,loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard 
          title="Total Visits" 
          icon={<LuView className="text-blue-600"/>}
          helperText="All time form visits"
          value={data?.visits.toLocaleString() || ""}
          loading={loading}
          className="shadow-md shadow-blue-600"
          />
      <StatsCard 
          title="Total Submissions" 
          icon={<FaWpforms className="text-yellow-600"/>}
          helperText="All time form submissions"
          value={data?.submissions.toLocaleString() || ""}
          loading={loading}
          className="shadow-md shadow-yellow-600"
          />
      <StatsCard 
          title="Submission Rate" 
          icon={<HiCursorClick className="text-purple-600"/>}
          helperText="Visits that result in form submissions"
          value={data?.submissionRate.toLocaleString() + "%" || ""}
          loading={loading}
          className="shadow-md shadow-purple-600"
          />
      <StatsCard 
          title="Bounce Rate" 
          icon={<TbArrowBounce  className="text-pink-600"/>}
          helperText="Visits that leave without interacting"
          value={data?.bounceRate.toLocaleString() + "%" || ""}
          loading={loading}
          className="shadow-md shadow-pink-600"
          />
    </div>
  );

}

function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className
}: {
  title: string;
  icon: ReactNode;
  helperText: string;
  value: string;
  loading: Boolean;
  className: string;
}){
  return <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {
          loading && (
          <Skeleton>
              <span className="opacity-0">0</span>
          </Skeleton>
        )}
        {!loading && value}
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </div>
    </CardContent>
  </Card>
}
