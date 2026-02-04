import "./App.css";
import { useState } from "react";

// ============================================================
// MAIN APP COMPONENT
// ============================================================
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authView, setAuthView] = useState("login"); // "login" or "register"

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setAuthView("login");
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return authView === "login" ? (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthView("register")}
      />
    ) : (
      <RegisterPage
        onRegister={handleRegister}
        onSwitchToLogin={() => setAuthView("login")}
      />
    );
  }

  return <MainApp user={currentUser} onLogout={handleLogout} />;
}

// ============================================================
// LOGIN PAGE FLOW
// ============================================================
function LoginPage({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({ email, name: email.split("@")[0] });
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-subtle">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-[#121f3e]">Study Pod</h1>
            <p className="mt-2 text-sm text-gray-500">
              Welcome back! Sign in to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#121f3e] focus:ring-[#121f3e]"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-xs text-[#121f3e] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#121f3e] py-2.5 text-sm font-medium text-white transition hover:bg-[#1a2d54] disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              onClick={onSwitchToRegister}
              className="font-medium text-[#121f3e] hover:underline"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// REGISTER PAGE FLOW
// ============================================================
function RegisterPage({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onRegister({ email, name: username });
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-subtle">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-[#121f3e]">Study Pod</h1>
            <p className="mt-2 text-sm text-gray-500">
              Create your account to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#121f3e] py-2.5 text-sm font-medium text-white transition hover:bg-[#1a2d54] disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="font-medium text-[#121f3e] hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP (AFTER AUTHENTICATION)
// ============================================================
const VIEWS = {
  DASHBOARD: "dashboard",
  SUBJECTS: "subjects",
  ASSIGNMENTS: "assignments",
  TIMER: "timer",
};

function MainApp({ user, onLogout }) {
  const [activeView, setActiveView] = useState(VIEWS.DASHBOARD);

  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", color: "#3b82f6" },
    { id: 2, name: "Computer Science", color: "#22c55e" },
    { id: 3, name: "English", color: "#f59e0b" },
  ]);

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Project report draft",
      subjectId: 2,
      deadline: "2026-02-04",
      priority: "High",
      status: "In progress",
      description: "Write the first draft of the project report",
      tasks: [
        { id: 1, title: "Outline sections", completed: true },
        { id: 2, title: "Collect references", completed: true },
        { id: 3, title: "Draft introduction", completed: false },
        { id: 4, title: "Write methodology", completed: false },
        { id: 5, title: "Create diagrams", completed: false },
      ],
    },
    {
      id: 2,
      title: "Reading quiz",
      subjectId: 3,
      deadline: "2026-02-07",
      priority: "Medium",
      status: "Not started",
      description: "Prepare for the reading comprehension quiz",
      tasks: [
        { id: 1, title: "Read chapters 5-7", completed: false },
        { id: 2, title: "Take notes on themes", completed: false },
        { id: 3, title: "Review vocabulary", completed: false },
      ],
    },
    {
      id: 3,
      title: "Problem set 4",
      subjectId: 1,
      deadline: "2026-02-02",
      priority: "High",
      status: "Due soon",
      description: "Complete all calculus problems",
      tasks: [
        { id: 1, title: "Complete problems 1-5", completed: true },
        { id: 2, title: "Complete problems 6-10", completed: false },
        { id: 3, title: "Review solutions", completed: false },
      ],
    },
  ]);

  const getSubjectName = (subjectId) => {
    const subject = subjects.find((s) => s.id === subjectId);
    return subject ? subject.name : "Unknown";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-6xl gap-6 px-4 py-6">
        {/* Sidebar */}
        <aside className="sticky top-6 flex h-[calc(100vh-3rem)] w-56 flex-col justify-between rounded-2xl bg-white p-5 shadow-card">
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-semibold text-[#121f3e]">
                Study Pod
              </h1>
              <p className="mt-1 text-xs text-gray-500">
                Welcome, {user?.name || "User"}
              </p>
            </div>

            <nav className="space-y-1">
              {[
                { id: VIEWS.DASHBOARD, label: "Dashboard" },
                { id: VIEWS.SUBJECTS, label: "Subjects" },
                { id: VIEWS.ASSIGNMENTS, label: "Assignments" },
                { id: VIEWS.TIMER, label: "Pomodoro Timer" },
              ].map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveView(item.id)}
                    className={[
                      "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
                      isActive
                        ? "bg-[#121f3e] text-white"
                        : "text-gray-600 hover:bg-gray-100",
                    ].join(" ")}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <p className="text-xs font-medium text-gray-700">
                Today&apos;s tip
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Focus on 3-5 important tasks to maximize productivity.
              </p>
            </div>
            <button
              onClick={onLogout}
              className="flex w-full items-center justify-center rounded-xl border border-gray-200 px-3 py-2 text-xs text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {activeView === VIEWS.DASHBOARD && (
            <DashboardView
              assignments={assignments}
              subjects={subjects}
              getSubjectName={getSubjectName}
              onNavigateToTimer={() => setActiveView(VIEWS.TIMER)}
            />
          )}
          {activeView === VIEWS.SUBJECTS && (
            <SubjectsView subjects={subjects} setSubjects={setSubjects} />
          )}
          {activeView === VIEWS.ASSIGNMENTS && (
            <AssignmentsView
              assignments={assignments}
              setAssignments={setAssignments}
              subjects={subjects}
              getSubjectName={getSubjectName}
            />
          )}
          {activeView === VIEWS.TIMER && <TimerView />}
        </main>
      </div>
    </div>
  );
}

