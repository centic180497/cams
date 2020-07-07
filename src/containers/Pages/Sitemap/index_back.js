import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import Sitemap from '../../../views/Pages/Sitemap'
import * as Components from '../../../components'
import { getCrossroads } from '../../../actions/action_crossroad'
import { getSingleViews } from '../../../actions/action_view'
import { getSitemap } from '../../../actions/action_sitemap'
import { showAddModal, showDeleteModal, showEditModal } from '../../../actions/action_modal';

const mapStateToProps = ({crossroads, views}) => {
    return {
        isLoadingCrossroads: crossroads.isLoading,
        isLoadingSingleViews: views.isLoading,
        crossroads: crossroads.crossroads,
        singleViews: views.singleViews,
    }
    
}

const mapDispatchToProps = ( dispatch ) => ({
    getCrossroads:  dispatch(getCrossroads()),
    // getSingleViews: dispatch(getSingleViews()),
    showAddModal: (modalType) => dispatch(showAddModal(modalType)),
    showEditModal: (data) => dispatch(showEditModal(data)),
    showDeleteModal: (data) => dispatch(showDeleteModal(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Components.SitemapPage))