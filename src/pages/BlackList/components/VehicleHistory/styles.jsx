export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  left: {
    width: 320,
    boxShadow: '5px 0 5px -5px #333',
    zIndex: 1,
  },
  right: {
    flexGrow: 1,
  },
  loading: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    paddingRight: 8,
    paddingLeft: 8
  }
})
