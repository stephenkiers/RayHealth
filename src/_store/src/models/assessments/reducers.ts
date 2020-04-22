import {
    ASSESSMENT,
    Assessment,
    AssessmentActions,
    AssessmentState,
    defaultAssessmentsState,
} from "./constants";

const updateCurrentAssessmentAttribute = (state, key, value): AssessmentState => {
    if (!state.currentAssessmentUuid) return state;
    if (!state.assessments[state.currentAssessmentUuid]) return state;
    return {
        ...state,
        assessments: {
            ...state.assessments,
            [state.currentAssessmentUuid]: {
                ...(state.assessments[state.currentAssessmentUuid] as Assessment),
                [key]: value,
            },
        },
    };
};

const assessmentReducer = (
    state: AssessmentState = defaultAssessmentsState,
    action: AssessmentActions,
): AssessmentState => {
    switch (action.type) {
        case ASSESSMENT.INITIALIZE:
            const epoch = new Date().getTime();
            const uuid = `${epoch}::${action.uuid}`;
            return {
                ...state,
                currentAssessmentUuid: uuid,
                assessments: {
                    ...state.assessments,
                    [uuid]: {
                        id: uuid,
                        createdAt: epoch,
                        permissionToShare: false,
                        sharedToServer: false,
                        feelingGood: action.feelingGood,
                    },
                },
            };
        case ASSESSMENT.GRANT_PERMISSION_TO_SHARE:
            return updateCurrentAssessmentAttribute(state, "permissionToShare", true);
        case ASSESSMENT.COMPLETE:
            const newState = updateCurrentAssessmentAttribute(state, "completed", true);
            return {...newState, currentAssessmentUuid: undefined};
        case ASSESSMENT.RECORD_TEMPERATURE:
            return updateCurrentAssessmentAttribute(
                state,
                "currentBodyTemperatureCelsius",
                action.temperatureInCelsius,
            );
        default:
            return state;
    }
};

export default assessmentReducer;
