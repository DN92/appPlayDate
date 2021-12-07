import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  deleteSingleEvent,
  fetchSingleEvent,
  updateSingleEvent,
} from "../store/events";
import EditEvent from "./EditEvent";

import { OpenStreetMapProvider } from "leaflet-geosearch";

// learn constant hook for this later
let provider;

const SingleEvent = (props) => {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await props.getEvent(props.match.params.id);
      } catch (error) {
        console.error(error);
      }
    }

    // Geosearch with leaflet-geosearch
    if (!provider) provider = new OpenStreetMapProvider();

    fetchData();
  }, []);

  function handleDelete() {
    props.deleteEvent(props.match.params.id);
    props.history.push(`/events`);
  }

  async function handleUpdate(body) {
    try {
      const [{ x, y }] = await parseAddress(body.location);
      body.latitude = y.toFixed(7);
      body.longitude = x.toFixed(7);

      await props.updateEvent(props.match.params.id, body);
      handleEdit();
    } catch (error) {
      console.error(error);
    }
  }

  async function parseAddress(address) {
    const results = await provider.search({ query: address });
    return results;
  }

  function handleEdit() {
    setEdit((prevEdit) => !prevEdit);
  }

  return (
    <div>
      {edit ? (
        <EditEvent
          event={props.event}
          handleEdit={handleEdit}
          handleUpdate={handleUpdate}
        />
      ) : (
        <div className="eventscontainer">
          <button onClick={(e) => handleEdit(e)}>Edit</button>
          <button type="button" onClick={() => handleDelete()}>
            Delete
          </button>
          <img src={props.event.image} />
          <div className="singleeventcasing">
            <h1>{props.event.name}</h1>
            <h4>Description</h4>
            <h4>{props.event.description}</h4>
            <h4>{props.event.location}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    event: state.events.singleEvent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvent: (id) => dispatch(fetchSingleEvent(id)),
    deleteEvent: (id) => dispatch(deleteSingleEvent(id)),
    updateEvent: (id, body) => dispatch(updateSingleEvent(id, body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleEvent);
