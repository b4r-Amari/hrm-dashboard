import { Breadcrumb } from "../../../components";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { mockSports } from "../../lib/utils";
import type { Sport } from "../../lib/utils";
import {comboBoxItems, selectItems} from "~/constants";

const AddAthletes = () => {
  const sports: Sport[] = mockSports;

  const handleSubmit2 = async () => {};

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Breadcrumb
        title="Add a New Athlete"
        description="**Still need to figure out what to add here too.**"
      />
      <section className="mt-2.5 wrapper-md">
        <form className="athlete-form" onSubmit={handleSubmit2}>
          <div>
            <label htmlFor="Sport">Sport</label>
            <ComboBoxComponent
              id="sport"
              dataSource={sports}
              fields={{ text: "name", value: "name" }}
              placeholder="Select a sport"
              className="combo-box"
            />
          </div>

          <div>
              <label htmlFor="duration">Duration</label>
              <input
                  id="duration"
                  name="duration"
                  type="number"
                  placeholder="Enter a number of days"
                  className="form-input placeholder:text-gray-100"
              />
          </div>

        </form>
      </section>
    </main>
  );
};

export default AddAthletes;
