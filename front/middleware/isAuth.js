export default ({ store, redirect }) => {
	const user = store.state.user;
	if (!user) {
		redirect('/');
	}
};
