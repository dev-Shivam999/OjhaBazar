import Link from "next/link";
import Items from "./../components/Items";

const Page = async () => {
  return (
    <div className="container mx-auto p-6">
        <Items />
      <Link href={'/Add'}>  <div className="fixed bottom-1 right-1 text-5xl bg-white p-3 rounded-full w-max text-black">
        +
      </div></Link>
    </div>
  );
};

export default Page;
