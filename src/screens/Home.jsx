import { useLoading } from "../utils/LoadingContext";
import { View, Text } from 'react-native'

function Home({ route, navigation }) {
  const { loading } = useLoading();
  return (
    <View>
      <Text>ANASAYFA {loading.toString()}</Text>
    </View>
  )
}

export default Home;