'use client';

import { useState } from "react";

// Data Models for Mentee Profile
interface LearningGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number; // 0-100
}

interface SessionPreference {
  id: string;
  type: string; // e.g., "individual", "group", "workshop"
  isPreferred: boolean;
}

interface LearningStyle {
  id: string;
  name: string; // e.g., "visual", "auditory", "reading", "kinesthetic"
  isPreferred: boolean;
}

interface MentorshipArea {
  id: string;
  name: string;
}

interface Budget {
  minRate: number;
  maxRate: number;
  currency: string;
}

interface BookedSession {
  id: string;
  mentorName: string;
  mentorImage: string;
  date: string;
  time: string;
  type: string;
  status: "upcoming" | "completed" | "cancelled";
}

interface Stat {
  value: string;
  label: string;
}

export interface MenteeData {
  id: string;
  name: string;
  profileImage: string;
  location: string;
  bio: string[];
  stats: Stat[];
  learningGoals: LearningGoal[];
  mentorshipAreas: MentorshipArea[];
  sessionPreferences: SessionPreference[];
  learningStyles: LearningStyle[];
  budget: Budget;
  bookedSessions: BookedSession[];
}

// Sample data
const menteeData: MenteeData = {
  id: "mentee-123",
  name: "Jordan Chen",
  profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
  location: "Boston, MA",
  bio: [
    "Frontend developer passionate about building beautiful user interfaces. Currently working at a startup focused on education technology.",
    "Looking to expand my knowledge in backend development and architecture to become a more well-rounded full-stack developer."
  ],
  stats: [
    { value: "3", label: "Sessions Completed" },
    { value: "2", label: "Mentors" },
    { value: "5", label: "Goals Set" },
    { value: "8", label: "Months Membership" }
  ],
  learningGoals: [
    {
      id: "goal1",
      title: "Learn Node.js",
      description: "Build a RESTful API using Node.js, Express, and MongoDB",
      targetDate: "December 2023",
      progress: 60
    },
    {
      id: "goal2",
      title: "Master React Hooks",
      description: "Understand and implement advanced React hooks patterns",
      targetDate: "October 2023",
      progress: 80
    },
    {
      id: "goal3",
      title: "System Design Fundamentals",
      description: "Learn basic principles of designing scalable systems",
      targetDate: "February 2024",
      progress: 25
    }
  ],
  mentorshipAreas: [
    { id: "area1", name: "Frontend Development" },
    { id: "area2", name: "React.js" },
    { id: "area3", name: "JavaScript" },
    { id: "area4", name: "UI/UX Design" }
  ],
  sessionPreferences: [
    { id: "pref1", type: "Individual", isPreferred: true },
    { id: "pref2", type: "Group (3-5 people)", isPreferred: false },
    { id: "pref3", type: "Workshop", isPreferred: true },
    { id: "pref4", type: "Code Review", isPreferred: true }
  ],
  learningStyles: [
    { id: "style1", name: "Visual", isPreferred: true },
    { id: "style2", name: "Auditory", isPreferred: false },
    { id: "style3", name: "Reading/Writing", isPreferred: true },
    { id: "style4", name: "Kinesthetic (Hands-on)", isPreferred: true }
  ],
  budget: {
    minRate: 50,
    maxRate: 120,
    currency: "USD"
  },
  bookedSessions: [
    {
      id: "session1",
      mentorName: "Alex Richardson",
      mentorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3",
      date: "September 15, 2023",
      time: "10:00 AM",
      type: "Individual",
      status: "upcoming"
    },
    {
      id: "session2",
      mentorName: "Maria Rodriguez",
      mentorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3",
      date: "August 28, 2023",
      time: "2:30 PM",
      type: "Code Review",
      status: "completed"
    }
  ]
};

// We'll use inline SVGs instead of component functions

