import { Button } from "@repo/ui/button";
import { PrismaClient } from "@repo/db/client";

const client =new PrismaClient();
export default function Home() {
  return (<div>
    <div className="bg-amber-300"> HI there</div>
    <Button className={"bg-green-200"} appName={"/Home"}>Submit</Button>
     </div>
  );
}
