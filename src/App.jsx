import React, { useState } from 'react';
import { Calendar, Book, Users, School, CheckSquare, Clock, List, Edit3, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';

const App = () => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwOqUav0nrJDa_--AuHC4aVOp7KfLvsjNjyQ8jKFAbg9D7QIBPfTgFfib-FD-r_JIrC/exec';
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const universities = [
    { name: 'Kasetsart University', value: 'Kasetsart University' },
    { name: 'Nakornratchasima College', value: 'Nakornratchasima College' },
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
  
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: { daysOut: 5, taskTiming: 'before', createTask: false }
  });
  
  const watchTaskList = watch('taskList');
  const watchSubject = watch('subject');
  const watchCreateTask = watch('createTask');

  const onSubmit = async (data) => {
    setSubmissionStatus('loading');
    
    const finalTaskList = data.taskList === 'Other' ? data.customTaskList : data.taskList;
    const finalSubject = data.subject === 'Other' ? data.customSubject : data.subject;
    const formattedTitle = `${finalTaskList}: ${finalSubject}`;

    const payload = { 
      university: data.university,
      type: data.type || 'Other',
      title: formattedTitle,
      notes: data.description, 
      dueDate: data.dueDate,
      createTask: data.createTask,
      daysOut: data.daysOut,
      taskTiming: data.taskTiming
    };
    
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = SCRIPT_URL;
    form.target = 'hidden_iframe';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = JSON.stringify(payload);
    form.appendChild(input);
    
    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      document.body.removeChild(iframe);
      document.body.removeChild(form);
      setSubmissionStatus('success');
      reset({ createTask: false, daysOut: 5, taskTiming: 'before' });
    }, 2000);
  };

  return (
    <div className="main-container">
      <style>{`
        body { font-family: sans-serif; background-color: #f8fafc; margin: 0; }
        .main-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .card { background: white; padding: 2.5rem; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); width: 100%; max-width: 40rem; border: 1px solid #e2e8f0; }
        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: flex; align-items: center; font-weight: 700; font-size: 0.8rem; margin-bottom: 0.5rem; text-transform: uppercase; color: #475569; }
        .form-input { width: 100%; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; box-sizing: border-box; font-size: 1rem; }
        .submit-button { width: 100%; background: #2563eb; color: white; padding: 1.125rem; border-radius: 0.5rem; border: none; font-weight: 800; cursor: pointer; font-size: 1.125rem; }
        .success-msg { background: #dcfce7; color: #166534; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem; text-align: center; font-weight: 600; }
      `}</style>

      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Homework Log</h1>
        {submissionStatus === 'success' && <div className="success-msg">✅ Logged Successfully!</div>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label"><School size={16} style={{marginRight: 8}}/> University</label>
            <select {...register('university', { required: true })} className="form-input">
              <option value="">Select University...</option>
              {universities.map(u => <option key={u.value} value={u.value}>{u.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label"><List size={16} style={{marginRight: 8}}/> Task Category</label>
            <select {...register('taskList', { required: true })} className="form-input">
              <option value="">Select Category...</option>
              <option value="Hw Due">Hw Due</option>
              <option value="Activity">Activity</option>
              <option value="Check Point">Check Point</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {watchTaskList === 'Other' && <input {...register('customTaskList', { required: true })} placeholder="Enter custom category..." className="form-input" style={{marginTop: -10, marginBottom: 15}} />}

          <div className="form-group">
            <label className="form-label"><Book size={16} style={{marginRight: 8}}/> Subject</label>
            <select {...register('subject', { required: true })} className="form-input">
              <option value="">Select Subject...</option>
              {subjects.map(s => <option key={s.value} value={s.value}>{s.name}</option>)}
            </select>
          </div>
          {watchSubject === 'Other' && <input {...register('customSubject', { required: true })} placeholder="Enter custom subject..." className="form-input" style={{marginTop: -10, marginBottom: 15}} />}

          <div className="form-group">
            <label className="form-label"><Calendar size={16} style={{marginRight: 8}}/> Due Date</label>
            <input type="date" {...register('dueDate', { required: true })} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label"><FileText size={16} style={{marginRight: 8}}/> Assignment Notes</label>
            <textarea {...register('description', { required: true })} className="form-input" rows="3" placeholder="These notes will be hidden in the description..." />
          </div>

          <button type="submit" className="submit-button" disabled={submissionStatus === 'loading'}>
            {submissionStatus === 'loading' ? 'COMMUNICATING...' : 'SUBMIT ASSIGNMENT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;