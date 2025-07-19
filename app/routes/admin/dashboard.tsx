import { Breadcrumb, HRgraph, StatsCard, PerformanceTrend } from "../../../components"
import { getDashboardStats } from "../../lib/dummy"

const DashboardStats = getDashboardStats();

const Dashboard = () => {
  const user = {
    name: 'Tommy'
  }

  return (
    <main className="dashboard wrapper">
      <Breadcrumb 
        title={`Welcome ${user?.name ?? 'Guest'}`}
        description= "Track the users' heart rate's and heart rate history."
      />
      
      {/* This will be the User Overview Section (Total Users, Active Users, ) */}
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* // @ts-ignore */}
          <StatsCard 
            headerTitle="Total Althletes"
            total={DashboardStats.totalAthletes}
          />
          {/* // @ts-ignore */}
          <StatsCard 
            headerTitle="Average Heart Rate"
            avgHearRate={DashboardStats.avgHearRate}
          />
          {/* // @ts-ignore */}
          <StatsCard 
            headerTitle="Current Active Atheletes"
            activeAthletes={DashboardStats.activeAthletes}
          />
        </div>
      </section>

      {/* This will be the heart Rate Data Of currently active users */}
      <section>
        <div>
          <HRgraph />
        </div>
      </section>

      <section>
        <div>
          <PerformanceTrend />
        </div>
      </section>
    </main>
  )
}

export default Dashboard