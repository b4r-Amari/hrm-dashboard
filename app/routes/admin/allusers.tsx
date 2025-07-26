import { users } from "~/constants";
import { Breadcrumb } from "../../../components";
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { cn } from '~/lib/utils';


const AllUsers = () => {
  return (
    <main className="all-users wrapper">
      <Breadcrumb
        title='Manage Athletes'
        description= "Filter, sort, and access detailed athlete profiles"
        ctaText="Add an athlete"
        ctaUrl="/athletes/create"
      />
      
      <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: UserData) => (
              <div className="flex items-center gap-1.5">
                <img
                  src={props.imageUrl} 
                  alt="user" 
                  className="rounded-full size-8 aspect-square"/>
                  <span>{props.name}</span>
              </div>
            )}
          />

          <ColumnDirective
            field="email"
            headerText="Email"
            width="150"
            textAlign="Left"
          />

          <ColumnDirective
            field="dateJoined"
            headerText="Date Joined"
            width="120"
            textAlign="Left"
          />

          <ColumnDirective
            field="itineraryCreated"
            headerText="Trop Created"
            width="153"
            textAlign="Left"
          />

          <ColumnDirective
            field="status"
            headerText="Type"
            width="100"
            textAlign="Left"
            template={(props: UserData) => (
              <article className={cn('status-column', props.status === 'user' ? 'bg-success-50': 'bg-light-300')}>
                <div className={cn('size-1.5 rounded-full', props.status === 'user' ? 'bg-success-500': 'bg-gray-500')} />
                  <h3 className={cn('font-inter text-xs font-medium', props.status === 'user' ? 'text-success-700' : 'text-gray-500')}>
                    {props.status}
                  </h3>
              </article>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  )
}

export default AllUsers