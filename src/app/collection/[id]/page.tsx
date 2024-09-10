"use client";

import BackPageButton from "@/components/BackPageButton";
import { useRouter } from "next/navigation";
import ImageCard from "@/components/ImageCard";
import { collections } from "@/moks";

export default function CollectionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  console.log({ id });

  return (
    <div className="min-h-screen px-10 py-5">
      <BackPageButton />
      <h1 className="text-3xl mt-6 font-bold">Collection Pictures</h1>
      <div className="grid grid-cols-4 gap-5 mt-10">
        {collections[0].collectionData.map((image) => (
          <ImageCard
            key={image.id}
            imageID={image.id}
            imagePrice={image.price}
            imageSrc={image.imageUrl}
            imageAlt="collection-image"
            buttonText="Show"
            className="w-[100%]"
            onButtonClick={() => router.push(`/media/${image.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
