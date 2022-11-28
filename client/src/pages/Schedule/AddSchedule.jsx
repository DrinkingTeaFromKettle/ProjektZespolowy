import React, { useState, useRef, useEffect } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button"
import ScheduleService from '../../services/schedule.service'
import HarmonogramService from '../../services/harmonogram.service'
import { useStateContext } from '../../services/ContextProvider';
import UserService from '../../services/user.service';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

//CRUD + odczywytanie w tabeli


const AddSchedule = () => {
  const { currentUser, showAdminBoard, showEmployeeBoard } = useStateContext();

  const [schedules, setSchedules] = useState([])
  const [users, setUsers] = useState([])
  const [harmonograms, setHarmonograms] = useState([])
  const [message, setMessage] = useState("")

  const fetchSchedules = () => {
    ScheduleService.showSchedules()
      .then(response => {
        setSchedules(response.data);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      })
  }

  const fetchHarmonograms = () => {
    HarmonogramService.showHarmonograms("")
      .then(response => {
        setSchedules(response.data);
      })
      .catch(error => {
        console.error(error)
        setMessage(error.message);
      })
  }

  useEffect(() => {
    UserService.get_all_users()
      .then(response => {
        setUsers(response.data.map(e => { return { id: e.id, username: e.username } }))
      }).catch(error => {
        console.error(error)
        setMessage(error.message);
      })

    fetchSchedules();
    fetchHarmonograms();
  }, []);

  return (
    <div>
      Add Harmonogram
    </div>
  )
}

export default AddSchedule
