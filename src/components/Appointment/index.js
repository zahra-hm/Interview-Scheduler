import React from 'react';
import useVisualMode from "hooks/useVisualMode";

import './styles.scss';


import Header from "./Header"
import Show from "./Show";
import Empty from "./Empty";
import Form from "components/Appointment/Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = ()=>{
    transition(CREATE)
}
  const onCancel = () =>{
    transition(back)
}

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      />
)}
    {mode === CREATE && <Form onCancel ={onCancel} interviewers={props.interviewers}/>}
    </article>
  )}