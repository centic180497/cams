import * as types from 'constant/constant_actions'

const initialState = {
  violations: [],
  filter: {
    q: '',
    startTime: null,
    endTime: new Date().toString(),
    cameras: [],
    vehicleType: { value: 0, label: 'Tất cả' },
    violationType: { value: 0, label: 'Tât cả' },
    status: { value: 0, label: 'Tất cả' },
  },
  selected: [],
  currentViolationId: -1,
  violationDetail: {},
  page: 1,
  totalPage: 0,
  total: 0,
  api: {
    isFetchingViolations: false,
    isFetchingViolationsDetail: false,
    isEditingViolation: false,
    isExportingPDF: false
  },
}

export default function violationsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_VIOLATIONS:
      return {
        ...state,
        api: {
          ...state.api,
          isFetchingViolations: true,
        },
      }
    case types.FETCH_VIOLATIONS_SUCCESS:
      return {
        ...state,
        violations: action.payload,
        api: {
          ...state.api,
          isFetchingViolations: false,
        },
      }
    case types.FETCH_VIOLATIONS_FAILURE:
      return {
        ...state,
        api: {
          ...state.api,
          isFetchingViolations: false,
        },
      }

    // fetch  violation detail
    case types.FETCH_VIOLATION_DETAIL:
      return {
        ...state,
        currentViolationId: action.payload.id,
        api: {
          ...state.api,
          isFetchingViolationDetail: true,
        },
      }
    case types.FETCH_VIOLATION_DETAIL_SUCCESS:
      return {
        ...state,
        violationDetail: action.payload,
        api: {
          ...state.api,
          isFetchingViolationDetail: false,
        },
      }
    case types.FETCH_VIOLATION_DETAIL_FAILURE:
      return {
        ...state,
        violationDetail: {},
        api: {
          ...state.api,
          isFetchingViolationDetail: false,
        },
      }
    case types.UPDATE_SELECTED_VIOLATIONS:
      return {
        ...state,
        selected: action.payload,
      }

    case types.CHANGE_VIOLATION_PARAM: {
      return {
        ...state,
        violationDetail: {
          ...state.violationDetail,
          ...action.payload,
        },
      }
    }
    case types.FILTER_VIOLATIONS: {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload.filter,
        },
        api: {
          ...state.api,
          isFetchingViolations: true,
        },
        selected: [],
        currentViolationId: -1,
        violationDetail: {},
        totalPage: 0,
      }
    }
    case types.FILTER_VIOLATIONS_SUCCESS: {
      return {
        ...state,
        violations: action.payload.result,
        api: {
          ...state.api,
          isFetchingViolations: false,
        },
        page: action.payload.page,
        totalPage: action.payload.total_page,
        total: action.payload.total,
      }
    }

    // edit violation detail
    case types.EDIT_VIOLATION_DETAIL: {
      return {
        ...state,
        api: {
          ...state.api,
          isEditingViolation: true,
        },
      }
    }
    case types.EDIT_VIOLATION_DETAIL_SUCCESS: {
      return {
        ...state,
        violations: state.violations.map(vio => {
          if (vio.id === action.payload.id) {
            return action.payload
          } else {
            return vio
          }
        }),

        violationDetail: action.payload,
        api: {
          ...state.api,
          isEditingViolation: true,
        },
      }
    }

    case types.DELETE_VIOLATIONS: {
      return {
        ...state,
      }
    }
    case types.DELETE_VIOLATIONS_SUCCESS: {
      const id = updateCurrentViolationId(state, action.payload.result)
      return {
        ...state,
        violations: action.payload.result,
        selected: [],
        currentViolationId: id,
        violationDetail: id === -1 ? {} : state.violationDetail,
        page: action.payload.page,
        totalPage: action.payload.total_page,
        total: action.payload.total,
      }
    }

    case types.DELETE_SINGLE_VIOLATION: {
      return {
        ...state,
      }
    }

    case types.DELETE_SINGLE_VIOLATION_SUCCESS: {
      return {
        ...state,
        violations: action.payload.result,
        selected: state.selected.filter(item => item !== state.currentViolationId),
        page: action.payload.page,
        totalPage: action.payload.total_page,
        total: action.payload.total,
        currentViolationId: -1,
        violationDetail: {},
      }
    }

    case types.APPROVE_VIOLATIONS_SUCCESS: {
      const approveViolations = updateViolations(state, action.payload)
      return {
        ...state,
        violations: approveViolations,
      }
    }

    case types.UNAPPROVE_VIOLATIONS_SUCCESS: {
      const unApproveViolations = updateViolations(state, action.payload)
      return {
        ...state,
        violations: unApproveViolations,
      }
    }

    case types.EXPORT_VIOLATION_PDF:
      return {
        ...state,
        api: {
          ...state.api,
          isExportingPDF: true
        }
      }
    
    case types.EXPORT_VIOLATION_PDF_SUCCESS:
      return {
        ...state,
        api: {
          ...state.api,
          isExportingPDF: false
        }
    }
    default:
      return state
  }
}

function updateViolations(state, payload) {
  let { violations } = state
  const result = violations.map(vio => {
    for (const item of payload) {
      if (item.id === vio.id) {
        vio.status = item.status
      }
    }
    return vio
  })
  return result
}

function updateCurrentViolationId(state, payload) {
  const { currentViolationId } = state
  let id = -1
  for (let i = 0; i < payload.length; i++) {
    if (payload[i].id === currentViolationId) {
      id = currentViolationId
      break
    }
  }
  return id
}