// ============================================================
// SHARED COMPONENTS
// ============================================================
function Card({ title, description, children, className = "", actions }) {
  return (
    <section
      className={["rounded-2xl bg-white p-5 shadow-card", className].join(" ")}
    >
      <header className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-[#121f3e]">{title}</h2>
          {description && (
            <p className="mt-0.5 text-xs text-gray-500">{description}</p>
          )}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </header>
      <div>{children}</div>
    </section>
  );
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#121f3e]">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-[#121f3e]">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD VIEW
// ============================================================
function DashboardView({
  assignments,
  subjects,
  getSubjectName,
  onNavigateToTimer,
}) {
  const [barChartPeriod, setBarChartPeriod] = useState("weekly");
  const [pieChartPeriod, setPieChartPeriod] = useState("weekly");

  // Calculate totals
  const totalTasks = assignments.reduce((acc, a) => acc + a.tasks.length, 0);
  const completedTasks = assignments.reduce(
    (acc, a) => acc + a.tasks.filter((t) => t.completed).length,
    0
  );
  const progressPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Tasks by subject for pie chart
  const tasksBySubject = subjects.map((subject) => {
    const subjectAssignments = assignments.filter(
      (a) => a.subjectId === subject.id
    );
    const total = subjectAssignments.reduce(
      (acc, a) => acc + a.tasks.length,
      0
    );
    const completed = subjectAssignments.reduce(
      (acc, a) => acc + a.tasks.filter((t) => t.completed).length,
      0
    );
    return { ...subject, total, completed };
  });

  // Calculate subject percentages for pie chart
  const totalSubjectTasks = tasksBySubject.reduce(
    (acc, s) => acc + s.completed,
    0
  );
  const subjectPercentages = tasksBySubject.map((s) => ({
    ...s,
    percentage:
      totalSubjectTasks > 0
        ? Math.round((s.completed / totalSubjectTasks) * 100)
        : 0,
  }));

  // Mock data for weekly/monthly bar charts
  const weeklyBarData = [
    { label: "Mon", completed: 3, total: 5 },
    { label: "Tue", completed: 4, total: 6 },
    { label: "Wed", completed: 2, total: 4 },
    { label: "Thu", completed: 5, total: 5 },
    { label: "Fri", completed: 3, total: 7 },
    { label: "Sat", completed: 1, total: 2 },
    { label: "Sun", completed: 0, total: 1 },
  ];

  const monthlyBarData = [
    { label: "Week 1", completed: 12, total: 20 },
    { label: "Week 2", completed: 18, total: 25 },
    { label: "Week 3", completed: 15, total: 22 },
    { label: "Week 4", completed: 8, total: 15 },
  ];

  const barChartData =
    barChartPeriod === "weekly" ? weeklyBarData : monthlyBarData;
  const maxBarValue = Math.max(...barChartData.map((d) => d.total), 1);

  // Get daily tasks
  const dailyTasks = assignments
    .flatMap((a) =>
      a.tasks.map((t) => ({
        ...t,
        assignmentTitle: a.title,
        subject: getSubjectName(a.subjectId),
        priority: a.priority,
        assignmentId: a.id,
      }))
    )
    .filter((t) => !t.completed)
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Overview
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-[#121f3e]">
          Dashboard
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Daily To-Do List */}
        <div className="lg:col-span-8 flex flex-col rounded-2xl bg-white p-5 shadow-card">
          <header className="mb-4">
            <h2 className="text-sm font-semibold text-[#121f3e]">
              Daily To-Do
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Today's tasks to complete.
            </p>
          </header>

          <div className="flex-1">
            <div className="grid gap-2 sm:grid-cols-2">
              {dailyTasks.length === 0 ? (
                <p className="col-span-2 py-6 text-center text-sm text-gray-400">
                  All tasks completed! Great job!
                </p>
              ) : (
                dailyTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-[#121f3e] focus:ring-[#121f3e]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#121f3e] truncate">
                        {task.title}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {task.subject}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Productivity Tip */}
          <div className="mt-auto pt-4">
            <div className="flex items-center gap-3 rounded-xl bg-amber-50 px-4 py-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100">
                <svg
                  className="h-4 w-4 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-amber-800">
                  {dailyTasks.length >= 6
                    ? `Focus on 3-5 important tasks to maximize productivity.`
                    : (() => {
                        const tips = [
                          "Start with your hardest task when your energy is highest.",
                          "Break large tasks into smaller subtasks for better progress.",
                          "Use the Pomodoro timer: 25 min focus, 5 min break.",
                          "Review and plan tomorrow's tasks before ending your day.",
                          "Group similar tasks together to maintain focus.",
                          "Set realistic deadlines to reduce stress and improve quality.",
                          "Take short breaks between tasks to recharge your focus.",
                        ];
                        return tips[new Date().getDay() % tips.length];
                      })()}
                </p>
                <p className="text-[10px] text-amber-600/70 mt-0.5">
                  Productivity tip
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timer Link + Progress */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Pomodoro Timer Link */}
          <button
            onClick={onNavigateToTimer}
            className="flex items-center gap-4 rounded-2xl bg-[#121f3e] p-5 text-left text-white shadow-card transition hover:bg-[#1a2d54]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold">Pomodoro Timer</p>
              <p className="text-xs text-white/70">Start a focus session</p>
            </div>
            <svg
              className="ml-auto h-5 w-5 text-white/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Progress Loader */}
          <div className="flex-1 flex flex-col rounded-2xl bg-white p-5 shadow-card">
            <header className="mb-4">
              <h2 className="text-sm font-semibold text-[#121f3e]">Progress</h2>
              <p className="mt-0.5 text-xs text-gray-500">Completed tasks.</p>
            </header>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <svg className="h-24 w-24 -rotate-90 transform">
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="#121f3e"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${progressPercent * 2.64} 264`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold text-[#121f3e]">
                    {progressPercent}%
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-[#121f3e]">
                    {completedTasks}
                  </span>
                  <span className="text-[10px] text-gray-400">Done</span>
                </div>
                <div className="h-6 w-px bg-gray-200" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-400">
                    {totalTasks - completedTasks}
                  </span>
                  <span className="text-[10px] text-gray-400">Left</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart - Weekly/Monthly Progress */}
        <Card
          title="Task Progress"
          description="Completed vs total tasks."
          className="lg:col-span-7"
          actions={
            <div className="flex rounded-lg border border-gray-200 p-0.5">
              <button
                onClick={() => setBarChartPeriod("weekly")}
                className={[
                  "rounded-md px-3 py-1 text-[10px] font-medium transition",
                  barChartPeriod === "weekly"
                    ? "bg-[#121f3e] text-white"
                    : "text-gray-500 hover:text-gray-700",
                ].join(" ")}
              >
                Weekly
              </button>
              <button
                onClick={() => setBarChartPeriod("monthly")}
                className={[
                  "rounded-md px-3 py-1 text-[10px] font-medium transition",
                  barChartPeriod === "monthly"
                    ? "bg-[#121f3e] text-white"
                    : "text-gray-500 hover:text-gray-700",
                ].join(" ")}
              >
                Monthly
              </button>
            </div>
          }
        >
          <div className="pt-2">
            <div className="flex items-end justify-between gap-3 h-36">
              {barChartData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div className="relative flex h-28 w-full flex-col justify-end">
                    <div
                      className="w-full rounded-t bg-gray-100 transition-all duration-300"
                      style={{ height: `${(item.total / maxBarValue) * 100}%` }}
                    />
                    <div
                      className="absolute bottom-0 w-full rounded-t bg-[#121f3e] transition-all duration-300"
                      style={{
                        height: `${(item.completed / maxBarValue) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded bg-[#121f3e]" />
                <span className="text-[11px] text-gray-500">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded bg-gray-200" />
                <span className="text-[11px] text-gray-500">Total</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Pie Chart - Tasks by Subject */}
        <Card
          title="By Subject"
          description="Task distribution."
          className="lg:col-span-5"
          actions={
            <div className="flex rounded-lg border border-gray-200 p-0.5">
              <button
                onClick={() => setPieChartPeriod("weekly")}
                className={[
                  "rounded-md px-3 py-1 text-[10px] font-medium transition",
                  pieChartPeriod === "weekly"
                    ? "bg-[#121f3e] text-white"
                    : "text-gray-500 hover:text-gray-700",
                ].join(" ")}
              >
                Weekly
              </button>
              <button
                onClick={() => setPieChartPeriod("monthly")}
                className={[
                  "rounded-md px-3 py-1 text-[10px] font-medium transition",
                  pieChartPeriod === "monthly"
                    ? "bg-[#121f3e] text-white"
                    : "text-gray-500 hover:text-gray-700",
                ].join(" ")}
              >
                Monthly
              </button>
            </div>
          }
        >
          <div className="flex items-center gap-5 py-2">
            <div className="relative h-28 w-28 flex-shrink-0">
              <svg
                viewBox="0 0 100 100"
                className="h-28 w-28 -rotate-90 transform"
              >
                {(() => {
                  let cumulativePercent = 0;
                  return subjectPercentages.map((subject) => {
                    const percent = subject.percentage;
                    const dashArray = `${percent * 3.14} 314`;
                    const dashOffset = -cumulativePercent * 3.14;
                    cumulativePercent += percent;
                    return (
                      <circle
                        key={subject.id}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={subject.color}
                        strokeWidth="20"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                      />
                    );
                  });
                })()}
                {totalSubjectTasks === 0 && (
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="20"
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-base font-bold text-[#121f3e]">
                  {totalSubjectTasks}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              {subjectPercentages.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="text-xs text-gray-600">
                      {subject.name}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    {subject.percentage}%
                  </span>
                </div>
              ))}
              {subjects.length === 0 && (
                <p className="text-xs text-gray-400">No subjects yet.</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// SUBJECTS VIEW
// ============================================================
function SubjectsView({ subjects, setSubjects }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [formData, setFormData] = useState({ name: "", color: "#3b82f6" });

  const colors = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
  ];

  const handleAdd = () => {
    setFormData({ name: "", color: "#3b82f6" });
    setIsAddModalOpen(true);
  };

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setFormData({ name: subject.name, color: subject.color });
    setIsEditModalOpen(true);
  };

  const handleDelete = (subject) => {
    setSelectedSubject(subject);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveAdd = () => {
    if (!formData.name.trim()) return;
    setSubjects([...subjects, { id: Date.now(), ...formData }]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    if (!formData.name.trim()) return;
    setSubjects(
      subjects.map((s) =>
        s.id === selectedSubject.id ? { ...s, ...formData } : s
      )
    );
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setSubjects(subjects.filter((s) => s.id !== selectedSubject.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Subjects
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#121f3e]">
            Manage Subjects
          </h1>
        </div>
        <button
          onClick={handleAdd}
          className="rounded-xl bg-[#121f3e] px-4 py-2 text-xs font-medium text-white hover:bg-[#1a2d54]"
        >
          + Add Subject
        </button>
      </header>

      <Card
        title="All Subjects"
        description="View, edit, or delete your subjects."
      >
        <div className="space-y-2">
          {subjects.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              No subjects yet. Add your first subject to get started.
            </p>
          ) : (
            subjects.map((subject) => (
              <div
                key={subject.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {subject.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(subject)}
                    className="rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subject)}
                    className="rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-200 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Add Subject Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Subject"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-600">
              Subject name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Mathematics"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-600">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData({ ...formData, color })}
                  className={[
                    "h-8 w-8 rounded-full transition",
                    formData.color === color
                      ? "ring-2 ring-[#121f3e] ring-offset-2"
                      : "",
                  ].join(" ")}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAdd}
              className="rounded-xl bg-[#121f3e] px-4 py-2 text-xs font-medium text-white hover:bg-[#1a2d54]"
            >
              Add Subject
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Subject Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Subject"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-600">
              Subject name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-600">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData({ ...formData, color })}
                  className={[
                    "h-8 w-8 rounded-full transition",
                    formData.color === color
                      ? "ring-2 ring-[#121f3e] ring-offset-2"
                      : "",
                  ].join(" ")}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="rounded-xl bg-[#121f3e] px-4 py-2 text-xs font-medium text-white hover:bg-[#1a2d54]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Subject"
        message={`Are you sure you want to delete "${selectedSubject?.name}"?`}
      />
    </div>
  );
}

// ============================================================
// ASSIGNMENTS VIEW
// ============================================================
function AssignmentsView({
  assignments,
  setAssignments,
  subjects,
  getSubjectName,
}) {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1));

  const [formData, setFormData] = useState({
    title: "",
    subjectId: "",
    deadline: "",
    priority: "Medium",
    description: "",
  });

  const filteredAssignments = assignments
    .filter((a) => filter === "all" || a.priority.toLowerCase() === filter)
    .sort((a, b) => {
      if (sortBy === "deadline")
        return new Date(a.deadline) - new Date(b.deadline);
      if (sortBy === "priority") {
        const order = { High: 0, Medium: 1, Low: 2 };
        return order[a.priority] - order[b.priority];
      }
      return a.title.localeCompare(b.title);
    });

  const handleAdd = () => {
    setFormData({
      title: "",
      subjectId: subjects[0]?.id || "",
      deadline: "",
      priority: "Medium",
      description: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      title: assignment.title,
      subjectId: assignment.subjectId,
      deadline: assignment.deadline,
      priority: assignment.priority,
      description: assignment.description,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (assignment) => {
    setSelectedAssignment(assignment);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveAdd = () => {
    if (!formData.title.trim() || !formData.subjectId || !formData.deadline)
      return;
    setAssignments([
      ...assignments,
      {
        id: Date.now(),
        ...formData,
        subjectId: Number(formData.subjectId),
        status: "Not started",
        tasks: [],
      },
    ]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    if (!formData.title.trim() || !formData.subjectId || !formData.deadline)
      return;
    setAssignments(
      assignments.map((a) =>
        a.id === selectedAssignment.id
          ? { ...a, ...formData, subjectId: Number(formData.subjectId) }
          : a
      )
    );
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setAssignments(assignments.filter((a) => a.id !== selectedAssignment.id));
    setIsDeleteDialogOpen(false);
    setSelectedAssignment(null);
  };

  const handleViewDetails = (assignment) => setSelectedAssignment(assignment);
  const handleBackToList = () => setSelectedAssignment(null);

  // Task functions
  const handleAddTask = (assignmentId, taskTitle) => {
    setAssignments(
      assignments.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              tasks: [
                ...a.tasks,
                { id: Date.now(), title: taskTitle, completed: false },
              ],
            }
          : a
      )
    );
  };

  const handleToggleTask = (assignmentId, taskId) => {
    setAssignments(
      assignments.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              tasks: a.tasks.map((t) =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
              ),
            }
          : a
      )
    );
  };

  const handleEditTask = (assignmentId, taskId, newTitle) => {
    setAssignments(
      assignments.map((a) =>
        a.id === assignmentId
          ? {
              ...a,
              tasks: a.tasks.map((t) =>
                t.id === taskId ? { ...t, title: newTitle } : t
              ),
            }
          : a
      )
    );
  };

  const handleDeleteTask = (assignmentId, taskId) => {
    setAssignments(
      assignments.map((a) =>
        a.id === assignmentId
          ? { ...a, tasks: a.tasks.filter((t) => t.id !== taskId) }
          : a
      )
    );
  };

  // Calendar
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const getAssignmentsForDay = (day) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return assignments.filter((a) => a.deadline === dateStr);
  };

  if (selectedAssignment) {
    const currentAssignment = assignments.find(
      (a) => a.id === selectedAssignment.id
    );
    if (!currentAssignment) {
      setSelectedAssignment(null);
      return null;
    }
    return (
      <AssignmentDetailView
        assignment={currentAssignment}
        getSubjectName={getSubjectName}
        onBack={handleBackToList}
        onEdit={() => handleEdit(currentAssignment)}
        onDelete={() => handleDelete(currentAssignment)}
        onAddTask={handleAddTask}
        onToggleTask={handleToggleTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Assignments
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#121f3e]">
            Manage Assignments
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl border border-gray-200 p-1">
            <button
              onClick={() => setViewMode("list")}
              className={[
                "rounded-lg p-2 transition",
                viewMode === "list"
                  ? "bg-[#121f3e] text-white"
                  : "text-gray-400 hover:text-gray-600",
              ].join(" ")}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={[
                "rounded-lg p-2 transition",
                viewMode === "calendar"
                  ? "bg-[#121f3e] text-white"
                  : "text-gray-400 hover:text-gray-600",
              ].join(" ")}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="rounded-xl bg-[#121f3e] px-4 py-2 text-xs font-medium text-white hover:bg-[#1a2d54]"
          >
            + New Assignment
          </button>
        </div>
      </header>

      {viewMode === "list" ? (
        <>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Filter:</span>
              <div className="flex gap-1">
                {["all", "high", "medium", "low"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={[
                      "rounded-full px-3 py-1 text-xs capitalize transition",
                      filter === f
                        ? "bg-[#121f3e] text-white"
                        : "border border-gray-200 text-gray-500 hover:border-gray-300",
                    ].join(" ")}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
              >
                <option value="deadline">Deadline</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>

          <Card
            title="All Assignments"
            description="Click to view details and manage tasks."
          >
            <div className="space-y-2">
              {filteredAssignments.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">
                  No assignments found.
                </p>
              ) : (
                filteredAssignments.map((assignment) => (
                  <button
                    key={assignment.id}
                    onClick={() => handleViewDetails(assignment)}
                    className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-left transition hover:border-gray-200 hover:bg-gray-100"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#121f3e]">
                        {assignment.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getSubjectName(assignment.subjectId)} · Due:{" "}
                        {assignment.deadline}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-medium",
                          assignment.priority === "High"
                            ? "bg-red-100 text-red-600"
                            : assignment.priority === "Medium"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-gray-100 text-gray-600",
                        ].join(" ")}
                      >
                        {assignment.priority}
                      </span>
                      <span className="text-xs text-gray-400">
                        {assignment.tasks.filter((t) => t.completed).length}/
                        {assignment.tasks.length}
                      </span>
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                ))
              )}
            </div>
          </Card>
        </>
      ) : (
        <Card title={monthName}>
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1,
                    1
                  )
                )
              }
              className="rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100"
            >
              ← Previous
            </button>
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1,
                    1
                  )
                )
              }
              className="rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100"
            >
              Next →
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-medium text-gray-400"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayAssignments = getAssignmentsForDay(day);
              const hasAssignments = dayAssignments.length > 0;
              return (
                <div
                  key={day}
                  className={[
                    "min-h-[80px] rounded-xl border p-2 text-xs",
                    hasAssignments
                      ? "border-[#121f3e]/20 bg-[#121f3e]/5"
                      : "border-gray-100 bg-gray-50",
                  ].join(" ")}
                >
                  <span
                    className={
                      hasAssignments
                        ? "font-medium text-[#121f3e]"
                        : "text-gray-400"
                    }
                  >
                    {day}
                  </span>
                  {dayAssignments.slice(0, 2).map((a) => (
                    <button
                      key={a.id}
                      onClick={() => handleViewDetails(a)}
                      className="mt-1 w-full truncate rounded bg-[#121f3e]/10 px-1.5 py-0.5 text-left text-[10px] text-[#121f3e] hover:bg-[#121f3e]/20"
                    >
                      {a.title}
                    </button>
                  ))}
                  {dayAssignments.length > 2 && (
                    <div className="mt-1 text-[10px] text-gray-400">
                      +{dayAssignments.length - 2} more
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Modals */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="New Assignment"
      >
        <AssignmentForm
          formData={formData}
          setFormData={setFormData}
          subjects={subjects}
          onCancel={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
          saveLabel="Create Assignment"
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Assignment"
      >
        <AssignmentForm
          formData={formData}
          setFormData={setFormData}
          subjects={subjects}
          onCancel={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
          saveLabel="Save Changes"
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Assignment"
        message={`Are you sure you want to delete "${selectedAssignment?.title}"?`}
      />
    </div>
  );
}

function AssignmentForm({
  formData,
  setFormData,
  subjects,
  onCancel,
  onSave,
  saveLabel,
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g. Research essay"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            Subject
          </label>
          <select
            value={formData.subjectId}
            onChange={(e) =>
              setFormData({ ...formData, subjectId: e.target.value })
            }
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
          >
            <option value="">Select subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            Deadline
          </label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">
          Priority
        </label>
        <div className="flex gap-2">
          {["High", "Medium", "Low"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setFormData({ ...formData, priority: p })}
              className={[
                "flex-1 rounded-xl px-3 py-2 text-xs font-medium transition",
                formData.priority === p
                  ? "bg-[#121f3e] text-white"
                  : "border border-gray-200 text-gray-600 hover:border-gray-300",
              ].join(" ")}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={2}
          placeholder="Add notes..."
          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onCancel}
          className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="rounded-xl bg-[#121f3e] px-4 py-2 text-xs font-medium text-white hover:bg-[#1a2d54]"
        >
          {saveLabel}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// ASSIGNMENT DETAIL VIEW
// ============================================================
function AssignmentDetailView({
  assignment,
  getSubjectName,
  onBack,
  onEdit,
  onDelete,
  onAddTask,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");
  const [taskFilter, setTaskFilter] = useState("all");
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const filteredTasks = assignment.tasks.filter((t) => {
    if (taskFilter === "pending") return !t.completed;
    if (taskFilter === "completed") return t.completed;
    return true;
  });

  const completedCount = assignment.tasks.filter((t) => t.completed).length;
  const totalCount = assignment.tasks.length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    onAddTask(assignment.id, newTaskTitle.trim());
    setNewTaskTitle("");
  };

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Assignment Details
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-[#121f3e]">
              {assignment.title}
            </h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="rounded-xl border border-red-200 px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Details" className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-gray-400">Subject</p>
              <p className="mt-1 font-medium text-gray-700">
                {getSubjectName(assignment.subjectId)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Deadline</p>
              <p className="mt-1 font-medium text-gray-700">
                {assignment.deadline}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Priority</p>
              <span
                className={[
                  "mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                  assignment.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : assignment.priority === "Medium"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-gray-100 text-gray-600",
                ].join(" ")}
              >
                {assignment.priority}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <p className="mt-1 font-medium text-gray-700">
                {assignment.status}
              </p>
            </div>
            {assignment.description && (
              <div className="col-span-2">
                <p className="text-xs text-gray-400">Description</p>
                <p className="mt-1 text-gray-600">{assignment.description}</p>
              </div>
            )}
          </div>
        </Card>

        <Card title="Progress">
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <svg className="h-24 w-24 -rotate-90 transform">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#121f3e"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${progressPercent * 2.51} 251`}
                />
              </svg>
              <span className="absolute text-xl font-bold text-[#121f3e]">
                {progressPercent}%
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>
        </Card>

        <Card
          title="Tasks"
          className="lg:col-span-3"
          actions={
            <div className="flex gap-1">
              {["all", "pending", "completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setTaskFilter(f)}
                  className={[
                    "rounded-full px-3 py-1 text-[10px] capitalize transition",
                    taskFilter === f
                      ? "bg-[#121f3e] text-white"
                      : "text-gray-400 hover:text-gray-600",
                  ].join(" ")}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        >
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                placeholder="Add a new task..."
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#121f3e] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
              />
              <button
                onClick={handleAddTask}
                className="rounded-xl bg-[#121f3e] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1a2d54]"
              >
                Add
              </button>
            </div>

            <div className="space-y-2">
              {filteredTasks.length === 0 ? (
                <p className="py-4 text-center text-sm text-gray-400">
                  {taskFilter === "all"
                    ? "No tasks yet."
                    : `No ${taskFilter} tasks.`}
                </p>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={[
                      "flex items-center justify-between rounded-xl border px-4 py-3",
                      task.completed
                        ? "border-gray-100 bg-gray-50"
                        : "border-gray-200 bg-white",
                    ].join(" ")}
                  >
                    {editingTaskId === task.id ? (
                      <div className="flex flex-1 items-center gap-2">
                        <input
                          type="text"
                          value={editingTaskTitle}
                          onChange={(e) => setEditingTaskTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              onEditTask(
                                assignment.id,
                                task.id,
                                editingTaskTitle.trim()
                              );
                              setEditingTaskId(null);
                            }
                            if (e.key === "Escape") setEditingTaskId(null);
                          }}
                          className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#121f3e]"
                          autoFocus
                        />
                        <button
                          onClick={() => {
                            onEditTask(
                              assignment.id,
                              task.id,
                              editingTaskTitle.trim()
                            );
                            setEditingTaskId(null);
                          }}
                          className="text-xs text-[#121f3e] hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTaskId(null)}
                          className="text-xs text-gray-400 hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() =>
                              onToggleTask(assignment.id, task.id)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-[#121f3e] focus:ring-[#121f3e]"
                          />
                          <span
                            className={[
                              "text-sm",
                              task.completed
                                ? "text-gray-400 line-through"
                                : "text-gray-700",
                            ].join(" ")}
                          >
                            {task.title}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setEditingTaskId(task.id);
                              setEditingTaskTitle(task.title);
                            }}
                            className="rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setTaskToDelete(task);
                              setIsDeleteTaskDialogOpen(true);
                            }}
                            className="rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-100 hover:text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>
      </div>

      <ConfirmDialog
        isOpen={isDeleteTaskDialogOpen}
        onClose={() => setIsDeleteTaskDialogOpen(false)}
        onConfirm={() => {
          onDeleteTask(assignment.id, taskToDelete.id);
          setIsDeleteTaskDialogOpen(false);
        }}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"?`}
      />
    </div>
  );
}

// ============================================================
// TIMER VIEW
// ============================================================
function TimerView() {
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const modes = {
    focus: { label: "Focus", duration: 25 * 60 },
    shortBreak: { label: "Short Break", duration: 5 * 60 },
    longBreak: { label: "Long Break", duration: 15 * 60 },
  };

  const currentMode = modes[mode];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
    setIsRunning(false);
  };

  const progress =
    ((currentMode.duration - timeLeft) / currentMode.duration) * 100;

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Pomodoro Timer
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-[#121f3e]">
          Focus Sessions
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card title="Timer" className="lg:col-span-2">
          <div className="flex flex-col items-center gap-8 py-8">
            <div className="flex gap-2">
              {Object.entries(modes).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => handleModeChange(key)}
                  className={[
                    "rounded-full px-4 py-2 text-xs font-medium transition",
                    mode === key
                      ? "bg-[#121f3e] text-white"
                      : "border border-gray-200 text-gray-500 hover:border-gray-300",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="relative flex h-56 w-56 items-center justify-center">
              <svg className="h-56 w-56 -rotate-90 transform">
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="#121f3e"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${progress * 6.28} 628`}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-bold text-[#121f3e]">
                  {formatTime(timeLeft)}
                </span>
                <span className="mt-2 text-sm text-gray-500">
                  {currentMode.label}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              {!isRunning ? (
                <button
                  onClick={() => setIsRunning(true)}
                  className="rounded-full bg-[#121f3e] px-8 py-2.5 text-sm font-medium text-white hover:bg-[#1a2d54]"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={() => setIsRunning(false)}
                  className="rounded-full bg-amber-500 px-8 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
                >
                  Pause
                </button>
              )}
              <button
                onClick={() => {
                  setIsRunning(false);
                  setTimeLeft(currentMode.duration);
                }}
                className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-5">
          <Card title="Sessions" description="Today's focus sessions.">
            <div className="flex flex-col items-center gap-4 py-6">
              <span className="text-5xl font-bold text-[#121f3e]">
                {sessionsCompleted}
              </span>
              <p className="text-sm text-gray-500">sessions completed</p>
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={[
                      "h-3 w-3 rounded-full",
                      i < sessionsCompleted % 4
                        ? "bg-[#121f3e]"
                        : "bg-gray-200",
                    ].join(" ")}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400">
                {4 - (sessionsCompleted % 4)} more until long break
              </p>
            </div>
          </Card>

          <Card title="Tips" description="Pomodoro technique tips.">
            <div className="space-y-3 text-xs text-gray-500">
              <p>• Work for 25 minutes, then take a 5-minute break.</p>
              <p>• After 4 sessions, take a longer 15-30 minute break.</p>
              <p>• Avoid distractions during focus time.</p>
              <p>• Use breaks to stretch, hydrate, or rest your eyes.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
