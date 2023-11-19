export const AuthHeader = {
    Authorization:
        'Bearer ' +
        localStorage.getItem('tocken') +
        '  ' +
        localStorage.getItem('userId'),
};
