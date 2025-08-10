import React, { useState } from 'react';
import { Calendar, Book, Users, School } from 'lucide-react';
import { useForm } from 'react-hook-form';

const App = () => {
  // Use a placeholder for the Google Apps Script URL
  // REPLACE THIS WITH YOUR ACTUAL DEPLOYED SCRIPT URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwOqUav0nrJDa_--AuHC4aVOp7KfLvsjNjyQ8jKFAbg9D7QIBPfTgFfib-FD-r_JIrC/exec';

  // State to manage form submission status
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Data for dropdowns, customized with your provided info!
  const universities = [
    { name: 'Kasetsart University', value: 'Kasetsart University' },
    { name: 'Nakornratchasima College', value: 'Nakornratchasima College' },
  ];

  const subjects = [
    { name: 'MED6101-Research', value: 'MED6101-Research' },
    { name: 'MED6102-Philosophy', value: 'MED6102-Philosophy' },
    { name: 'MED6103-Classroom', value: 'MED6103-Classroom' },
    { name: '01172524-Principle PE', value: '01172524-Principle PE' },
    { name: '01172592-Stat', value: '01172592-Stat' },
    { name: '01172544-Exercise Science', value: '01172544-Exercise Science' },
    { name: '01172533-Adv. Measure', value: '01172533-Adv. Measure' },
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
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setSubmissionStatus('loading');
    
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setSubmissionStatus('success');
      reset();
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <>
      <style>
        {`
          body {
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
            background-color: #f3f4f6;
          }
          .main-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }
          .card {
            background-color: #ffffff;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            width: 100%;
            max-width: 48rem;
            border: 1px solid #e5e7eb;
          }
          .title {
            font-size: 2.25rem;
            font-weight: 800;
            text-align: center;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }
          .subtitle {
            font-size: 1.125rem;
            text-align: center;
            color: #4b5563;
            margin-bottom: 2rem;
          }
          .message-box {
            margin-bottom: 1rem;
            padding: 1rem;
            text-align: center;
            font-size: 1.125rem;
            font-weight: 600;
            border-radius: 0.5rem;
            border: 1px solid transparent;
          }
          .success {
            background-color: #d1fae5;
            color: #065f46;
            border-color: #a7f3d0;
          }
          .error {
            background-color: #fee2e2;
            color: #991b1b;
            border-color: #fca5a5;
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          .form-label {
            color: #374151;
            font-weight: 500;
            display: flex;
            align-items: center;
            margin-bottom: 0.25rem;
          }
          .form-label svg {
            width: 1.25rem;
            height: 1.25rem;
            color: #6b7280;
            margin-right: 0.5rem;
          }
          .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.75rem;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            transition-property: all;
            transition-duration: 150ms;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          .form-input:focus {
            border-color: #3b82f6;
            outline: 2px solid transparent;
            outline-offset: 2px;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
          }
          .form-input.uppercase {
            text-transform: uppercase;
          }
          .error-message {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
          }
          .submit-button {
            width: 100%;
            background-color: #2563eb;
            color: #ffffff;
            font-weight: 700;
            padding: 0.75rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transition-property: all;
            transition-duration: 300ms;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transform: scale(1);
          }
          .submit-button:hover {
            background-color: #1d4ed8;
            transform: scale(1.02);
          }
          .submit-button[disabled] {
            opacity: 0.6;
            cursor: not-allowed;
            transform: scale(1);
          }
        `}
      </style>

      <div className="main-container">
        <div className="card">
          <h1 className="title">Homework Log</h1>
          <p className="subtitle">Enter your assignment details to save them automatically.</p>

          {submissionStatus === 'success' && (
            <div className="message-box success">
              ✅ Homework submitted successfully!
            </div>
          )}
          {submissionStatus === 'error' && (
            <div className="message-box error">
              ❌ An error occurred. Please try again.
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* University Field (already a dropdown) */}
            <div className="form-group">
              <label htmlFor="university" className="form-label">
                <School /> University
              </label>
              <select
                id="university"
                {...register('university', { required: 'University is required' })}
                className="form-input"
              >
                <option value="">Select a University...</option>
                {universities.map((uni) => (
                  <option key={uni.value} value={uni.value}>{uni.name}</option>
                ))}
              </select>
              {errors.university && <p className="error-message">{errors.university.message}</p>}
            </div>

            {/* Subject Field (already a dropdown) */}
            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                <Book /> Subject
              </label>
              <select
                id="subject"
                {...register('subject', { required: 'Subject is required' })}
                className="form-input"
              >
                <option value="">Select a Subject...</option>
                {subjects.map((sub) => (
                  <option key={sub.value} value={sub.value}>{sub.name}</option>
                ))}
              </select>
              {errors.subject && <p className="error-message">{errors.subject.message}</p>}
            </div>

            {/* Assignment Type (now a dropdown) */}
            <div className="form-group">
              <label htmlFor="type" className="form-label">
                <Users /> Assignment Type
              </label>
              <select
                id="type"
                {...register('type', { required: 'Assignment type is required' })}
                className="form-input"
              >
                <option value="">Select an Assignment Type...</option>
                {assignmentTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.name}</option>
                ))}
              </select>
              {errors.type && <p className="error-message">{errors.type.message}</p>}
            </div>

            {/* Due Date */}
            <div className="form-group">
              <label htmlFor="dueDate" className="form-label">
                <Calendar /> Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                {...register('dueDate', { required: 'Due date is required' })}
                className="form-input"
              />
              {errors.dueDate && <p className="error-message">{errors.dueDate.message}</p>}
            </div>
            
            {/* Assignment Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                <Book /> Assignment Name / Description
              </label>
              <textarea
                id="description"
                rows="4"
                {...register('description', { required: 'Description is required' })}
                className="form-input"
              ></textarea>
              {errors.description && <p className="error-message">{errors.description.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-button"
              disabled={submissionStatus === 'loading'}
            >
              {submissionStatus === 'loading' ? 'Submitting...' : 'Submit Assignment'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;
