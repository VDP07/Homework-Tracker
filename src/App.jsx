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
        body { font-family: ui-sans-serif, system-ui, sans-serif; background-color: #f1f5f9; margin: 0; }
        .main-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; }
        .card { background: white; padding: 2.5rem; border-radius: 1.25rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); width: 100%; max-width: 42rem; border: 1px solid #e2e8f0; }
        
        /* RESTORED TITLE STYLES */
        .title { font-size: 2.25rem; font-weight: 900; text-align: center; color: #0f172a; margin-bottom: 0.5rem; letter-spacing: -0.025em; }
        .subtitle { font-size: 1.125rem; text-align: center; color: #64748b; margin-bottom: 2.5rem; }
        
        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: flex; align-items: center; font-weight: 700; font-size: 0.85rem; margin-bottom: 0.5rem; text-transform: uppercase; color: #475569; letter-spacing: 0.025em; }
        .form-label svg { width: 1.125rem; height: 1.125rem; color: #3b82f6; margin-right: 0.6rem; }
        .form-input { width: 100%; padding: 0.85rem; border: 1px solid #cbd5e1; border-radius: 0.75rem; box-sizing: border-box; font-size: 1rem; background-color: #ffffff; color: #1e293b; transition: all 0.2s; }
        .form-input:focus { border-color: #3b82f6; outline: none; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
        
        .checkbox-container { display: flex; align-items: center; padding: 1.25rem; background-color: #eff6ff; border-radius: 1rem; border: 1px solid #dbeafe; margin-bottom: 1.5rem; cursor: pointer; transition: background 0.2s; }
        .checkbox-container:hover { background-color: #dbeafe; }
        .checkbox-input { width: 1.25rem; height: 1.25rem; margin-right: 0.75rem; cursor: pointer; accent-color: #2563eb; }
        
        .submit-button { width: 100%; background: #2563eb; color: white; padding: 1.125rem; border-radius: 0.75rem; border: none; font-weight: 800; cursor: pointer; font-size: 1.125rem; text-transform: uppercase; transition: all 0.2s; }
        .submit-button:hover { background-color: #1d4ed8; transform: translateY(-1px); }
        .submit-button:disabled { opacity: 0.7; cursor: not-allowed; }
        
        .success-msg { background: #dcfce7; color: #166534; padding: 1.25rem; border-radius: 0.75rem; margin-bottom: 2rem; text-align: center; font-weight: 700; border: 1px solid #bbf7d0; }
        .custom-field-area { background-color: #f8fafc; padding: 1.25rem; border-radius: 0.75rem; border: 1px dashed #3b82f6; margin-top: -0.75rem; margin-bottom: 1.5rem; }
      `}</style>

      <div className="card">
        {/* RESTORED HEADER */}
        <h1 className="title">Homework Log</h1>
        <p className="subtitle">Syncing assignments with your schedule.</p>

        {submissionStatus === 'success' && <div className="success-msg">✨ Successfully Logged!</div>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label"><School /> University</label>
            <select {...register('university', { required: true })} className="form-input">
              <option value="">Select University...</option>
              {universities.map(u => <option key={u.value} value={u.value}>{u.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label"><List /> Task Category</label>
            <select {...register('taskList', { required: true })} className="form-input">
              <option value="">Select Category...</option>
              <option value="Hw Due">Hw Due</option>
              <option value="Activity">Activity</option>
              <option value="Check Point">Check Point</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {watchTaskList === 'Other' && (
            <div className="custom-field-area">
              <input {...register('customTaskList', { required: true })} placeholder="Type custom category..." className="form-input" />
            </div>
          )}

          <div className="form-group">
            <label className="form-label"><Book /> Subject</label>
            <select {...register('subject', { required: true })} className="form-input">
              <option value="">Select Subject...</option>
              {subjects.map(s => <option key={s.value} value={s.value}>{s.name}</option>)}
            </select>
          </div>
          {watchSubject === 'Other' && (
            <div className="custom-field-area">
              <input {...register('customSubject', { required: true })} placeholder="Type custom subject..." className="form-input" />
            </div>
          )}

          <div className="form-group">
            <label className="form-label"><Calendar /> Due Date</label>
            <input type="date" {...register('dueDate', { required: true })} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label"><FileText /> Assignment Notes</label>
            <textarea {...register('description', { required: true })} className="form-input" rows="3" placeholder="Additional details..." />
          </div>

          {/* TASK REMINDER SECTION */}
          <label className="checkbox-container">
            <input type="checkbox" {...register('createTask')} className="checkbox-input" />
            <div style={{ color: '#1e40af', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
              <CheckSquare size={18} style={{ marginRight: '0.6rem' }} /> 
              ACTIVATE PREPARATION REMINDER?
            </div>
          </label>

          {watchCreateTask && (
            <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ flex: 1 }}>
                <label className="form-label"><Clock /> Days</label>
                <input type="number" {...register('daysOut')} className="form-input" placeholder="Lead days" />
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label">Sequence</label>
                <select {...register('taskTiming')} className="form-input">
                  <option value="before">BEFORE</option>
                  <option value="after">AFTER</option>
                </select>
              </div>
            </div>
          )}

          <button type="submit" className="submit-button" disabled={submissionStatus === 'loading'}>
            {submissionStatus === 'loading' ? 'SUBMITTING...' : 'Submit Assignment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;