import { useState } from 'react';

export default function ReportWriter() {
  const [reportData, setReportData] = useState({
    student: '',
    grade: '',
    dateOfBirth: '',
    age: '',
    school: '',
    gender: '',
    parentGuardian: '',
    evaluationType: 'Initial Evaluation',
    reportDate: new Date().toLocaleDateString(),
    examiner: 'Lacy Herbert, Ed.S. School Psychologist',
    reasonForReferral: '',
    backgroundHistory: '',
    transitionPlanning: '',
    previousResults: '',
    observations: '',
    currentResults: '',
    otherEvaluations: ''
  });

  const handleInputChange = (field, value) => {
    setReportData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateReport = () => {
    alert('Report generated! (Integration with print/PDF coming soon)');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Report Writer</h1>
          <button 
            onClick={generateReport}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Full Report
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold">MULTIDISCIPLINARY EVALUATION TEAM (MET) REPORT</h2>
            <p className="text-lg font-bold mt-2">CONFIDENTIAL</p>
          </div>

          {/* Student Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">STUDENT:</label>
              <input
                type="text"
                value={reportData.student}
                onChange={(e) => handleInputChange('student', e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GRADE:</label>
              <input
                type="text"
                value={reportData.grade}
                onChange={(e) => handleInputChange('grade', e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">DATE OF BIRTH:</label>
              <input
                type="date"
                value={reportData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">AGE:</label>
              <input
                type="text"
                value={reportData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">SCHOOL:</label>
              <input
                type="text"
                value={reportData.school}
                onChange={(e) => handleInputChange('school', e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GENDER:</label>
              <select
                value={reportData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">PARENT/GUARDIAN:</label>
              <input
                type="text"
                value={reportData.parentGuardian}
                onChange={(e) => handleInputChange('parentGuardian', e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">EVALUATION TYPE:</label>
              <select
                value={reportData.evaluationType}
                onChange={(e) => handleInputChange('evaluationType', e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="Initial Evaluation">Initial Evaluation</option>
                <option value="Re-evaluation">Re-evaluation</option>
                <option value="Annual Review">Annual Review</option>
              </select>
            </div>
          </div>

          {/* Report Sections */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-3">REASON FOR REFERRAL</h3>
              <textarea
                value={reportData.reasonForReferral}
                onChange={(e) => handleInputChange('reasonForReferral', e.target.value)}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="[Reason for Referral content will appear here when completed]"
              />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">BACKGROUND, MEDICAL & DEVELOPMENTAL HISTORY</h3>
              <textarea
                value={reportData.backgroundHistory}
                onChange={(e) => handleInputChange('backgroundHistory', e.target.value)}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="[Background, Medical & Developmental History content will appear here when completed]"
              />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">TRANSITION PLANNING</h3>
              <textarea
                value={reportData.transitionPlanning}
                onChange={(e) => handleInputChange('transitionPlanning', e.target.value)}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="[Transition Planning content will appear here when completed]"
              />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">PREVIOUS EVALUATION RESULTS</h3>
              <textarea
                value={reportData.previousResults}
                onChange={(e) => handleInputChange('previousResults', e.target.value)}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="[Previous Evaluation Results content will appear here when completed]"
              />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">OBSERVATIONS & STRENGTHS</h3>
              <textarea
                value={reportData.observations}
                onChange={(e) => handleInputChange('observations', e.target.value)}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="[Observations & Strengths content will appear here when completed]"
              />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">CURRENT ASSESSMENT RESULTS</h3>
              <textarea
                value={reportData.currentResults}
                onChange={(e) => handleInputChange('currentResults', e.target.value)}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="[Current Assessment Results content will appear here when completed]"
              />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">OTHER SPECIALTY EVALUATIONS</h3>
              <textarea
                value={reportData.otherEvaluations}
                onChange={(e) => handleInputChange('otherEvaluations', e.target.value)}
                className="w-full border rounded px-3 py-2 h-24"
                placeholder="[Other Specialty Evaluations content will appear here when completed]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}