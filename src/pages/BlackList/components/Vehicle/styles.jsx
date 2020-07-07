import grey from '@material-ui/core/colors/grey'
export default theme => ({
  root: {
    marginBottom: 4,
  },
  card: {
    backgroundColor: 'transparent'
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardActions: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  plate: {
    fontSize: 16,
  },
  desc: {
    fontSize: 12,
  },
  iconButton: {
    padding: 6,
  },
  smallIcon: {
    fontSize: 16,
  },
  active: {
    display: 'block',
    backgroundColor: grey[300]
  }
})
