export const MONTHS_CONFIG = [
  { 
    id: 'oct', 
    name: 'October', 
    short: 'Oct',
    year: 2026, 
    range: 'Oct 19 - Oct 25',
    days: [
      { id: 'mon', label: 'Mon', full: 'Monday', dateNum: '19' },
      { id: 'tue', label: 'Tue', full: 'Tuesday', dateNum: '20' },
      { id: 'wed', label: 'Wed', full: 'Wednesday', dateNum: '21' },
      { id: 'thu', label: 'Thu', full: 'Thursday', dateNum: '22' },
      { id: 'fri', label: 'Fri', full: 'Friday', dateNum: '23' },
      { id: 'sat', label: 'Sat', full: 'Saturday', dateNum: '24' },
      { id: 'sun', label: 'Sun', full: 'Sunday', dateNum: '25' }
    ]
  },
  { 
    id: 'nov', 
    name: 'November', 
    short: 'Nov',
    year: 2026, 
    range: 'Nov 16 - Nov 22',
    days: [
      { id: 'mon', label: 'Mon', full: 'Monday', dateNum: '16' },
      { id: 'tue', label: 'Tue', full: 'Tuesday', dateNum: '17' },
      { id: 'wed', label: 'Wed', full: 'Wednesday', dateNum: '18' },
      { id: 'thu', label: 'Thu', full: 'Thursday', dateNum: '19' },
      { id: 'fri', label: 'Fri', full: 'Friday', dateNum: '20' },
      { id: 'sat', label: 'Sat', full: 'Saturday', dateNum: '21' },
      { id: 'sun', label: 'Sun', full: 'Sunday', dateNum: '22' }
    ]
  },
  { 
    id: 'dec', 
    name: 'December', 
    short: 'Dec',
    year: 2026, 
    range: 'Dec 14 - Dec 20',
    days: [
      { id: 'mon', label: 'Mon', full: 'Monday', dateNum: '14' },
      { id: 'tue', label: 'Tue', full: 'Tuesday', dateNum: '15' },
      { id: 'wed', label: 'Wed', full: 'Wednesday', dateNum: '16' },
      { id: 'thu', label: 'Thu', full: 'Thursday', dateNum: '17' },
      { id: 'fri', label: 'Fri', full: 'Friday', dateNum: '18' },
      { id: 'sat', label: 'Sat', full: 'Saturday', dateNum: '19' },
      { id: 'sun', label: 'Sun', full: 'Sunday', dateNum: '20' }
    ]
  },
  { 
    id: 'jan', 
    name: 'January', 
    short: 'Jan',
    year: 2027, 
    range: 'Jan 18 - Jan 24',
    days: [
      { id: 'mon', label: 'Mon', full: 'Monday', dateNum: '18' },
      { id: 'tue', label: 'Tue', full: 'Tuesday', dateNum: '19' },
      { id: 'wed', label: 'Wed', full: 'Wednesday', dateNum: '20' },
      { id: 'thu', label: 'Thu', full: 'Thursday', dateNum: '21' },
      { id: 'fri', label: 'Fri', full: 'Friday', dateNum: '22' },
      { id: 'sat', label: 'Sat', full: 'Saturday', dateNum: '23' },
      { id: 'sun', label: 'Sun', full: 'Sunday', dateNum: '24' }
    ]
  }
];

export const DAYS_OF_WEEK = MONTHS_CONFIG[0].days;

export const CATEGORIES = [
  { id: 'fitness', label: 'Fitness', icon: 'Flame', color: 'from-orange-500 to-amber-500' },
  { id: 'work', label: 'Focus Work', icon: 'Briefcase', color: 'from-blue-500 to-indigo-500' },
  { id: 'learning', label: 'Learning', icon: 'BookOpen', color: 'from-emerald-500 to-teal-500' },
  { id: 'health', label: 'Health', icon: 'Heart', color: 'from-rose-500 to-pink-500' },
  { id: 'mind', label: 'Mindset', icon: 'Brain', color: 'from-purple-500 to-violet-500' },
];

