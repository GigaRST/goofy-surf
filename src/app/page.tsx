"use client";

import {
  FlagIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../components/Button";
import Carousel from "../components/Carousel";
import CollectionCard from "../components/CollectionCard";
import { collections } from "../moks";
import { useQueryParams } from "../utils/hooks";

export default function Home() {
  const router = useRouter();
  const { query, clear } = useQueryParams();

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data: FieldValues) => {
    const params = new URLSearchParams(window.location.search);

    if (data.spot) {
      params.set("spot", data.spot);
    } else {
      params.delete("spot");
    }

    if (data.creator) {
      params.set("creator", data.creator);
    } else {
      params.delete("creator");
    }

    if (data.date) {
      params.set("date", data.date);
    } else {
      params.delete("date");
    }

    // Update the URL with all query params at once
    router.push(`${window.location.pathname}?${params.toString()}`, undefined);
  };

  // Retrieve the query parameters from the URL
  const spotQuery = query("spot") || "";
  const creatorQuery = query("creator") || "";
  const dateQuery = query("date") || "";

  const isFiltersActive = spotQuery || creatorQuery || dateQuery;

  // Filter collections based on the query parameters
  const filteredCollections = collections.filter((collection) => {
    const matchesSpot = spotQuery ? collection.spot.includes(spotQuery) : true;
    const matchesCreator = creatorQuery
      ? collection.creator.includes(creatorQuery)
      : true;
    const matchesDate = dateQuery ? collection.day === dateQuery : true;

    return matchesSpot && matchesCreator && matchesDate;
  });

  const clearFilters = () => {
    setValue("spot", "");
    setValue("creator", "");
    setValue("date", "");

    clear();
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-y-10">
      <div>
        <h1 className="text-3xl mb-3">Last Update</h1>
        <Carousel />
      </div>
      <div>
        <div className="flex items-center mb-5 justify-between">
          <h1 className="text-3xl font-bold">Sessions</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-x-5"
          >
            <label className="input input-bordered flex items-center gap-2">
              <MapPinIcon width={20} />
              <input
                {...register("spot")}
                type="text"
                className="grow"
                placeholder="Spot"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <UserIcon width={20} />
              <input
                {...register("creator")}
                type="text"
                className="grow"
                placeholder="Creator"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                {...register("date")}
                type="date"
                className="grow"
                placeholder="Date"
              />
            </label>
            <Button type="submit" className="w-32">
              Search{" "}
              <span>
                <MagnifyingGlassIcon width={20} />
              </span>
            </Button>
            <Button
              type="button"
              variant={"secondary"}
              className="w-32"
              onClick={clearFilters}
              disabled={!isFiltersActive}
            >
              Reset
            </Button>
          </form>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {filteredCollections.length > 0 ? (
            filteredCollections.map((collection) => (
              <div key={collection.id} className="cursor-pointer">
                <CollectionCard
                  imageSrc={collection.src}
                  imageAlt={collection.title}
                  spot={collection.spot}
                  day={collection.day}
                  creator={collection.creator}
                  picture={collection.collectionData.length}
                  buttonText="View Collection"
                  className="w-[100%]"
                  onButtonClick={() =>
                    router.push(`/collection/${collection.id}`)
                  }
                />
              </div>
            ))
          ) : (
            <p className="text-3xl font-bold col-span-full mt-10 flex items-center gap-x-2">
              No collections match the filters
              <FlagIcon width={36} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
