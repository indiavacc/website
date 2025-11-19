"use client";
import ControllerTable from "@/app/controllers/components/ControllersTable";
import Divider from "@/components/Divider";
import {
  Controller,
  CONTROLLER_TYPE,
  useControllerStore,
} from "@/app/store/useControllerStore";
import useControllers from "../hooks/useControllers";

type controllersType = Controller[] | null;

const getControllersByType = (
  controllers: controllersType
): [controllersType, controllersType] => {
  const residents: controllersType = [];
  const visitors: controllersType = [];

  if (!controllers?.length) return [residents, visitors];

  controllers.forEach((controller) => {
    switch (controller.type) {
      case CONTROLLER_TYPE.RESIDENT:
        residents.push(controller);
        break;
      case CONTROLLER_TYPE.VISITOR:
        visitors.push(controller);
        break;
    }
  });

  return [residents, visitors];
};

const ControllersPage = () => {
  useControllers();
  const { controllers } = useControllerStore();

  const [residents, visitors] = getControllersByType(controllers);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <Divider title="Our Roster" />
      {!controllers?.length ? (
        <span className="mt-2 px-3 py-1 text-md font-semibold rounded-md  backdrop-blur-md text-white">
          No controllers available.
        </span>
      ) : (
        <ControllerTable residents={residents!} visitors={visitors!} />
      )}
    </div>
  );
};

export default ControllersPage;
