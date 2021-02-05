import React, { useEffect } from 'react';
import useVisualMode from "hooks/useVisualMode";

// imported styles
import './styles.scss';


import Header from "./Header"
import Show from "./Show";
import Empty from "./Empty";

// Appointment imports
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW)
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY)
    } 
  },[props.interview, transition, mode])

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };

  transition(SAVING);

  props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
}

const cancel = () => {
  transition(CONFIRM)
  }

function destroy(event) {
 transition(DELETING, true);
 props
  .cancelInterview(props.id)
  .then(() => transition(EMPTY))
  .catch(error => transition(ERROR_DELETE, true));
}

const edit = ()=>{
  transition(EDIT)
}


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={cancel}
      onEdit={edit}
      />
)}
    {mode === CREATE && <Form interviewers={props.interviewers} onSave ={save} onCancel={() => back()} />}

    {mode === EDIT && <Form onSave ={save} onCancel ={() => back()} interviewer = {props.interview.id} interviewers={props.interviewers} name={props.interview.student}/>}

    {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm ={destroy} message='Are you sure you want to delete this?'/>}

    {mode === DELETING && <Status message='Deleting'/>}

    {mode === SAVING && <Status message='Saving'/>}

    {mode === ERROR_SAVE && <Error message = 'Sorry can not save appointment ' onClose={() => back()}/>}

    {mode === ERROR_DELETE && <Error message = 'Sorry can not delete appointment ' onClose={() => back()}/>}
    </article>
  )
}