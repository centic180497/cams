import grey from '@material-ui/core/colors/grey'

export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 10
  },
  imageWrapper: {
    padding: '0 8px'
  },
  image: {
    width: 60,
    height: 60
  },
  text: {
    fontWeight: 600
  },
  unread:{
    backgroundColor: grey[300]
  }
})
