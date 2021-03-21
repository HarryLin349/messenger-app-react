const logout = () => {
    console.log("Log me out!");
    localStorage.clear();
    window.location.reload();
}

const LogoutButton = () => {
    return (
        <div class="inner">
            <button type="button"  className="btn btn-primary ce-primary-button logout" style={{top: '0px', bottom: '0px'}}onClick={logout} >Log out</button>
        </div>
    )
}
export default LogoutButton;