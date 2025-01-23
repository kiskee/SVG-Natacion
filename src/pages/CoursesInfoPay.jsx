import { UserDetailContext } from "@/context/UserDetailContext";
import ModuleBlock from "@/components/ModuleBlock";
import moduleOne from "@/static/moduleOne.json";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CoursesInfoPay() {
  const { userDetail } = useContext(UserDetailContext);
  // body
  return (
    <>
      {userDetail ? (
        <>
          <ModuleBlock moduleData={moduleOne[0]} user={userDetail} />
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 m-8">
          <h2 className="text-5xl text-white">
            No estas registrado en nuestra base datos!
          </h2>
          <Link to="/register">
            <Button className="bg-yellow-500 text-black text-xl">
              Registrate
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
