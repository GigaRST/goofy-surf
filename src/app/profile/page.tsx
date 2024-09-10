"use client";

import { PhotoIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Avatar from "../../components/Avatar";
import CollectionCard from "../../components/CollectionCard";
import ResponsiveImage from "../../components/ResponsiveImage";
import Table from "../../components/Table";
import Tabs from "../../components/Tabs";
import { collections } from "../../moks";
import { useQueryParams } from "../../utils/hooks";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { PlusIcon } from "@heroicons/react/16/solid";
import FormField from "../../components/FormField";
import DragAndDrop from "../../components/DragAndDrop";
import { useForm } from "react-hook-form";

const transactions = [
  { id: 1, date: "2024-09-01", amount: "$50", product: "Picture 1" },
  { id: 2, date: "2024-09-05", amount: "$70", product: "Picture 2" },
];

export default function UserProfilePage() {
  const router = useRouter();

  const { query, setQuery } = useQueryParams();

  const { handleSubmit } = useForm();

  const handleTabChange = (selectedTab: string) => {
    setQuery("tab", selectedTab);
  };

  const handleFileDrop = (files: File[]) => {
    console.log("Dropped files:", files);
  };

  return (
    <div className="min-h-screen pb-5">
      <div className="relative">
        <ResponsiveImage
          src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
          alt="userBackgroundImage"
        />
        <Avatar
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt="profile-image"
          width="w-[130px]"
          className="absolute -bottom-10 left-10"
        />
      </div>

      <div className="flex justify-end mt-20 mr-32">
        <Modal
          title="Create Collection"
          trigger={
            <Button className="w-[220px]">
              Create new Collection <PlusIcon width={20} />
            </Button>
          }
        >
          <form>
            <FormField
              label="Spot*"
              labelClassName="text-white"
              placeholder="Insert the Spot Name"
              type="text"
            />
            <FormField
              label="Day*"
              labelClassName="text-white"
              placeholder=""
              type="date"
            />
            <div className="mt-4">
              <p className="mb-2">File(s)*</p>
              <DragAndDrop onDrop={handleFileDrop} multiple />
              <p className="text-sm text-gray-400">
                *You can add more files in every moment
              </p>
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="mt-10 w-40">
                Create
              </Button>
            </div>
          </form>
        </Modal>
      </div>

      <div className="container mx-auto">
        <Tabs
          defaultTab="collections"
          value={query("tab") || "collections"}
          onTabChange={handleTabChange}
          tabs={[
            {
              id: "collections",
              label: "My Collections",
              icon: <PhotoIcon width={25} />,
              children: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {collections.map((collection) => (
                    <div key={collection.id} className="cursor-pointer">
                      <CollectionCard
                        imageSrc={collection.src}
                        imageAlt={collection.title}
                        spot={collection.spot}
                        day={collection.day}
                        creator={collection.creator}
                        picture={collection.collectionData.length}
                        buttonText="View Collection"
                        onButtonClick={() =>
                          router.push(`/collection/${collection.id}`)
                        }
                      />
                    </div>
                  ))}
                </div>
              ),
            },
            {
              id: "transactions",
              label: "Transactions",
              icon: <TableCellsIcon width={25} />,
              children: (
                <Table
                  headers={
                    <>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Product</th>
                    </>
                  }
                >
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.product}</td>
                    </tr>
                  ))}
                </Table>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
