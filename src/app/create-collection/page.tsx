"use client";

import FormField from "../../components/FormField";

export default function CreateCollectionPage() {
  return (
    <div className="min-h-screen">
      <h1>Create new Collection</h1>
      <div className="grid grid-cols-3">
        <form className="col-start-2 col-end-3">
          <FormField
            label="Spot"
            labelClassName="text-white"
            placeholder="Spot Name"
            type="text"
          />
          <FormField
            label="Day"
            labelClassName="text-white"
            placeholder=""
            type="date"
          />
          <FormField
            label="Spot"
            labelClassName="text-white"
            placeholder="Spot Name"
            type="text"
          />
          <FormField
            label="Spot"
            labelClassName="text-white"
            placeholder="Spot Name"
            type="text"
          />
          <FormField
            label="Spot"
            labelClassName="text-white"
            placeholder="Spot Name"
            type="text"
          />
        </form>
      </div>
    </div>
  );
}
