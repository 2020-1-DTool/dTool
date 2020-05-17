import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';

import { Carousel } from '../containers';

const CarouselScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Carousel />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    minHeight: Dimensions.get('window').height,
  },
});

export default CarouselScreen;
