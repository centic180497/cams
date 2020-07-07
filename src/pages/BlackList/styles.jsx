export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  left: {
    width: 200,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    zIndex:3,
    height: '100%',
    boxShadow: '5px 0 5px -5px #333',
    overflow: 'hidden',
  },
  right: {
    flexGrow: 1,
    height: '100%',
  }
})