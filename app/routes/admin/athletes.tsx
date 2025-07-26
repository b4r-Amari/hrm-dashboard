import { Breadcrumb } from "../../../components";

const Athletes = () => {
  return (
    <main className="all-users wrapper">
      <Breadcrumb
        title='Manage Athletes'
        description= "**Still gonna figure out what to put here**"
        ctaText="Add an athlete"
        ctaUrl="/athletes/create"
      />
    </main>
  )
}

export default Athletes