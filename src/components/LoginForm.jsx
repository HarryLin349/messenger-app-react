import { useState } from "react"
import axios from 'axios';


const projectID = '09ed9037-76fb-461b-a798-8ed98b785148';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
        } catch (error) {
            setError('Sorry, those credentials are incorrect.');
        }

        // username | password => give messages
        // works? -> logged in
        // else -> error 


    }

    return (
        <div>
            <div className="wrapper">
                <div className="form wrap-inner">
                    <h1 className="title">Messenger Web Application</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                            className="input"
                            placeholder="Username"
                            required
                        />

                        <input type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            placeholder="Password"
                            required
                        />

                        <div align="center">
                            <button type="submit" className="button">
                                <span>Log In</span>
                            </button>
                        </div>
                        <h2 className="error">{error}</h2>
                        <div className = "login-text"align="center">
                        <p>Trying the site? Use one of the accounts below.</p>
                        <table class="table">
  <thead>
    <tr>
      <th scope="col">Username</th>
      <th scope="col">Password</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Guest</td>
      <td>123pw</td>
    </tr>
    <tr>
      <td>Guest2</td>
      <td>456pw</td>
    </tr>
  </tbody>
</table>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default LoginForm;