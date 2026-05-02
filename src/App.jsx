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
    
    // 1. Resolve custom names
    const finalTaskList = data.taskList === 'Other' ? data.customTaskList : data.taskList;
    const finalSubject = data.subject === 'Other' ? data.customSubject : data.subject;
    const finalType = data.type === 'Other' ? data.customType : data.type;

    // 2. Format the name strictly as "Task Cat: Subject"
    const formattedTitle = `${finalTaskList}: ${finalSubject}`;

    const payload = { 
      university: data.university,
      taskList: finalTaskList,
      subject: finalSubject,
      type: finalType,
      title: formattedTitle,     // THIS IS THE CALENDAR NAME
      description: data.description, // THIS IS THE NOTES
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
    <>
      <style>
        {`
          body { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; background-color: #f8fafc; margin: 0; }
          .main-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; }
          .card { background-color: #ffffff; padding: 2.5rem; border-radius: 1.25rem; box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.05); width: 100%; max-width: 44rem; border: 1px solid #e2e8f0; }
          .title { font-size: 2.5rem; font-weight: 900; text-align: center; color: #1e293b; margin-bottom: 0.5rem; }
          .subtitle { font-size: 1.125rem; text-align: center; color: #64748b; margin-bottom: 2rem; }
          .message-box { margin-bottom: 1.5rem; padding: 1.25rem; text-align: center; font-weight: 700; border-radius: 0.75rem; }
          .success { background-color: #f0fdf4; color: #166534; }
          .form-group { margin-bottom: 1.5rem; }
          .form-label { color: #334155; font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; margin-bottom: 0.5rem; text-transform: uppercase; }
          .form-label svg { width: 1.125rem; height: 1.125rem; color: #3b82f6; margin-right: 0.6rem; }
          .form-input { width: 100%; padding: 0.85rem; border: 1px solid #cbd5e1; border-radius: 0.75rem; font-size: 1rem; box-sizing: border-box; }
          .custom-field-area { background-color: #f8fafc; padding: 1.25rem; border-radius: 0.75rem; border: 1px dashed #3b82f6; margin-bottom: 1.5rem; }
          .checkbox-container { display: flex; align-items: center; padding: 1.25rem; background-color: #eff6ff; border-radius: 1rem; border: 1px solid #dbeafe; margin-bottom: 2rem; cursor: pointer; }
          .submit-button { width: 100%; background-color: #2563eb; color: #ffffff; font-weight: 800; padding: 1.125rem; border-radius: 0.75rem; border: none; cursor: pointer; font-size: 1.25rem; }
        `}
      </style>

      <div className="main-container">
        <div className="card">
          <h1 className="title">Homework Log</h1>
          <p className="subtitle">Syncing Category: Subject only.</p>

          {submissionStatus === 'success' && <div className="message-box success">✅ Successfully Logged!</div>}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label"><School /> Institution</label>
              <select {...register('university', { required: true })} className="form-input">
                <option value="">Choose University...</option>
                {universities.map((uni) => <option key={uni.value} value={uni.value}>{uni.name}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label"><List /> Task Category</label>
              <select {...register('taskList', { required: true })} className="form-input">
                <option value="">Choose Task List...</option>
                {taskListOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
              </select>
            </div>
            {watchTaskList === 'Other' && (
              <div className="custom-field-area">
                <input type="text" {...register('customTaskList', { required: true })} placeholder="Type custom category..." className="form-input" />
              </div>
            )}

            <div className="form-group">
              <label className="form-label"><Book /> Course / Subject</label>
              <select {...register('subject', { required: true })} className="form-input">
                <option value="">Choose Subject...</option>
                {subjects.map((sub) => <option key={sub.value} value={sub.value}>{sub.name}</option>)}
              </select>
            </div>
            {watchSubject === 'Other' && (
              <div className="custom-field-area">
                <input type="text" {...register('customSubject', { required: true })} placeholder="Type custom subject..." className="form-input" />
              </div>
            )}

            <div className="form-group">
              <label className="form-label"><Users /> Submission Type</label>
              <select {...register('type', { required: true })} className="form-input">
                <option value="">Choose Type...</option>
                {assignmentTypes.map((type) => <option key={type.value} value={type.value}>{type.name}</option>)}
              </select>
            </div>
            {watchAssignmentType === 'Other' && (
              <div className="custom-field-area">
                <input type="text" {...register('customType', { required: true })} placeholder="Type custom type..." className="form-input" />
              </div>
            )}

            <div className="form-group">
              <label className="form-label"><Calendar /> Final Due Date</label>
              <input type="date" {...register('dueDate', { required: true })} className="form-input" />
            </div>
            
            <div className="form-group">
              <label className="form-label"><Book /> Assignment Details (Will be hidden in notes)</label>
              <textarea rows="3" {...register('description', { required: true })} className="form-input" placeholder="Notes..."></textarea>
            </div>

            <label className="checkbox-container">
              <input type="checkbox" {...register('createTask')} className="checkbox-input" />
              <div style={{ color: '#1e40af', fontWeight: 800, fontSize: '0.95rem' }}>
                <CheckSquare style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} /> 
                CREATE TASK REMINDER?
              </div>
            </label>

            {watchCreateTask && (
              <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2rem' }}>
                <input type="number" {...register('daysOut')} className="form-input" placeholder="Days" />
                <select {...register('taskTiming')} className="form-input">
                  <option value="before">BEFORE</option>
                  <option value="after">AFTER</option>
                </select>
              </div>
            )}

            <button type="submit" className="submit-button" disabled={submissionStatus === 'loading'}>
              {submissionStatus === 'loading' ? 'LOGGING...' : 'LOG TO CALENDAR'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;