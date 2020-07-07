export default theme => ({
  popper: {
    margin: '0 7px',
    position: 'absolute',
    transform: 'translate(100%, -50%)',
    transformStyle: 'preserve-3d',
    top: '50%',
    right: '-50%',
    cursor: 'default',
  },
  tooltip: {
    transformStyle: 'preserve-3d',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '0 0 10px #333',
    fontSize: '0.725rem',
    borderRadius: '4px',
    left: '50%',
    margin: 0,
  },
  header: {
    display: 'flex',
    textAlign: 'right',
    marginLeft: 'auto',
    flexDirection: 'row',
    height: 30,
    position: 'relative',
    padding: '4px 4px 0 4px',
  },
  info: {
    marginTop: -25,
    padding: '0 5px',
  },

  iconButton: {
    transformStyle: 'preserve-3d',
    position: 'absolute',
    right: 0,
    padding: 6,
  },
  icon: {
    fontSize: 14,
  },
  plate: {
    fontSize: 16,
    fontWeight: 500,
  },
  imageWrapper: {
    width: '100%',
    padding: 5,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    // width: '100%',
    maxWidth: '400px !important',
    minWidth: '150px !important',
    maxHeight: '600px !important',
    width: 'auto',
    pointerEvents: 'none',
  },
})
