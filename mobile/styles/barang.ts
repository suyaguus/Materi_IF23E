import { StyleSheet } from "react-native";

// buat css (styling)
const size = 20;

export const styles = StyleSheet.create({
  warna_bg: {
    backgroundColor: "#a51c31",
    color: "#ffffff",
    fontSize: size,
  },

  jarak: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  fab: {
    position: "absolute",
    margin: 15,
    right: 0,
    bottom: 0,
    backgroundColor: "#a51c31",
    color: "#fff",
  },

  header_area: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    backgroundColor: "#a51c31",
    padding: 10,
  },

  header_title: {
    fontSize: size,
    color: "#ffffff",
  },

  card: {
    margin: 20,
  },


  text_input: {
    backgroundColor: "#fff",
    marginVertical: 5,
  },

  satuan_area: {
    width: "100%",
    marginBottom: 10,
  },

  error_area: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  error: {
    color: "#ff0000",
    fontSize: 12,
    marginVertical: 5,
    marginHorizontal: 0,
    paddingLeft: 5,
  },

  back_button: {
    position: "absolute",
    left: 10,
    color: "#ffffff",
  },
});

export const styles_dropdown = StyleSheet.create({
  dropdown: {
    margin: 0,
    height: 50,
    backgroundColor: "white",
    borderRadius: 0,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
