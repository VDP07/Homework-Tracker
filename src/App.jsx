import React, { useState } from 'react';
import { Calendar, Book, Users, School, CheckSquare, Clock, List } from 'lucide-react';
import { useForm } from 'react-hook-form';

const App = () => {
  // Your Google Apps Script URL
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
    { name: 'MED6204-Research', value: 'MED6204-Research' },
    { name: 'MED6006-Quality', value: 'MED6006-Quality' },
    { name: 'NMC Thesis', value: 'NMC Thesis' },
    { name: 'KU Thesis', value: 'KU Thesis' },
    { name: 'Task', value: 'Task' },
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
      taskTiming: 'before' 
    }
  });
  
  const watchCreateTask = watch('createTask');

  const onSubmit = async (data) => {
    setSubmissionStatus('loading');
    const payload = { ...data };
    
    if (payload.createTask) {
      payload.taskName = `${payload.taskList}-${payload.subject}`; 
    } else {
      delete payload.daysOut;
      delete payload.taskTiming;
    }
    
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
      console.error('Submission failed:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <>
      <style>
        {`
          body { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; background-color: #f3f4f6; }
          .main-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem; }
          .card { background-color: #ffffff; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); width: 100%; max-width: 48rem; border: 1px solid #e5e7eb; }
          .title { font-size: 2.25rem; font-weight: 800; text-align: center; color: #1f2937; margin-bottom: 0.5rem; }
          .subtitle { font-size: 1.125rem; text-align: center; color: #4b5563; margin-bottom: 2rem; }
          .message-box { margin-bottom: 1rem; padding: 1rem; text-align: center; font-size: 1.125rem; font-weight: 600; border-radius: 0.5rem; }
          .success { background-color: #d1fae5; color: #065f46; border-color: #a7f3d0; }
          .error { background-color: #fee2e2; color: #991b1b; border-color: #fca5a5; }
          .form-group { margin-bottom: 1.5rem; }
          .form-label { color: #374151; font-weight: 500; display: flex; align-items: center; margin-bottom: 0.25rem; }
          .form-label svg { width: 1.25rem; height: 1.25rem; color: #6b7280; margin-right: 0.5rem; }
          .form-input { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.75rem; }
          .form-input:focus { border-color: #3b82f6; outline: 2px solid transparent; outline-offset: 2px; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); }
          .error-message { color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; }
          .flex-group { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
          .checkbox-container { display: flex; align-items: center; margin-bottom: 1.5rem; background-color: #f8fafc; padding: 1rem; border-radius: 0.75rem; border: 1px solid #e2e8f0; }
          .checkbox-input { width: 1.25rem; height: 1.25rem; margin-right: 0.75rem; cursor: pointer; accent-color: #2563eb; }
          .checkbox-label { color: #374151; font-weight: 600; cursor: pointer; display: flex; align-items: center; margin: 0; }
          .submit-button { width: 100%; background-color: #2563eb; color: #ffffff; font-weight: 700; padding: 0.75rem 1.5rem; border-radius: 0.75rem; transition: all 300ms; }
          .submit-button:hover { background-color: #1d4ed8; transform: scale(1.02); }
          .submit-button[disabled] { opacity: 0.6; cursor: not-allowed; }
        `}
      </style>

      <div className="main-container">
        <div className="card">
          <h1 className="title">Homework Log</h1>
          <p className="subtitle">Enter your assignment details to save them automatically.</p>

          {submissionStatus === 'success' && <div className="message-box success">✅ Homework submitted successfully!</div>}
          {submissionStatus === 'error' && <div className="message-box error">❌ An error occurred. Please try again.</div>}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-group">
              <label htmlFor="university" className="form-label"><School /> University</label>
              <select id="university" {...register('university', { required: 'University is required' })} className="form-input">
                <option value="">Select a University...</option>
                {universities.map((uni) => <option key={uni.value} value={uni.value}>{uni.name}</option>)}
              </select>
              {errors.university && <p className="error-message">{errors.university.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="taskList" className="form-label"><List /> Task List</label>
              <select id="taskList" {...register('taskList', { required: 'Task List category is required' })} className="form-input">
                <option value="">Select a Task List...</option>
                {taskListOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
              </select>
              {errors.taskList && <p className="error-message">{errors.taskList.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label"><Book /> Subject</label>
              <select id="subject" {...register('subject', { required: 'Subject is required' })} className="form-input">
                <option value="">Select a Subject...</option>
                {subjects.map((sub) => <option key={sub.value} value={sub.value}>{sub.name}</option>)}
              </select>
              {errors.subject && <p className="error-message">{errors.subject.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="type" className="form-label"><Users /> Assignment Type</label>
              <select id="type" {...register('type', { required: 'Assignment type is required' })} className="form-input">
                <option value="">Select an Assignment Type...</option>
                {assignmentTypes.map((type) => <option key={type.value} value={type.value}>{type.name}</option>)}
              </select>
              {errors.type && <p className="error-message">{errors.type.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="dueDate" className="form-label"><Calendar /> Due Date</label>
              <input type="date" id="dueDate" {...register('dueDate', { required: 'Due date is required' })} className="form-input" />
              {errors.dueDate && <p className="error-message">{errors.dueDate.message}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="form-label"><Book /> Assignment Name / Description</label>
              <textarea id="description" rows="4" {...register('description', { required: 'Description is required' })} className="form-input"></textarea>
              {errors.description && <p className="error-message">{errors.description.message}</p>}
            </div>

            <div className="checkbox-container">
              <input type="checkbox" id="createTask" {...register('createTask')} className="checkbox-input" />
              <label htmlFor="createTask" className="checkbox-label">
                <CheckSquare style={{marginRight: '0.5rem', width: '1.25rem'}} /> Also create a task reminder?
              </label>
            </div>

            {watchCreateTask && (
              <div className="flex-group">
                <div style={{ flex: 1 }}>
                  <label htmlFor="daysOut" className="form-label"><Clock /> Days</label>
                  <input
                    type="number"
                    id="daysOut"
                    {...register('daysOut', { 
                      valueAsNumber: true,
                      required: 'Please specify how many days',
                      min: { value: 0, message: 'Cannot be negative' }
                    })}
                    className="form-input"
                  />
                  {errors.daysOut && <p className="error-message">{errors.daysOut.message}</p>}
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="taskTiming" className="form-label">Timing</label>
                  <select id="taskTiming" {...register('taskTiming')} className="form-input">
                    <option value="before">Before Due Date</option>
                    <option value="after">After Due Date</option>
                  </select>
                </div>
              </div>
            )}

            <button type="submit" className="submit-button" disabled={submissionStatus === 'loading'}>
              {submissionStatus === 'loading' ? 'Submitting...' : 'Submit Assignment'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;