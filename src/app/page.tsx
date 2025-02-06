import Items from "./../components/Items";

const Page = async () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Shop</h1>
      <Items />
    </div>
  );
};

export default Page;
