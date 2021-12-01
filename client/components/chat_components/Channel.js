import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getChannels } from '../../store/chat';
import { Link } from 'react-router-dom';

const Channel = (props) => {
  useEffect(() => {
    async function fetchData() {
      try {
        await props.getChannels();
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1> Channels List </h1>
      <ul>
        {props.channels.map((channel) => (
          <li key={channel.id}>
            <Link to={`/chat/channels/${channel.id}`}>{channel.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    channels: state.chat.channels,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getChannels: () => dispatch(getChannels()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
