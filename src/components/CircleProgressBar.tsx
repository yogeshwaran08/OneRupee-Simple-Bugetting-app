import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

interface Props {
  totalRupee: number;
  expendedRupee: number;
  tintColor: string;
}

const CircularProgressBar: React.FC<Props> = ({
  totalRupee,
  expendedRupee,
  tintColor,
}) => {
  const fill = Math.round((expendedRupee / totalRupee) * 100);
  return (
    <View>
      <AnimatedCircularProgress
        size={200}
        width={15}
        backgroundWidth={10}
        fill={fill}
        tintColor={tintColor}
        backgroundColor="#D9D9D9"
        arcSweepAngle={300}
        rotation={210}
        lineCap="round">
        {() => (
          <View>
            <Text style={styles.header}>₹{Math.round(expendedRupee)}</Text>
            <Text style={styles.subHeader}>
              avail. of ₹{Math.round(totalRupee)}
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default CircularProgressBar;

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 50,
    fontWeight: '700',
  },
  subHeader: {
    textAlign: 'center',
    color: '#A3A3A3',
    fontSize: 18,
    fontWeight: '300',
  },
});
