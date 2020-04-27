import {
    CurrentUserAcceptTacSuccess,
    CurrentUserBirthdaySuccess,
    CurrentUserNameSuccess,
    CurrentUserPermissionToShareAggragateDataSuccess,
    CurrentUserPermissionToSharePersonalDataSuccess,
} from "./actions";
import {AssessmentInitialize} from "../assessments/actions";

export enum CURRENT_USER {
    NAME_SUCCESS = "currentUser/CURRENT_USER_SET_NAME",
    BIRTHDAY_SUCCESS = "currentUser/CURRENT_USER_BIRTH_DATE",
    PERMISSION_TO_SHARE_PERSONAL_DATA_SUCCESS = "currentUser/CURRENT_USER_PERMISSION_TO_SHARE_PERSONAL_DATA_SUCCESS",
    PERMISSION_TO_SHARE_AGGRAGATE_DATA_SUCCESS = "currentUser/CURRENT_USER_PERMISSION_TO_SHARE_AGGRAGATE_DATA_SUCCESS",
    ACCEPT_TAC_SUCCESS = "currentUser/CURRENT_USER_ACCEPT_TAC_SUCCESS",
}

export type RandomizedUserCheckinUuid = string;

export type CurrentUserState = CurrentUser;
export interface CurrentUser {
    givenName?: string;
    familyName?: string;
    birthMonth?: number;
    birthDay?: number;
    birthYear?: number;
    permissionToSharePersonalData: boolean;
    permissionToShareAggregateData: boolean;
    acceptanceOfTermsAndConditions: boolean;
}
export const defaultCurrentUser: CurrentUser = {
    permissionToSharePersonalData: false,
    permissionToShareAggregateData: false,
    acceptanceOfTermsAndConditions: false,
};

export type CurrentAccountActions =
    | CurrentUserNameSuccess
    | CurrentUserBirthdaySuccess
    | CurrentUserPermissionToSharePersonalDataSuccess
    | CurrentUserPermissionToShareAggragateDataSuccess
    | CurrentUserAcceptTacSuccess
    | AssessmentInitialize;
