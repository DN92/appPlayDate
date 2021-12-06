import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchMessages } from '../store/chat';
import Channel from './chat_components/Channel';
import Messages from './chat_components/Messages';


const Chat = (props) => {
  const [messages, setMessages] = useState(props);
  useEffect(() => {
    async function callmessages() {
      try {
        await props.getMessages();
      } catch (error) {
        throw error;
      }
    }
    callmessages();
  }, []);

  useEffect(() => {
    setMessages(props.messages);
  }, [props.messages]);

  return (
    <div className='chatcontainer'>
      <h1> Chat </h1>
      <div className='ChatParent'>
          
        <div className='Chat'>
        <div className='channel'>
            <Channel />
          </div>
          <Route path='/chat/channels/:channelId' component={Messages} />
          <div className='newmessage'></div>
        </div>
      </div>
      <div >
        <img id="MASSMasscot" src="trasparentdino.png" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    messages: state.chat.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: () => dispatch(fetchMessages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
