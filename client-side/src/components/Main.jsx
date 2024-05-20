import LinkCard from "./LinkCard";
import FeatureCard from "./FeatureCard";
import DataDisplayCard from "./DataDisplayCard";
import { useState } from "react";
function Main() {
  const [data, setData] = useState("");
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full mt-4">
      <LinkCard data={data} setData={setData} />
      {!data?.title ? (
        ""
      ) : (
        <>
          <DataDisplayCard data={data} setData={setData} />
        </>
      )}

      <FeatureCard />
    </div>
  );
}

export default Main;
