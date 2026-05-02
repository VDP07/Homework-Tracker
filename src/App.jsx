import React, { useState } from 'react';
import { Calendar, Book, Users, School, CheckSquare, Clock, List, Edit3 } from 'lucide-react';
import { useForm } from 'react-hook-form';

const App = () => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwOqUav0nrJDa_--AuHC4aVOp7KfLvsjNjyQ8jKFAbg9D7QIBPfTgFfib-FD-r_JIrC/exec';
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const universities = [
    { name: 'Kasetsart University', value: 'Kasetsart University' },
    { name: 'Nakornratchasima College', value: 'Nakornratchasima College' },
  ];

  const taskListOptions = [
    { name: 'Hw Due', value: 'Hw Due' },
    { name: 'Activity', value: 'Activity' },
    { name: 'Check Point', value: 'Check Point' },
    { name: 'Other', value: 'Other' },
  ];

  const subjects = [
    { name: 'KU', value: 'KU' },
    { name: 'NMC', value: 'NMC' },
    { name: 'MED6204-Research', value: 'MED6204-Research' },
    { name: 'MED6006-Quality', value: 'MED6006-Quality' },
    { name: 'NMC Thesis', value: 'NMC Thesis' },
    { name: 'KU Thesis', value: 'KU Thesis' },
    { name: 'Task', value: 'Task' },
    { name: 'Other', value: 'Other' },
  ];

  const assignmentTypes = [
    { name: 'Individual', value: 'Individual' },
    { name: 'Group', value: 'Group' },
    { name: 'Presentation', value: 'Presentation' },
    { name: 'Meeting', value: 'Meeting' },
    { name: 'Exam', value: 'Exam' },
    { name: 'Other', value: 'Other' },
  ];
  
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: { 
      daysOut: 5,
      taskTiming: 'before',
      createTask: false
    }
  });
  
  const watchTaskList = watch('taskList');
  const watchSubject = watch('subject');
  const watchAssignmentType = watch('type');
  const watchCreateTask = watch('createTask');

  const onSubmit = async (data) => {
    setSubmissionStatus('loading');
    
    const finalTaskList = data.taskList === 'Other' ? data.customTaskList : data.taskList;
    const finalSubject = data.subject === 'Other' ? data.customSubject : data.subject;

    // Strict formatting for the title
    const formattedTitle = `${finalTaskList}: ${finalSubject}`;

    const payload = { 
      university: data.university,
      type: data.type === 'Other' ? data.customType : data.type,
      ONLY_TITLE: formattedTitle,     // UNIQUE KEY
      ONLY_NOTES: data.description,   // UNIQUE KEY
      dueDate: data.dueDate,
      createTask: data.createTask,
      daysOut: data.daysOut,
      taskTiming: data.taskTiming
    };
    
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setSubmissionStatus('success');
      reset({ createTask: false, daysOut: 5, taskTiming: 'before' });
    } catch (error) {
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="main-container">
      <style>{`
        body { font-family: sans-serif; background-color: #f8fafc; margin: 0; }
        .main-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .card { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); width: 100%; max-width: 40rem; border: 1px solid #e2e8f0; }
        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: flex; align-items: center; font-weight: 700; font-size: 0.8rem; margin-bottom: 0.5rem; text-transform: uppercase; color: #475569; }
        .form-input { width: 100%; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; box-sizing: border-box; }
        .submit-button { width: 100%; background: #2563eb; color: white; padding: 1rem; border-radius: 0.5rem; border: none; font-weight: 800; cursor: pointer; }
        .success-msg { background: #dcfce7; color: #166534; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; text-align: center; }
      `}</style>

      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Homework Log</h1>
        {submissionStatus === 'success' && <div className="success-msg">✅ Logged Successfully!</div>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label"><School size={16} style={{marginRight: 8}}/> University</label>
            <select {...register('university', { required: true })} className="form-input">
              <option value="">Select...</option>
              {universities.map(u => <option key={u.value} value={u.value}>{u.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label"><List size={16} style={{marginRight: 8}}/> Task Category</label>
            <select {...register('taskList', { required: true })} className="form-input">
              <option value="">Select...</option>
              {taskListOptions.map(o => <option key={o.value} value={o.value}>{o.name}</option>)}
            </select>
          </div>
          {watchTaskList === 'Other' && <input {...register('customTaskList')} placeholder="Enter Category..." className="form-input" style={{marginTop: -10, marginBottom: 15}} />}

          <div className="form-group">
            <label className="form-label"><Book size={16} style={{marginRight: 8}}/> Subject</label>
            <select {...register('subject', { required: true })} className="form-input">
              <option value="">Select...</option>
              {subjects.map(s => <option key={s.value} value={s.value}>{s.name}</option>)}
            </select>
          </div>
          {watchSubject === 'Other' && <input {...register('customSubject')} placeholder="Enter Subject..." className="form-input" style={{marginTop: -10, marginBottom: 15}} />}

          <div className="form-group">
            <label className="form-label"><Calendar size={16} style={{marginRight: 8}}/> Due Date</label>
            <input type="date" {...register('dueDate', { required: true })} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label"><FileText size={16} style={{marginRight: 8}}/> Notes (Hidden in Description)</label>
            <textarea {...register('description', { required: true })} className="form-input" rows="3" />
          </div>

          <button type="submit" className="submit-button" disabled={submissionStatus === 'loading'}>
            {submissionStatus === 'loading' ? 'LOGGING...' : 'LOG TO CALENDAR'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;