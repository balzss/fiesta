import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Join = () => {
  const [roomId, setRoomId] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setRoomId(e.target.roomId.value);
  };

  if (roomId !== '') {
    return (
      <Redirect
        push
        to={{
          pathname: `party/${roomId}`,
          state: { roomId }
        }}
      />
    );
  }
  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="card box">
              <div className="card-content">
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Room Id</label>
                    <div className="control">
                      <input
                        className="input"
                        placeholder="Paste the room Id here"
                        type="text"
                        name="roomId"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="buttons is-right">
                    <button className={"button is-primary"}>
                      Party
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
