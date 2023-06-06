import React, { createRef, useEffect, useState } from 'react'
// import { eventMockData } from '../../data/eventsData'

import Calendar from '../../Components/Calendar'
import Can from '../../Components/Can'
import { Modal } from '../../Components/Modal'
import Form from '../../Components/Form'
import { useAppDispatch, useAppSelector } from '../../Redux/store'
import { selectEvent, selectUser } from '../../utils/selector'
import { createEvent, getMyEvents } from '../../Redux/features/event/eventAction'

import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button'
import moment from 'moment'
import FullCalendar from '@fullcalendar/react'
import { DateSelectArg, formatDate } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr';
import './Style.css'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { TimeField } from '@mui/x-date-pickers/TimeField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo/DemoContainer'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { DateField } from '@mui/x-date-pickers/DateField'
const Index = () => {
  const dispatch = useAppDispatch()
  const { userInfo } = useAppSelector(selectUser)
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  const { events } = useAppSelector(selectEvent)
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    assignee: "",
    date: '',
    timetable: '',
  })
  const calendarComponentRef = createRef<FullCalendar>();

  useEffect(() => {
    dispatch(getMyEvents())
  }, [])


  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({
      ...eventData,
      [event.target.id]: event.target.value,
    })
  }
  const handleChangeDateValue = (date: any) => {
    setEventData({
      ...eventData,
      date: date.startStr,
    })
    setIsOpen(true)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newDate = moment(eventData.date + eventData.timetable, 'YYYY-MM-DDLT').toISOString();
    // console.log(eventData, newDate)
    dispatch(createEvent({ ...eventData, date: newDate }))
    setIsOpen(false)
  }

  return (
    <>
      <div className='event'>
        <div className='event-container'>
          <div>
            <div className='flex justify-content-space-between align-items-center '>
              <h2> Évènements</h2>
              <Can I="create" a="Task">
                <div className='task-add' onClick={() => setIsOpen(true)}>
                  <i className='bx bx-plus'></i>
                </div>
              </Can>
            </div>
            <div className='event-list'>
              {!events.length && <span>Vous n'avez pas d'évènements pour l'instant</span>}
              {events.map((event, index) => (
                <div key={index} className='card'>
                  <div className='card-header'>
                    <h2>{event.title}</h2>
                    <div className='card-badge'>
                      <span className='badge'>{moment(event.date).format("HH:mm")}</span>
                      <span className='badge'>{moment(event.date).format('DD/MM/YYYY')}</span>
                    </div>
                  </div>
                  <div className='card-body'>
                    <p>{event.description}</p>
                  </div>
                  <div className="card-footer">
                    <p>avec {event.createdBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='event-calendar'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              // weekends={true}
              events={events}
              aspectRatio={10}
              ref={calendarComponentRef}
              height={800}
              // eventClick={(info) => handleEventClick(info)}
              locale={frLocale}
              editable={true}
              select={handleChangeDateValue}
              selectable={true}
              windowResize={(arg) => console.log(arg)}
              headerToolbar={{
                left: 'prev,today,next',
                center: 'title',
                right: "dayGridMonth,timeGridWeek,timeGridDay"
              }}
            />
          </div>
        </div>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Créer un événement</h2>
        <form className='create' onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, with: "100%" }}>
            <TextField id="title" label="Titre" variant="outlined" onChange={handleChangeValue} required />
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <TextField id="description" label="Description" variant="outlined" multiline maxRows={4} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setEventData({
                ...eventData,
                description: e.target.value
              })
            }} />
          </FormControl>
          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateField']}>
                <DateField
                  id='dateDue'
                  label="date d'échéance"
                  onChange={(e: any) => {
                    setEventData({
                      ...eventData,
                      date: moment(e?.toString()).format('DD/MM/YYYY')
                    })
                  }}
                  margin="normal"
                  size='small'
                  format="DD/MM/YYYY"
                  required
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                <TimeField
                  label="Horaire"
                  id='timetable'
                  onChange={(newValue: any) => {
                    setEventData({
                      ...eventData,
                      timetable: [newValue?.$H, newValue?.$m].join(':')
                    })
                  }}
                  format="HH:mm"
                  required
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="assignee">Destinataire</InputLabel>
            <Select
              labelId="assignee"
              id="assignee"
              value={eventData.assignee}
              label="Destinataire"
              onChange={(e: SelectChangeEvent) => {
                setEventData({
                  ...eventData,
                  assignee: e.target.value
                })
              }}
              required
            >
              <MenuItem></MenuItem>
              {userInfo?.friendList.map((friend, index) => {
                const fullName = [friend.firstName, friend.lastName].join(" ")
                return < MenuItem key={index} value={friend.email} >{fullName}</MenuItem>
              })}
            </Select>
          </FormControl>
          <div className='group-btn'>
            <Button onClick={() => setIsOpen(false)} variant="contained">Annuler</Button>
            <Button type='submit' variant="contained">Créer</Button>
          </div>
        </form>
      </Modal >
    </>


  )
}

export default Index