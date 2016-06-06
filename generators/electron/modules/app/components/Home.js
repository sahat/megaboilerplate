import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.nav}>
            <h2>Home</h2>
            <Link to="/counter">to Counter</Link>
          </div>
          <div className={styles.form}>
            <form>
              <div>
                <input type="text" name="username" className={styles.username} placeholder="Username"/>
              </div>
              <div>
                <input type="text" name="password" className={styles.password} placeholder="Password"/>
              </div>
              <button type="submit" className={styles.login}>Sign in</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
