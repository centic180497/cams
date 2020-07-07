import grey from "@material-ui/core/colors/grey"
export default theme => ({
  drawer: {},
  root: {
    width: 300,
  },
  header: {
    height: 50,
    borderBottom: `1px solid ${grey[700]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20
  }
})