import React from "react";
import ChatPanel from "./Chat";
import Player from "./Player";
import ChangeVideo from "./ChangeVideo";

import { get_data } from "../utils/data_storage_utils";
import {
  createConnection,
  introduce,
  bulk_connect
} from "../utils/webRTC_utils";
import { ToastContainer, toast } from "react-toastify";
// css
import "react-toastify/dist/ReactToastify.min.css";

function getRandomTagColor() {
  const bulmaTagColors = ['is-black', 'is-dark', 'is-light', 'is-primary', 'is-link', 'is-info', 'is-success', 'is-warning', 'is-danger'];
  return bulmaTagColors[Math.floor(Math.random() * bulmaTagColors.length)];
}

// https://stackoverflow.com/questions/54017100/how-to-integrate-youtube-iframe-api-in-reactjs-solution
class Party extends React.Component {
  state = {
    user_name: "",
    youtube_video_id: "",
    youtube_current_pos: 0,
    peer_id: "",
    is_host: false,
    chat_log: [],
    invite_popup_shown: false,
    connected_users: {},
    color_code: "",
    isStateChangeFromBroadcastData: false,
    player_state: false
  };

  constructor(props) {
    super(props);
    window.global_this_obj = this;
    window.peer_ids = [];
    window.connections = [];
  }

  componentDidMount() {
    const data = get_data(this.props.match.params.host_id);
    const color_code = getRandomTagColor();
    // i.e if host
    if (data) {
      if (!window.peer_obj) {
        createConnection(this, true, null, this.props.match.params.host_id);
      }

      if (!data.connected_users) {
        var connected_users = {};
        connected_users[this.props.match.params.host_id] = {
          user_name: data.user_name,
          color_code: color_code,
          is_host: true
        };
      } else {
        var connected_users = data.connected_users;
        // https://stackoverflow.com/questions/38416020/deep-copy-in-es6-using-the-spread-syntax
        var reconnect_users = JSON.parse(JSON.stringify(connected_users));

        delete reconnect_users[this.props.match.params.host_id];
        bulk_connect(
          Object.keys(reconnect_users),
          connected_users[this.props.match.params.host_id]
        );
      }

      this.setState({
        peer_id: this.props.match.params.host_id,
        user_name: data.user_name,
        youtube_video_id: data.youtube_video_id,
        only_host_controls: data.only_host_controls,
        is_host: data.is_host,
        connected_users: connected_users,
        color_code: color_code
      });
    } else {
      // Not a host: Create connection
      createConnection(this, false, this.props.match.params.host_id);
    }
  }

  setUserName = e => {
    e.preventDefault();
    const color_code = getRandomTagColor();
    const connected_users = this.state.connected_users;
    connected_users[this.state.peer_id] = {
      user_name: e.target.user_name.value,
      color_code: color_code,
      is_host: false
    };
    this.setState({
      user_name: e.target.user_name.value,
      connected_users: connected_users,
      color_code: color_code
    });
    introduce(e.target.user_name.value, color_code);
  };

  copyToClipboard = e => {
    e.preventDefault();
    this.copy_invite.select();
    document.execCommand("copy");
    this.setState({ invite_popup_shown: true });
  };

  closeModal = e => {
    this.setState({ invite_popup_shown: true });
  };

  notify = (message, timeout = 3000) => {
    toast.info(message, {
      position: "bottom-left",
      autoClose: timeout,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: message
    });
  };

  render() {
    return (
      <div className="party-container">
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        <div
          className={
            "modal   " + (this.state.user_name === "" ? "is-active" : "")
          }
        >
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <form onSubmit={this.setUserName}>
                <div className="field is-grouped">
                  <p className="control is-expanded">
                    <input
                      className="input"
                      type="text"
                      name="user_name"
                      placeholder="Enter Your Username"
                      required
                    />
                  </p>
                  <p className="control">
                    <button className="button is-primary">Party</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close"></button>
        </div>

        <div className={"modal " + (this.state.invite_popup_shown ? "is-active" : "")}>
          <div className="modal-background" onClick={this.closeModal}></div>
          <div className="modal-content">
            <div className="box">
              <form onSubmit={this.copyToClipboard}>
                <label>Share this link with friends to watch YouTube together</label>

                <div className="field is-grouped">
                  <p className="control is-expanded">
                    <input
                      className="input"
                      type="text"
                      value={window.location.href}
                      name="invite_link"
                      readOnly
                      ref={copy_invite => (this.copy_invite = copy_invite)}
                    />
                  </p>
                  <p className="control">
                    <button className="button is-primary">
                      <span role="img" aria-label="cliboard_emoji">
                        📋
                      </span>
                      &nbsp;Copy Invite Link
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={this.closeModal}
          />
        </div>

        <div>
          <Player
            youtube_video_id={this.state.youtube_video_id}
            youtube_current_pos={this.state.youtube_current_pos}
            is_host={this.state.is_host}
            isStateChangeFromBroadcastData={
              this.state.isStateChangeFromBroadcastData
            }
            player_state={this.state.player_state}
          />
          {(this.state.only_host_controls === false || this.state.is_host === true) && <ChangeVideo/>}
        </div>
        <ChatPanel
          connected_users={this.state.connected_users}
          only_host_controls={this.state.only_host_controls}
          user_name={this.state.user_name}
          chat_log={this.state.chat_log}
          is_host={this.state.is_host}
          color_code={this.state.color_code}
        />
      </div>
    );
  }
}
export default Party;