export const INITIAL_TASKS = {
  mon: [
    { id: 'mon-1', title: 'Morning 5km interval run', category: 'fitness', completed: true, time: '07:00 AM' },
    { id: 'mon-2', title: 'Sprint planning & backlog grooming', category: 'work', completed: true, time: '10:00 AM' },
    { id: 'mon-3', title: 'Read 20 pages of System Design', category: 'learning', completed: false, time: '02:00 PM' },
    { id: 'mon-4', title: 'Hydration goal: 2.5L water', category: 'health', completed: false, time: '08:00 PM' }
  ],
  tue: [
    { id: 'tue-1', title: 'High-intensity gym workout', category: 'fitness', completed: true, time: '07:30 AM' },
    { id: 'tue-2', title: 'Architecture refactor code review', category: 'work', completed: true, time: '11:30 AM' },
    { id: 'tue-3', title: 'Practice 30 mins language lessons', category: 'learning', completed: true, time: '05:00 PM' },
    { id: 'tue-4', title: 'Evening meditation & breathwork', category: 'mind', completed: false, time: '09:30 PM' }
  ],
  wed: [
    { id: 'wed-1', title: 'Core & mobility routine', category: 'fitness', completed: false, time: '07:15 AM' },
    { id: 'wed-2', title: 'UX prototype review with stakeholders', category: 'work', completed: false, time: '02:00 PM' },
    { id: 'wed-3', title: 'Deep dive into distributed state', category: 'learning', completed: false, time: '04:30 PM' },
    { id: 'wed-4', title: 'Zero sugar intake after 7 PM', category: 'health', completed: false, time: '07:00 PM' }
  ],
  thu: [
    { id: 'thu-1', title: 'Cardio HIIT treadmill intervals', category: 'fitness', completed: false, time: '07:00 AM' },
    { id: 'thu-2', title: 'Deploy microservices to staging', category: 'work', completed: false, time: '01:00 PM' },
    { id: 'thu-3', title: 'Read paper on LLM agents', category: 'learning', completed: false, time: '06:00 PM' },
    { id: 'thu-4', title: 'Cold plunge recovery protocol', category: 'health', completed: false, time: '08:30 PM' }
  ],
  fri: [
    { id: 'fri-1', title: 'Full body strength lifting', category: 'fitness', completed: false, time: '07:00 AM' },
    { id: 'fri-2', title: 'Weekly sprint retrospective', category: 'work', completed: false, time: '03:00 PM' },
    { id: 'fri-3', title: 'Zero inbox & week-end report', category: 'work', completed: false, time: '05:30 PM' },
    { id: 'fri-4', title: 'Gratitude journal & reflection', category: 'mind', completed: false, time: '09:00 PM' }
  ],
  sat: [
    { id: 'sat-1', title: 'Long outdoor trail running / hike', category: 'fitness', completed: false, time: '08:00 AM' },
    { id: 'sat-2', title: 'Build interactive side project MVP', category: 'learning', completed: false, time: '01:00 PM' },
    { id: 'sat-3', title: 'Cook balanced organic dinner', category: 'health', completed: false, time: '06:30 PM' },
    { id: 'sat-4', title: 'Read fiction book for 45 mins', category: 'mind', completed: false, time: '09:30 PM' }
  ],
  sun: [
    { id: 'sun-1', title: 'Active yoga & deep foam rolling', category: 'fitness', completed: false, time: '09:00 AM' },
    { id: 'sun-2', title: 'Weekly goals & calendar roadmap', category: 'work', completed: false, time: '11:30 AM' },
    { id: 'sun-3', title: 'Nutrition meal prep for the week', category: 'health', completed: false, time: '03:00 PM' },
    { id: 'sun-4', title: 'Digital detox after 8 PM', category: 'mind', completed: false, time: '08:00 PM' }
  ]
};
