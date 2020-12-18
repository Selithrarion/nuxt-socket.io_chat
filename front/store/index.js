export const state = () => ({
	user: null,
	messages: [],
	users: [],
});
export const mutations = {
	SET_USER(state, user) {
		state.user = user;
	},
	LOGOUT(state) {
		state.user = null;
		state.messages = [];
		state.users = [];
	},
	NEW_MESSAGE(state, message) {
		state.messages.push(message);
	},
	UPDATE_USERS(state, users) {
		state.users = users;
	},
};
export const actions = {
	setUser({ commit }, user) {
		commit('SET_USER', user);
	},
	logout({ commit }) {
		commit('LOGOUT');
	},
	SOCKET_newMessage({ commit }, message) {
		commit('NEW_MESSAGE', message);
	},
	SOCKET_updateUsers({ commit }, users) {
		commit('UPDATE_USERS', users);
	},
};
