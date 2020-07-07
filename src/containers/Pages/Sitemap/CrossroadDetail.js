import { connect } from 'react-redux'
import * as Components from '../../../components'
import { getCrossroad } from '../../../actions/action_crossroad'
import { showAddModal, showDeleteModal, showEditModal } from '../../../actions/action_modal';
import { getCamera, getCameras } from '../../../actions/action_camera';

const mapStateToProps = ({cameras}) => ({
    cameras: cameras.cameras,
    isLoading: cameras.isLoading,
})
const mapDispatchToProps = (dispatch) => ({
    // getListCameras: ({crossroad}) => {
    //     dispatch(getCameras(crossroad))
    // },
    getListCameras: dispatch(getCameras()),
    getCrossroadDetail: (id) => dispatch(getCrossroad(id)),
    showAddModal: (modalType) => dispatch(showAddModal(modalType)),
    showEditModal: (data) => dispatch(showEditModal(data)),
    showDeleteModal: (data) => dispatch(showDeleteModal(data))


})

// export default connect(mapStateToProps, mapDispatchToProps)(Components.CrossroadDetail)
