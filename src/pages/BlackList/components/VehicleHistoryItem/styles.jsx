import grey from '@material-ui/core/colors/grey'

export default theme => ({
  root: {
    cursor: 'pointer',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 4,
  },
  cardMediaWrapper: {
    width: 60,
    height: 60,
  },
  cardMedia: {
    width: 60,
    height: 60,
    backgroundSize: '60px 60px',
  },
  details: {
    width: 'calc(100% - 60px)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardContent: {
    paddingTop: 3,
    paddingBottom: '0 !important',
  },
  plate: {
    fontWeight: 500,
  },
  time: {
    fontSize: 12,
  },
  camName: {},
  focused: {
    backgroundColor: grey[300]
  }
})