// -------------------- Profile Header Component --------------------
function ProfileHeader({ mentee }: { mentee: MenteeData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: mentee.name,
    location: mentee.location,
    profileImage: mentee.profileImage
  });

  const handleSave = () => {
    // In a real app, you would save the data to your API
    console.log("Saving profile data:", editData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="relative h-32 bg-[#16153A]">
        <div className="absolute -bottom-16 left-8">
          <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
            {isEditing ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                <input 
                  type="text"
                  value={editData.profileImage}
                  onChange={(e) => setEditData({...editData, profileImage: e.target.value})}
                  placeholder="Image URL"
                  className="w-full p-1 text-xs text-black"
                />
              </div>
            ) : (
              <img 
                src={mentee.profileImage} 
                alt={`${mentee.name} profile picture`} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <button 
          className="absolute top-4 right-4 bg-white bg-opacity-20 p-2 rounded-full text-white hover:bg-opacity-30 transition-all"
          onClick={() => setIsEditing(!isEditing)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      </div>
      
      <div className="pt-20 pb-6 px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                className="text-3xl font-bold text-[#16153A] border-b border-gray-300 focus:outline-none focus:border-[#00F5EE]"
              />
            ) : (
              <h1 className="text-3xl font-bold text-[#16153A]">{mentee.name}</h1>
            )}
            <div className="flex items-center mt-2 text-gray-600">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData({...editData, location: e.target.value})}
                  className="border-b border-gray-300 focus:outline-none focus:border-[#00F5EE]"
                />
              ) : (
                <span>{mentee.location}</span>
              )}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            {isEditing ? (
              <button 
                onClick={handleSave}
                className="bg-[#00F5EE] hover:bg-opacity-80 text-[#16153A] font-semibold px-4 py-2 rounded-md transition-all duration-300 flex items-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-1" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Save Changes
              </button>
            ) : (
              <button 
                className="bg-[#00F5EE] hover:bg-opacity-80 text-[#16153A] font-semibold px-4 py-2 rounded-md transition-all duration-300 flex items-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-1" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Share Profile
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-gray-200 pt-6">
          {mentee.stats.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="font-bold text-2xl text-[#16153A]">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------- Bio & Goals Component --------------------
function BioAndGoalsSection({ mentee }: { mentee: MenteeData }) {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(mentee.bio);

  const [goals, setGoals] = useState(mentee.learningGoals);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    id: "",
    title: "",
    description: "",
    targetDate: "",
    progress: 0
  });

  const handleSaveBio = () => {
    // In a real app, save the bio to your API
    console.log("Saving bio:", bio);
    setIsEditingBio(false);
  };

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.description && newGoal.targetDate) {
      const goalWithId = {
        ...newGoal,
        id: `goal-${Date.now()}`
      };
      setGoals([...goals, goalWithId]);
      setNewGoal({
        id: "",
        title: "",
        description: "",
        targetDate: "",
        progress: 0
      });
      setIsAddingGoal(false);
    }
  };

  const handleUpdateGoalProgress = (id: string, value: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, progress: value } : goal
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#16153A]">About Me</h2>
        <button 
          onClick={() => setIsEditingBio(!isEditingBio)}
          className="text-[#16153A] hover:text-[#00F5EE]"
        >
          {isEditingBio ? "Cancel" : "Edit"}
        </button>
      </div>
      
      {isEditingBio ? (
        <div className="mb-6">
          {bio.map((paragraph, index) => (
            <div key={index} className="mb-4">
              <textarea
                value={paragraph}
                onChange={(e) => {
                  const newBio = [...bio];
                  newBio[index] = e.target.value;
                  setBio(newBio);
                }}
                className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:border-[#00F5EE]"
              />
            </div>
          ))}
          <button
            onClick={handleSaveBio}
            className="bg-[#16153A] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          {bio.map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}
      
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#16153A]">Learning Goals</h3>
          <button 
            onClick={() => setIsAddingGoal(!isAddingGoal)}
            className="bg-[#00F5EE] hover:bg-opacity-80 text-[#16153A] px-3 py-1 rounded-md text-sm font-medium"
          >
            {isAddingGoal ? "Cancel" : "+ Add Goal"}
          </button>
        </div>
        
        {isAddingGoal && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Learn React Hooks"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Date</label>
                <input
                  type="text"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., December 2023"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                placeholder="Describe what you want to accomplish..."
              />
            </div>
            <button
              onClick={handleAddGoal}
              className="bg-[#16153A] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
            >
              Add Goal
            </button>
          </div>
        )}
        
        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg">{goal.title}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{goal.targetDate}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{goal.description}</p>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-500">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-[#00F5EE] rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => handleUpdateGoalProgress(goal.id, parseInt(e.target.value))}
                  className="w-full mt-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------- Preferences & Budget Component --------------------
function PreferencesSection({ mentee }: { mentee: MenteeData }) {
  const [mentorshipAreas, setMentorshipAreas] = useState(mentee.mentorshipAreas);
  const [sessionPrefs, setSessionPrefs] = useState(mentee.sessionPreferences);
  const [learningStyles, setLearningStyles] = useState(mentee.learningStyles);
  const [budget, setBudget] = useState(mentee.budget);
  
  const [newArea, setNewArea] = useState("");

  const handleAddArea = () => {
    if (newArea) {
      setMentorshipAreas([...mentorshipAreas, { id: `area-${Date.now()}`, name: newArea }]);
      setNewArea("");
    }
  };

  const handleRemoveArea = (id: string) => {
    setMentorshipAreas(mentorshipAreas.filter(area => area.id !== id));
  };

  const handleSessionPrefToggle = (id: string) => {
    setSessionPrefs(sessionPrefs.map(pref => 
      pref.id === id ? { ...pref, isPreferred: !pref.isPreferred } : pref
    ));
  };

  const handleLearningStyleToggle = (id: string) => {
    setLearningStyles(learningStyles.map(style => 
      style.id === id ? { ...style, isPreferred: !style.isPreferred } : style
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-semibold text-[#16153A] mb-6">Preferences</h2>
      
      <div className="space-y-8">
        {/* Mentorship Areas */}
        <div>
          <h3 className="text-lg font-semibold text-[#16153A] mb-3">Mentorship Areas</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {mentorshipAreas.map((area) => (
              <div 
                key={area.id} 
                className="px-3 py-1 bg-[#16153A] bg-opacity-10 text-[#16153A] rounded-full text-sm flex items-center"
              >
                {area.name}
                <button 
                  type="button"
                  className="ml-2 text-[#16153A] hover:text-red-500"
                  onClick={() => handleRemoveArea(area.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex">
            <input
              type="text"
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-[#00F5EE]"
              placeholder="Add a mentorship area..."
            />
            <button
              onClick={handleAddArea}
              className="bg-[#16153A] text-white px-4 py-2 rounded-r-md hover:bg-opacity-90"
            >
              Add
            </button>
          </div>
        </div>
        
        {/* Session Preferences */}
        <div>
          <h3 className="text-lg font-semibold text-[#16153A] mb-3">Session Preferences</h3>
          <div className="space-y-2">
            {sessionPrefs.map((pref) => (
              <div 
                key={pref.id} 
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <span>{pref.type}</span>
                <button
                  className={`w-12 h-6 rounded-full ${pref.isPreferred ? 'bg-[#00F5EE]' : 'bg-gray-300'} relative transition-colors duration-300`}
                  onClick={() => handleSessionPrefToggle(pref.id)}
                >
                  <span 
                    className={`absolute top-1 ${pref.isPreferred ? 'right-1' : 'left-1'} w-4 h-4 bg-white rounded-full transition-all duration-300`}
                  ></span>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Learning Styles */}
        <div>
          <h3 className="text-lg font-semibold text-[#16153A] mb-3">Learning Styles</h3>
          <div className="grid grid-cols-2 gap-4">
            {learningStyles.map((style) => (
              <div 
                key={style.id} 
                className={`p-3 border rounded-lg cursor-pointer ${
                  style.isPreferred ? 'border-[#00F5EE] bg-[#00F5EE] bg-opacity-5' : 'border-gray-200'
                }`}
                onClick={() => handleLearningStyleToggle(style.id)}
              >
                <div className="flex items-center justify-between">
                  <span>{style.name}</span>
                  {style.isPreferred && (
                    <div className="bg-[#00F5EE] rounded-full p-1 text-[#16153A]">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Budget Preferences */}
        <div>
          <h3 className="text-lg font-semibold text-[#16153A] mb-3">Budget Range</h3>
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Min Rate ($/hr)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input
                    type="number"
                    min="10"
                    max={budget.maxRate - 5}
                    value={budget.minRate}
                    onChange={(e) => setBudget({...budget, minRate: parseInt(e.target.value)})}
                    className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[#00F5EE] focus:border-[#00F5EE]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Max Rate ($/hr)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input
                    type="number"
                    min={budget.minRate + 5}
                    max="500"
                    value={budget.maxRate}
                    onChange={(e) => setBudget({...budget, maxRate: parseInt(e.target.value)})}
                    className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-[#00F5EE] focus:border-[#00F5EE]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-[#16153A]">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-1" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <span className="font-medium">Current Budget Range:</span>
            </div>
            <p className="text-gray-700 mt-1">
              ${budget.minRate} - ${budget.maxRate} per hour
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------- Upcoming Sessions Component --------------------
function UpcomingSessionsCard({ mentee }: { mentee: MenteeData }) {
  const upcomingSessions = mentee.bookedSessions.filter(session => session.status === "upcoming");
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-[#16153A] mb-4">Upcoming Sessions</h2>
      
      {upcomingSessions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No upcoming sessions scheduled</p>
          <button className="mt-4 bg-[#16153A] text-white px-4 py-2 rounded-md hover:bg-opacity-90">
            Find a Mentor
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={session.mentorImage} 
                    alt={session.mentorName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{session.mentorName}</h4>
                  <span className="text-sm text-gray-500">{session.type} Session</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-gray-700">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{session.date}</span>
                </div>
                <span className="font-medium">{session.time}</span>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-[#16153A] text-white py-2 rounded-md hover:bg-opacity-90">
                  Join
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50">
                  Reschedule
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={() => console.log("View all sessions clicked")}
            className="block w-full text-center text-[#16153A] hover:text-[#00F5EE] font-medium mt-4"
          >
            View All Sessions
          </button>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-[#16153A] bg-opacity-5 rounded-lg">
        <h3 className="font-semibold text-[#16153A] mb-2">Need Help?</h3>
        <p className="text-sm text-gray-700 mb-3">
          Our team can help you find the perfect mentor for your needs.
        </p>
        <button className="w-full bg-[#00F5EE] text-[#16153A] py-2 rounded-md font-medium hover:bg-opacity-80">
          Get Recommendations
        </button>
      </div>
    </div>
  );
}

// Main MenteeProfilePage component
export default function MenteeProfilePage() {
  // In a real app, you would fetch mentee data from your API
  const mentee = menteeData;
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <ProfileHeader mentee={mentee} />
        
        {/* Main Content - 2 column layout on large screens */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3 space-y-8">
            {/* Bio & Goals Section */}
            <BioAndGoalsSection mentee={mentee} />
            
            {/* Preferences Section */}
            <PreferencesSection mentee={mentee} />
          </div>
          
          {/* Sidebar Column */}
          <div className="w-full lg:w-1/3">
            {/* Upcoming Sessions Card */}
            <UpcomingSessionsCard mentee={mentee} />
          </div>
        </div>
      </div>
    </div>
  );
}