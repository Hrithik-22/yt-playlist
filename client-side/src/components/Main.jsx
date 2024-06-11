import LinkCard from "./LinkCard";
import FeatureCard from "./FeatureCard";
import DataDisplayCard from "./DataDisplayCard";
import { useState } from "react";

function Main() {
  const [data, setData] = useState("");

  return (
    <main className="flex-grow flex flex-col items-center justify-center gap-4 mt-4 px-4">
      <LinkCard data={data} setData={setData} />
      {data?.title && (
        <DataDisplayCard data={data} setData={setData} />
      )}
      <FeatureCard />
    </main>
  );
}

export default Main;
