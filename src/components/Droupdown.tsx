import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../constants';
import {categoryComponentType} from '../types/types';

interface Props {
  data: categoryComponentType[];
  value: string | null;
  iconName: string;
  placeholder: string;
  setValue: (value: any) => void;
  disable?: boolean;
}

const DropdownComponent: React.FC<Props> = ({
  data,
  value,
  setValue,
  iconName,
  placeholder,
  disable = false,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  //@ts-ignore
  data = [{name: placeholder, codename: null}, ...data];

  return (
    <View style={styles.container}>
      <Dropdown
        disable={disable}
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedTextProps={{numberOfLines: 1}}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="name"
        valueField="codename"
        activeColor={'rgba(126, 124, 124, 0.46)'}
        placeholder={!isFocus ? placeholder : '.....'}
        value={value}
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.itemContainerStyle}
        itemTextStyle={styles.itemTextStyle}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.codename);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <FontAwesome5
            style={styles.icon}
            color={colors.iconColor}
            name={iconName}
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.inputFieldColor,
    padding: 8,
    width: '100%',
    borderRadius: 10,
  },
  containerStyle: {
    borderRadius: 10,
    width: '100%',
    backgroundColor: colors.appBackgroundColor,
  },
  itemContainerStyle: {
    backgroundColor: colors.inputFieldColor,
    color: colors.primaryForeground,
  },
  itemTextStyle: {
    color: colors.primaryForeground,
  },
  dropdown: {
    height: 50,
  },
  icon: {
    marginRight: 15,
  },
  placeholderStyle: {
    color: colors.placeholder,
    fontSize: 18,
  },
  selectedTextStyle: {
    color: colors.primaryForeground,
    fontSize: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
