import { Button } from "@/components/ui/button";
import { google } from "../actions/auth";

export default function Page() {
  return (
    <form>
      <Button formAction={google}>Sign up</Button>
    </form>
  );
}
