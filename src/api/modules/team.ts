import http from "@/api";

export const addTeam = (params?: {}) => {
  return http.post ( `/team/add`, params );
};
export const listTeam = (params?: {}) => {
  return http.get ( `/team/list`, params );
};
export const updateTeam = (params?: {}) => {
  return http.post ( `/team/update`, params );
};


export const joinTeamApi = (params?: {}) => {
  return http.post ( `/team/join`, params );
};

export const quitTeamApi = (params?: {}) => {
  return http.post ( `/team/quit`, params );
};
export const getTeamDetailApi = (params?: {}) => {
  return http.get ( `/team/get`, params );
};
export const queryMyCreatedTeamsApi = (params?: {}) => {
  return http.get ( `/team/list/my/create`, params );
};
export const queryMyJoinedTeamsApi = (params?: {}) => {
  return http.get ( `/team/list/my/join`, params );
};
export const dissolveTheTeamApi = (params?: {}) => {
  return http.post ( `/team/dissolution`, params );
};
