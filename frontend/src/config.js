// this is Prim's VM
//const API_BASE_URL = "https://40.85.147.30:8080";

// AFKVM
// const API_BASE_URL = "http://128.85.24.19:8080";

// AFKVM2
// const API_BASE_URL = "http://20.9.135.136:8080";

// for vercel
const API_BASE_URL = "http://20.9.135.136:443";

// For local testing uncomment this and comment the above line
//const API_BASE_URL = "http://127.0.0.1:8080";

const API_ENDPOINTS = {
  handleGetPlayerStats: (videogame, playerName) =>
    `${API_BASE_URL}/player/${videogame}?player=${encodeURIComponent(playerName)}`,
  handleGetMatchStats: (videogame, week) =>
    `${API_BASE_URL}/match_stats/${videogame}?week=${encodeURIComponent(week)}`,
  handleGetSeasonStats: (videogame, week) =>
    `${API_BASE_URL}/season_stats/${videogame}?week=${encodeURIComponent(week)}`,
  uploadFile: `${API_BASE_URL}/upload_file`,
  uploadMatch: `${API_BASE_URL}/upload_match`,
  updateWeekAndSeason: `${API_BASE_URL}/update_week_and_season`,
  getAllDisputes: `${API_BASE_URL}/get_all_disputes`,
  resolveDispute: (gameId) => `${API_BASE_URL}/resolve_dispute/${gameId}`,
  handleSubmitDispute: (videogame) =>
    `${API_BASE_URL}/submit_dispute/${videogame}`,
  handleLogin: () => `${API_BASE_URL}/login`,
  handleGetAccounts: () => `${API_BASE_URL}/accounts`,
  handleCreateAccount: () => `${API_BASE_URL}/accounts`,
  handleChangePassword: () => `${API_BASE_URL}/accounts`,
  handleDeleteAccount: () => `${API_BASE_URL}/accounts`,
  handleSubmitRoster: (videogame) => `${API_BASE_URL}/roster/${videogame}`,
  handleGetRoster: (videogame, school) =>
    `${API_BASE_URL}/roster/${videogame}?school=${encodeURIComponent(school)}`,
  handleDeleteRoster: (videogame) => `${API_BASE_URL}/roster/${videogame}`,
  handleGetSchools: () => `${API_BASE_URL}/schools`,
  handleGetPicture: (videogame, game_id) =>
    `${API_BASE_URL}/get_upload/${videogame}?game_id=${encodeURIComponent(game_id)}`,
};

export { API_BASE_URL, API_ENDPOINTS };
