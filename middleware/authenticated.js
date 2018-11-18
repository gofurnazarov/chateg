export default function ({ store, redirect }) {
	// If the user is not authenticated
	if (!store.state.user) {
		const locale = store.state.locale;
		
		if (locale) {
			return redirect(`/${locale}/login`)
		}
		
		return redirect('/login')
	}
}