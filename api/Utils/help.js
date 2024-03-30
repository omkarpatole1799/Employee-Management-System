exports.throwError = (err, status) => {
	let error = new Error(err)
	error.code = status
	throw error
}
