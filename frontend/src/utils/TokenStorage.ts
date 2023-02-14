/**
 * 
 * @param {string} token - token of user
 * @param {boolean} rememberMe
 * @returns null
 */
export const saveStorage = (token: string, rememberMe?: boolean) => {
    if (rememberMe) {
        localStorage.setItem('userToken', token);
        return;
    }
    sessionStorage.setItem('userToken', token);
};
/**
 * Remove Token from storage
 */
export const clearStorage = () => {
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userToken');
};
