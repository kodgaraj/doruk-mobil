import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLoading } from "../utils/LoadingContext";

export default function Islemler() {
  return (
    <View>
      <Text>{loading.toString()}</Text>
    </View>
  )
}