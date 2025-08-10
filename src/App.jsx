import React, { useState } from 'react';
import { Calendar, Book, Users, School } from 'lucide-react';
import { useForm } from 'react-hook-form';

const App = () => {
  // Use a placeholder for the Google Apps Script URL
  // REPLACE THIS WITH YOUR ACTUAL DEPLOYED SCRIPT URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwOqUav0nrJDa_--AuHC4aVOp7KfLvsjNjyQ8jKFAbg9D7QIBPfTgFfib-FD-r_JIrC/exec';

  // State to manage form submission status
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Data for dropdowns, customize these as needed!
  const universities = [
    { name: 'Kasetsart University', value: 'Kasetsart University' },
    { name: 'Nakornratchasima College', value: 'Nakornratchasima College' },
    // Add more universities here
  ];

  const subjects = [
    { name: 'Physical Education', value: 'Physical Education' },
    { name: 'Curriculum and Instruction', value: 'Curriculum and Instruction' },
    // Add more subjects here
  ];

  const assignmentTypes = [
    { name: 'Individual', value: 'Individual' },
    { name: 'Group', value: 'Group' },
    // You can add other types here, e.g., 'Presentation', 'Exam'
  ];
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    // Show loading state
    setSubmissionStatus('loading');
    
    // The fetch call is now active by default.
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        // The 'no-cors' mode is required for Google Apps Script to work correctly.
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Since we use 'no-cors', we can't check the response directly.
      // We'll assume success for now, as the script will log the data.
      setSubmissionStatus('success');
      reset(); // Reset the form on successful submission
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 antialiased">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-2">
          Homework Log
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Enter your assignment details to save them automatically.
        </p>

        {submissionStatus === 'success' && (
          <div className="mb-4 p-4 text-center text-lg font-semibold bg-green-100 text-green-700 rounded-lg border border-green-200">
            ✅ Homework submitted successfully!
          </div>
        )}
        {submissionStatus === 'error' && (
          <div className="mb-4 p-4 text-center text-lg font-semibold bg-red-100 text-red-700 rounded-lg border border-red-200">
            ❌ An error occurred. Please try again.
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* University Field (already a dropdown) */}
          <div className="relative">
            <label htmlFor="university" className="text-gray-700 font-medium flex items-center mb-1">
              <School className="w-5 h-5 text-gray-500 mr-2" /> University
            </label>
            <select
              id="university"
              {...register('university', { required: 'University is required' })}
              className="mt-1 block w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select a University...</option>
              {universities.map((uni) => (
                <option key={uni.value} value={uni.value}>{uni.name}</option>
              ))}
            </select>
            {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university.message}</p>}
          </div>

          {/* Subject Field (already a dropdown) */}
          <div className="relative">
            <label htmlFor="subject" className="text-gray-700 font-medium flex items-center mb-1">
              <Book className="w-5 h-5 text-gray-500 mr-2" /> Subject
            </label>
            <select
              id="subject"
              {...register('subject', { required: 'Subject is required' })}
              className="mt-1 block w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select a Subject...</option>
              {subjects.map((sub) => (
                <option key={sub.value} value={sub.value}>{sub.name}</option>
              ))}
            </select>
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
          </div>

          {/* Assignment Type (now a dropdown) */}
          <div className="relative">
            <label htmlFor="type" className="text-gray-700 font-medium flex items-center mb-1">
              <Users className="w-5 h-5 text-gray-500 mr-2" /> Assignment Type
            </label>
            <select
              id="type"
              {...register('type', { required: 'Assignment type is required' })}
              className="mt-1 block w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select an Assignment Type...</option>
              {assignmentTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.name}</option>
              ))}
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
          </div>

          {/* Due Date */}
          <div className="relative">
            <label htmlFor="dueDate" className="text-gray-700 font-medium flex items-center mb-1">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" /> Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              {...register('dueDate', { required: 'Due date is required' })}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
          </div>
          
          {/* Assignment Description */}
          <div className="relative">
            <label htmlFor="description" className="text-gray-700 font-medium flex items-center mb-1">
              <Book className="w-5 h-5 text-gray-500 mr-2" /> Assignment Name / Description
            </label>
            <textarea
              id="description"
              rows="4"
              {...register('description', { required: 'Description is required' })}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            disabled={submissionStatus === 'loading'}
          >
            {submissionStatus === 'loading' ? 'Submitting...' : 'Submit Assignment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
