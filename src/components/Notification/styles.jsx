export default theme => ({
  paper: {
    width: 480,
    height: 650
    // overflow: 'hidden',
    
  },
  header: {
    height: 48,
    backgroundColor: 'hsl(0, 0%, 88%)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    // position: 'sticky'
  },
  headerTitle: {
    // height: '100%',
    fontSize: 16,
    // fontWeight: 500,
    alignItems: 'center'
  },
  loading: {
    display: 'flex',
    paddingTop: 8,
    justifyContent: 'center'
  },
  container: {

  },
  content: {
    paddingTop: 10 
  }
})