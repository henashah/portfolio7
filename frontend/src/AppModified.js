import React, { Fragment } from 'react';
// import { NavLink, Switch, Route, Routes } from 'react-router-dom';
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import  Time from './Time';
import TestimonyPage from './TestimonyPage';
import About from './About';
import { Helmet } from "react-helmet";


const Home = () => { 
  return <div className='home'>
    <h1>Welcome to my portfolio website</h1>
    <p> Feel free to browse around and learn more about me.</p>
  </div>
}

const Contact = () => {
  return <div className='contact'>
    <h1>Contact Me</h1>
    <p>You can reach me via email: <strong>hello@example.com</strong></p>
  </div>
}

// function App () {
//   return (
//     <Fragment>
//       <Router>
//         <nav>
//           <div>
//             <ul>
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/about">About</Link></li>
//               <li><Link to="/time">Time</Link></li>
//               <li><Link to="/contact">Contact</Link></li>
//             </ul>
//           </div>
//         </nav>
//         <Switch>
//           <Route path="/about"><About /></Route>
//           <Route path="/time"><Time /></Route>
//           <Route path="/contact"><Contact /></Route>
//         </Switch>
//       </Router>
//       <footer> Hello I'm a little footer</footer>
//     </Fragment>
//   );
// }

const Main = () => {
  return <Switch>
    <Route path='/about'><About /></Route>
    <Route exact path='/contact'><Contact /></Route>
    <Route exact path='/time'><Time /></Route>
    <Route exact path='/testimonials'><TestimonyPage /></Route>
  </Switch>
}

const Navigation = () => {
  return <nav>
     <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/about'>About</Link></li>
      <li><Link to='/contact'>Contact</Link></li>
      <li><Link to='/time'>Time</Link></li>
      <li><Link to='/testimonials'>[Active]TestimonyPage</Link></li>
    </ul>
   </nav>
}

// const Home = () => { 
//   return <div className='home'>
//     <h1>Welcome to my portfolio website</h1>
//     <p> Feel free to browse around and learn more about me.</p>
//   </div>
// }

// const About = () => {
//   return <div className='about'>
//     <h1>About Me</h1>
//     <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
//   </div>
// }

// const Contact = () => {
//   return <div className='contact'>
//     <h1>Contact Me</h1>
//     <p>You can reach me via email: <strong>hello@example.com</strong></p>
//   </div>
// }

function App () {
  return (
  <div className='app'>
    <h1>Hi, nice to e-meet you!</h1>
    <Router> 
        <Navigation />
        <Main />
    </Router>
  </div>
  )
}

export default App;
