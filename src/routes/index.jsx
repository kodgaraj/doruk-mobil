import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import StackTemplate from "../components/StackTemplate";
import DrawerTemplate from "../components/DrawerTemplate";

function Router() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <NavigationContainer>
        {!!user ? <DrawerTemplate /> : <StackTemplate />}
      </NavigationContainer>
    </>
  );
}

export default Router;
