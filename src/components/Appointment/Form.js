import React, { useState } from "react"
import Button from 'components/Button'
import InterviewerList from "components/InterviewerList"

export default function Form(props){

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [setError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    props.onCancel();
    reset();
  }

  function save(){
    props.onSave(name, interviewer)
    reset();
  }
  
  return(
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={event => { 
            setName(event.target.value)}}
        />
      </form>
      <InterviewerList 
        interviewers={props.interviewers} 
        value={interviewer} 
        onChange={setInterviewer} 
        />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={cancel} danger>Cancel</Button>
        <Button onClick={save} confirm >Save</Button>
      </section>
    </section>
    </main>
  );
} 