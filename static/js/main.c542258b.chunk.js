(this.webpackJsonpfiesta=this.webpackJsonpfiesta||[]).push([[0],{24:function(e,t,a){e.exports=a(36)},29:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t);var o=a(0),n=a.n(o),s=a(12),r=a.n(s),i=(a(29),a(15)),c=a(3),l=a(7),d=a(8),u=a(13),m=a(10),_=a(9);function p(e,t){localStorage.setItem(e,function(e){return btoa(JSON.stringify(e))}(t))}function h(e,t,a){var o=b(e);if(!o)return!1;o[t]=a,p(e,o)}function b(e){var t=localStorage.getItem(e);return!!t&&function(e){return JSON.parse(atob(e))}(t)}function v(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,n=Object({NODE_ENV:"production",PUBLIC_URL:"/fiesta",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_PEERJS,s=Object({NODE_ENV:"production",PUBLIC_URL:"/fiesta",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_TURN,r=Object({NODE_ENV:"production",PUBLIC_URL:"/fiesta",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_TURN_USERNAME,i=Object({NODE_ENV:"production",PUBLIC_URL:"/fiesta",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_TURN_CREDENTIALS,c=window.Peer,l={debug:2,config:{iceServers:[{urls:"stun:stun.l.google.com:19302"}]}};if(n&&(l.host=n,l.port="",l.path="/myapp"),s&&l.config.iceServers.push({urls:s,username:r,credential:i}),o)var d=new c(o,l);else d=new c(l);if(window.peer_obj=d,window.is_host=t,!0!==t){var u=d.connect(a);y(u)}d.on("open",(function(t){console.log("MY peer ID is "+d.id),window.peer_id=d.id,e.setState({peer_id:d.id}),!0===window.is_host&&e.setState({host_peer_id:d.id})})),d.on("connection",(function(e){console.log("connection called"),y(e)})),d.on("close",(function(){console.log("peer closed"),window.global_this_obj.notify("Network disconnected please refresh",1e4)})),d.on("disconnected",(function(){console.log("peer disconnected"),window.global_this_obj.notify("Network disconnected please refresh",1e4)}))}function y(e){window.peer_ids.push(e.peer),e.on("data",(function(e){console.log("data received"),console.log(e),function(e){"object"===typeof e&&null!==e&&("chat"===e.data_type?g(e):"new_connection"===e.data_type?w(e.peer_id):"youtube"===e.data_type?function(e){if(""===window.global_this_obj.state.youtube_video_id)window.global_this_obj.setState({youtube_video_id:e.videoId,youtube_current_pos:Math.ceil(e.startSeconds),player_state:e.event});else{window.global_this_obj.setState({isStateChangeFromBroadcastData:!0});var t=window.yt_player;2===e.event?(t.seekTo(e.startSeconds,!0),t.pauseVideo(),window.global_this_obj.notify("".concat(e.user_name," paused the video"))):1===e.event?(t.seekTo(Math.ceil(e.startSeconds),!0),t.playVideo(),window.global_this_obj.notify("".concat(e.user_name," started the video"))):3===e.event?(t.seekTo(e.startSeconds,!0),t.pauseVideo(),window.global_this_obj.notify("".concat(e.user_name," is buffering"))):"playbackRateChange"===e.event&&(t.seekTo(e.startSeconds,!0),t.setPlaybackRate(e.playbackRate),window.global_this_obj.notify("".concat(e.user_name," changed the playback rate to ").concat(e.playbackRate,"x"))),setTimeout((function(){window.global_this_obj.setState({isStateChangeFromBroadcastData:!1})}),2500)}}(e):"intro"===e.data_type?function(e){var t=window.global_this_obj.state.connected_users;t[e.peer_id]={user_name:e.user_name,color_code:e.color_code},window.global_this_obj.setState({connected_users:t}),window.global_this_obj.notify("".concat(e.user_name," has joined the party")),window.is_host&&(h(window.peer_obj.id,"connected_users",t),setTimeout((function(){N(),f({data_type:"user_list",user_list:window.global_this_obj.state.connected_users,only_host_controls:window.global_this_obj.state.only_host_controls})}),250))}(e):"user_list"===e.data_type?function(e){window.global_this_obj.setState({connected_users:e.user_list,only_host_controls:e.only_host_controls})}(e):"change_video"===e.data_type&&O(e.video_id))}(e)})),console.log("Handled connection"),e.on("close",(function(){var t=window.global_this_obj.state.connected_users;if(t&&t[e.peer]){var a=t[e.peer].user_name;delete t[e.peer],window.global_this_obj.setState({connected_users:t}),window.global_this_obj.notify("".concat(a," has left the party")),window.is_host&&h(window.peer_obj.id,"connected_users",t)}})),window.connections.push(e),!0===window.is_host&&function(e){for(var t={data_type:"new_connection",peer_id:e},a=0;a<window.connections.length;a++)window.connections[a].peer!==e&&window.connections[a].send(t)}(e.peer)}function f(e){console.log("Sending data: "),console.log(e);for(var t=window.connections,a=0;a<t.length;a++)t[a].send(e)}function w(e){y(window.peer_obj.connect(e))}function g(e){var t=window.global_this_obj.state.chat_log;e.message=decodeURIComponent(escape(window.atob(e.message))),t.push(e),window.global_this_obj.setState({chat_log:t})}function E(e,t,a,o){var n=function(e,t,a,o){return{data_type:"chat",user_name:t,user_type:a?"Host":"Client",message:btoa(unescape(encodeURIComponent(e))),color_code:o,time_stamp:Date.now()}}(e,t,a,o);f(n),g(n)}function N(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if((!0!==window.global_this_obj.state.only_host_controls||!0===window.is_host)&&!window.global_this_obj.state.isStateChangeFromBroadcastData){var t=S(e);f(t)}}function S(e){var t,a=window.yt_player;t=null!==e?e:a.getPlayerState();var o=a.getVideoData().video_id,n=a.getCurrentTime(),s=a.getPlaybackRate();return{data_type:"youtube",user_name:window.global_this_obj.state.user_name,event:t,videoId:o,startSeconds:n,playbackRate:s}}function j(e,t){f({data_type:"intro",user_name:e,peer_id:window.peer_obj.id,color_code:t,time_stamp:Date.now()})}function O(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=window.yt_player;if(a.loadVideoById(e),t){var o={data_type:"change_video",video_id:e};f(o)}}function C(e){var t=e.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);return!(!t||11!==t[2].length)&&t[2]}var T=function(e){Object(m.a)(a,e);var t=Object(_.a)(a);function a(){var e;Object(l.a)(this,a);for(var o=arguments.length,n=new Array(o),s=0;s<o;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).state={user_name:"",youtube_video_id:"",host_peer_id:null,is_host:!0,submitted:!1},e.handleSubmit=function(t){t.preventDefault();var a=e.parseIdFromURL(t.target.youtubeLink.value);console.log(t.target.onlyHost.checked),e.setState({user_name:t.target.userName.value,youtube_video_id:a,only_host_controls:t.target.onlyHost.checked,submitted:!0}),v(Object(u.a)(e),!0)},e.parseIdFromURL=function(e){var t=e.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);return!(!t||11!==t[2].length)&&t[2]},e}return Object(d.a)(a,[{key:"render",value:function(){return this.state.host_peer_id?(p(this.state.host_peer_id,this.state),n.a.createElement(c.a,{push:!0,to:{pathname:"party/"+this.state.host_peer_id,state:this.state}})):n.a.createElement("section",{className:"section"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"columns is-centered"},n.a.createElement("div",{className:"column is-half"},n.a.createElement("div",{className:"card box"},n.a.createElement("div",{className:"card-content"},n.a.createElement("form",{onSubmit:this.handleSubmit},n.a.createElement("div",{className:"field"},n.a.createElement("label",{className:"label"},"Username"),n.a.createElement("div",{className:"control"},n.a.createElement("input",{className:"input",placeholder:"Please enter your username",type:"text",name:"userName",required:!0}))),n.a.createElement("div",{className:"field"},n.a.createElement("label",{className:"label"},"Youtube Link"),n.a.createElement("div",{className:"control"},n.a.createElement("input",{className:"input",placeholder:"The Youtube link to be shared",type:"url",name:"youtubeLink",required:!0}))),n.a.createElement("div",{className:"field"},n.a.createElement("label",{className:"checkbox"},n.a.createElement("input",{type:"checkbox",name:"onlyHost"}),"\xa0Only allow host to control video")),n.a.createElement("div",{className:"buttons is-right"},n.a.createElement("button",{className:"button is-primary"+(this.state.submitted?" is-loading":"")},"Party")))))))))}}]),a}(n.a.Component),k=function(e){Object(m.a)(a,e);var t=Object(_.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"chat-bubble"},n.a.createElement("span",{className:"chat_user_name",style:{color:"#"+this.props.chat_data.color_code}},this.props.chat_data.user_name),this.props.chat_data.message)}}]),a}(n.a.Component),P=a(16),R=function(e){var t=e.connectedUsers;return n.a.createElement("div",{className:"avatar_container"},Object.entries(t).map((function(e){var t=Object(P.a)(e,2),a=(t[0],t[1]);return n.a.createElement("span",{className:"tag ".concat(a.color_code)},a.user_name)})))},D=function(e){Object(m.a)(a,e);var t=Object(_.a)(a);function a(e){var o;return Object(l.a)(this,a),(o=t.call(this,e)).add_text=function(e){o.setState({message:e.target.value})},o.send_message=function(e){e.preventDefault(),""!==o.state.message&&(E(o.state.message,o.props.user_name,o.props.is_host,o.props.color_code),o.setState({message:""}))},o.chatBottom=n.a.createRef(),o.state={message:""},o}return Object(d.a)(a,[{key:"componentDidUpdate",value:function(){this.chatBottom.current.scrollIntoView({behavior:"smooth"})}},{key:"render",value:function(){return n.a.createElement("div",{className:"chat-panel box"},n.a.createElement(R,{connectedUsers:this.props.connected_users,only_host_controls:this.props.only_host_controls,is_host:this.props.is_host}),n.a.createElement("div",{className:"chat-message-panel"},this.props.chat_log.map((function(e,t){return n.a.createElement(k,{key:t,chat_data:e})})),n.a.createElement("span",{ref:this.chatBottom,id:"chat-bottom"})),n.a.createElement("form",{onSubmit:this.send_message},n.a.createElement("div",{className:"field is-grouped"},n.a.createElement("p",{className:"control is-expanded"},n.a.createElement("input",{className:"input",value:this.state.message,type:"text",placeholder:"Chat...",onChange:this.add_text})),n.a.createElement("p",{className:"control"},n.a.createElement("button",{className:"button is-primary"},n.a.createElement("i",{className:"icon icon ion-ios-paperplane",style:{fontSize:"xx-large",alignItems:"normal",height:"1em"}}))))))}}]),a}(n.a.Component),x=function(e){Object(m.a)(a,e);var t=Object(_.a)(a);function a(e){var o;return Object(l.a)(this,a),(o=t.call(this,e)).loadScript=function(){if(window.YT)window.YT.Player&&o.loadVideo();else{var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api",window.onYouTubeIframeAPIReady=o.loadVideo;var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}},o.loadVideo=function(){var e=Math.round(.7*window.innerHeight),t=Math.round(16*e/9);o.state.player=new window.YT.Player("youtube-player-iframe",{videoId:o.props.youtube_video_id,width:t,height:e,playerVars:{start:Math.ceil(o.props.youtube_current_pos)},events:{onReady:o.onPlayerReady,onStateChange:o.onPlayerStateChange,onPlaybackRateChange:o.onPlayerPlaybackRateChange}}),window.yt_player=o.state.player},o.onPlayerReady=function(e){1===o.props.player_state&&e.target.playVideo()},o.onPlayerStateChange=function(e){o.props.isStateChangeFromBroadcastData||e.data!==window.YT.PlayerState.PLAYING&&e.data!==window.YT.PlayerState.PAUSED||N()},o.onPlayerPlaybackRateChange=function(e){console.log(e),o.props.is_host&&N("playbackRateChange")},console.log(e),o.state={player:""},o}return Object(d.a)(a,[{key:"componentDidUpdate",value:function(){""===this.state.player&&""!==this.props.youtube_video_id&&this.loadScript()}},{key:"render",value:function(){return n.a.createElement("div",{className:"player_container"},n.a.createElement("div",{id:"youtube-player-iframe"}))}}]),a}(n.a.Component),I=function(e){Object(m.a)(a,e);var t=Object(_.a)(a);function a(){var e;Object(l.a)(this,a);for(var o=arguments.length,n=new Array(o),s=0;s<o;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).changeVideo=function(e){e.preventDefault();var t=C(e.target.video_url.value);t&&O(t,!0)},e}return Object(d.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"box info_box"},n.a.createElement("div",{className:""},n.a.createElement("form",{onSubmit:this.changeVideo},n.a.createElement("div",{className:"field is-grouped"},n.a.createElement("p",{className:"control is-expanded"},n.a.createElement("input",{className:"input",type:"text",name:"video_url",placeholder:"Enter new video URL",required:!0})),n.a.createElement("p",{className:"control"},n.a.createElement("button",{className:"button is-primary"},"Change"))))))}}]),a}(n.a.Component),U=a(20);a(35);function B(){var e=["is-black","is-dark","is-light","is-primary","is-link","is-info","is-success","is-warning","is-danger"];return e[Math.floor(Math.random()*e.length)]}var A=function(e){Object(m.a)(a,e);var t=Object(_.a)(a);function a(e){var o;return Object(l.a)(this,a),(o=t.call(this,e)).state={user_name:"",youtube_video_id:"",youtube_current_pos:0,peer_id:"",is_host:!1,chat_log:[],invite_popup_shown:!1,connected_users:{},color_code:"",isStateChangeFromBroadcastData:!1,player_state:!1},o.setUserName=function(e){e.preventDefault();var t=B(),a=o.state.connected_users;a[o.state.peer_id]={user_name:e.target.user_name.value,color_code:t,is_host:!1},o.setState({user_name:e.target.user_name.value,connected_users:a,color_code:t}),j(e.target.user_name.value,t)},o.copyToClipboard=function(e){e.preventDefault(),o.copy_invite.select(),document.execCommand("copy"),o.setState({invite_popup_shown:!0})},o.closeModal=function(e){o.setState({invite_popup_shown:!0})},o.notify=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3;U.b.info(e,{position:"bottom-left",autoClose:t,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:e})},window.global_this_obj=Object(u.a)(o),window.peer_ids=[],window.connections=[],o}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=b(this.props.match.params.host_id),t=B();if(e){if(window.peer_obj||v(this,!0,null,this.props.match.params.host_id),e.connected_users){o=e.connected_users;var a=JSON.parse(JSON.stringify(o));delete a[this.props.match.params.host_id],function(e,t){var a=function(t){setTimeout((function(){w(e[t])}),250)};for(var o in e)a(o);var n=250*e.length+100;setTimeout((function(){console.log("intro called"),j(t.user_name,t.color_code)}),n)}(Object.keys(a),o[this.props.match.params.host_id])}else{var o;(o={})[this.props.match.params.host_id]={user_name:e.user_name,color_code:t,is_host:!0}}this.setState({peer_id:this.props.match.params.host_id,user_name:e.user_name,youtube_video_id:e.youtube_video_id,only_host_controls:e.only_host_controls,is_host:e.is_host,connected_users:o,color_code:t})}else v(this,!1,this.props.match.params.host_id)}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"party-container"},n.a.createElement(U.a,{position:"bottom-left",autoClose:3e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!1,draggable:!0,pauseOnHover:!0}),n.a.createElement("div",{className:"modal   "+(""===this.state.user_name?"is-active":"")},n.a.createElement("div",{className:"modal-background"}),n.a.createElement("div",{className:"modal-content"},n.a.createElement("div",{className:"box"},n.a.createElement("form",{onSubmit:this.setUserName},n.a.createElement("div",{className:"field is-grouped"},n.a.createElement("p",{className:"control is-expanded"},n.a.createElement("input",{className:"input",type:"text",name:"user_name",placeholder:"Enter Your Username",required:!0})),n.a.createElement("p",{className:"control"},n.a.createElement("button",{className:"button is-primary"},"Party")))))),n.a.createElement("button",{className:"modal-close is-large","aria-label":"close"})),n.a.createElement("div",{className:"modal "+(this.state.invite_popup_shown?"is-active":"")},n.a.createElement("div",{className:"modal-background",onClick:this.closeModal}),n.a.createElement("div",{className:"modal-content"},n.a.createElement("div",{className:"box"},n.a.createElement("form",{onSubmit:this.copyToClipboard},n.a.createElement("label",null,"Share this link with friends to watch YouTube together"),n.a.createElement("div",{className:"field is-grouped"},n.a.createElement("p",{className:"control is-expanded"},n.a.createElement("input",{className:"input",type:"text",value:window.location.href,name:"invite_link",readOnly:!0,ref:function(t){return e.copy_invite=t}})),n.a.createElement("p",{className:"control"},n.a.createElement("button",{className:"button is-primary"},n.a.createElement("span",{role:"img","aria-label":"cliboard_emoji"},"\ud83d\udccb"),"\xa0Copy Invite Link")))))),n.a.createElement("button",{className:"modal-close is-large","aria-label":"close",onClick:this.closeModal})),n.a.createElement("div",null,n.a.createElement(x,{youtube_video_id:this.state.youtube_video_id,youtube_current_pos:this.state.youtube_current_pos,is_host:this.state.is_host,isStateChangeFromBroadcastData:this.state.isStateChangeFromBroadcastData,player_state:this.state.player_state}),(!1===this.state.only_host_controls||!0===this.state.is_host)&&n.a.createElement(I,null)),n.a.createElement(D,{connected_users:this.state.connected_users,only_host_controls:this.state.only_host_controls,user_name:this.state.user_name,chat_log:this.state.chat_log,is_host:this.state.is_host,color_code:this.state.color_code}))}}]),a}(n.a.Component),L=function(){var e=Object(o.useState)(""),t=Object(P.a)(e,2),a=t[0],s=t[1];return""!==a?n.a.createElement(c.a,{push:!0,to:{pathname:"party/".concat(a),state:{roomId:a}}}):n.a.createElement("section",{className:"section"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"columns is-centered"},n.a.createElement("div",{className:"column is-half"},n.a.createElement("div",{className:"card box"},n.a.createElement("div",{className:"card-content"},n.a.createElement("form",{onSubmit:function(e){e.preventDefault(),s(e.target.roomId.value)}},n.a.createElement("div",{className:"field"},n.a.createElement("label",{className:"label"},"Room Id"),n.a.createElement("div",{className:"control"},n.a.createElement("input",{className:"input",placeholder:"Paste the room Id here",type:"text",name:"roomId",required:!0}))),n.a.createElement("div",{className:"buttons is-right"},n.a.createElement("button",{className:"button is-primary"},"Party")))))))))},H=function(){return n.a.createElement("section",{className:"hero is-primary has-background-primary is-fullheight"},n.a.createElement("div",{className:"hero-body"},n.a.createElement("div",{className:"tile is-ancestor"},n.a.createElement("div",{className:"container homepage_left_hero"},n.a.createElement("h1",{className:"title has-text-centered not-selectable"},"Watch YouTube Together with Friends!")))),n.a.createElement("div",{className:"row"},n.a.createElement("a",{className:"select_column host",href:"#host"},"Host"),n.a.createElement("a",{className:"select_column join",href:"#join"},"Join")))},V=function(){return n.a.createElement(i.a,null,n.a.createElement(c.d,null,n.a.createElement(c.b,{exact:!0,path:"/",component:H}),n.a.createElement(c.b,{exact:!0,path:"/host",component:T}),n.a.createElement(c.b,{exact:!0,path:"/join",component:L}),n.a.createElement(c.b,{exact:!0,path:"/party",component:T}),n.a.createElement(c.b,{exact:!0,path:"/party/:host_id",component:A})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(V,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[24,1,2]]]);
//# sourceMappingURL=main.c542258b.chunk.js.map