import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Accordeon({ title, children, open = false }) {

   const [isOpen, setIsOpen] = useState(open)

   function toggle(){
       setIsOpen( open => !open )
   }

   return (
      <View style={styles.container}>
         <Pressable onPress={toggle}>
            <View style={styles.header}>
               <Text numberOfLines={1} style={styles.title}>{title}</Text>
               { isOpen? <FeatherIcon name='chevron-up' size={30}/> :  <FeatherIcon name='chevron-down' size={30} />  }
            </View>
         </Pressable>
         <View style={[styles.body, isOpen ? styles.bodyOpen : null]}>
            {children}
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
        borderBottomWidth: 2,
        borderBottomColor: 'gray'
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10
   },
   title: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: 0.8,
      width: '70%'
   },
   body: {
      height: 0,
      overflow: 'hidden',
      paddingLeft: 8,
     
   },
   bodyOpen: {
      height: 'auto',
      paddingBottom: 15
   }
})