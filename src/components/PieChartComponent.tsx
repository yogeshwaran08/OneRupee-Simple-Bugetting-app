import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Svg, Path, Circle} from 'react-native-svg';

interface DataItem {
  value: number;
  color: string;
}

export interface PieChartProps {
  data: DataItem[];
}

const PieChart: React.FC<PieChartProps> = ({data}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;
  let endAngle = 0;
  console.log('len ', data.length);

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Svg width={200} height={200}>
        {data.length !== 1 ? (
          data.map(item => {
            const percentage = (item.value / total) * 100;
            endAngle += (percentage / 100) * 360;

            const largeArcFlag = percentage > 50 ? 1 : 0;

            const x1 = 100 + 100 * Math.cos((Math.PI / 180) * startAngle);
            const y1 = 100 + 100 * Math.sin((Math.PI / 180) * startAngle);

            const x2 = 100 + 100 * Math.cos((Math.PI / 180) * endAngle);
            const y2 = 100 + 100 * Math.sin((Math.PI / 180) * endAngle);

            const d = `M${100},${100} A100,100 0 ${largeArcFlag},1 ${100},${100} L100,100 Z`;
            console.log(x1, y1, largeArcFlag, x2, y2);

            startAngle = endAngle;

            return (
              <TouchableWithoutFeedback
                key={item.color}
                onPress={() => console.log('value', item.color)}>
                <Path d={d} fill={item.color} />
              </TouchableWithoutFeedback>
            );
          })
        ) : (
          <TouchableWithoutFeedback onPress={() => console.log('item Pressed')}>
            <Circle cx="100" cy="100" r="50%" fill="green" />
          </TouchableWithoutFeedback>
        )}
      </Svg>
    </View>
  );
};

export default PieChart;
