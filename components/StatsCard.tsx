
const StatsCard = ({
  headerTitle,
  total,
  avgHearRate,
  activeAthletes
}: StatsCard) => {
  return (
    <article className="stats-card">
      <h3 className="text-base font-medium">
        {headerTitle}
      </h3>
      <div className="content">
        <div>
          {total !== undefined && (
          <h2 className="text-4xl text-purple-600 font-bold">{total}</h2>
        )}
        {avgHearRate !== undefined && (
          <h2 className="text-4xl text-purple-600 font-bold">{avgHearRate}</h2>
        )}
        {activeAthletes !== undefined && (
          <h2 className="text-4xl text-purple-600 font-bold">{activeAthletes}</h2>
        )}
        </div>
      </div>
    </article>
  )
}

export default StatsCard