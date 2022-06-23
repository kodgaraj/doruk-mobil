import { useLoading } from "../utils/LoadingContext";
import { View, Text } from "react-native";
import axios from "../utils/Axios";

function Home({ route, navigation }) {
  const { loading } = useLoading();
  return (
    <View>
      <Text>
        ANASAYFA {loading.toString()} {axios.defaults.headers.common["Authorization"]}
      </Text>
    </View>
  );
}

export default Home;
