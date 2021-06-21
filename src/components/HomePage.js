import React from "react";

const HomePage = () => (
  <section className="hero is-primary has-background-primary is-fullheight">
    <div className="hero-body">
      <div className="tile is-ancestor">
        <div className="container homepage_left_hero">
          <h1 className="title has-text-centered not-selectable">
            Watch YouTube Together with Friends!
          </h1>
        </div>
      </div>
    </div>
    <div className="row">
      <a className="select_column host" href="#host">
        Host
      </a>
      <a className="select_column join" href="#join">
        Join
      </a>
    </div>
  </section>
);

export default HomePage;
