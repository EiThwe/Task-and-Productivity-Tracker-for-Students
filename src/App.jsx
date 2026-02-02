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

    // Validation
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

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLogin({ email, name: email.split("@")[0] });
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-slate-950/70 p-8 ring-1 ring-slate-800/80">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Welcome back
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50">
              Sign in to your account
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-300">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs text-slate-400">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-slate-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-sky-400"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-xs text-sky-400 hover:text-sky-300"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-sky-500 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-sky-400 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-sky-400 hover:text-sky-300"
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

    // Validation
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

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      onRegister({ email, name: username });
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-slate-950/70 p-8 ring-1 ring-slate-800/80">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Get started
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50">
              Create your account
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-300">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs text-slate-400">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-slate-400">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-slate-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-slate-400">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-sky-500 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-sky-400 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-sky-400 hover:text-sky-300"
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

  // Global state for subjects
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Mathematics", color: "#3b82f6" },
    { id: 2, name: "Computer Science", color: "#22c55e" },
    { id: 3, name: "English", color: "#f59e0b" },
  ]);

  // Global state for assignments
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
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl gap-6 px-4 py-6">
        {/* Sidebar */}
        <aside className="sticky top-6 flex h-[calc(100vh-3rem)] w-60 flex-col justify-between rounded-2xl bg-slate-950/60 p-4 ring-1 ring-slate-800/80">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Student
              </p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-50">
                Task & Productivity
              </h1>
              <p className="mt-1 text-xs text-slate-400">
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
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/40"
                        : "text-slate-300 hover:bg-slate-900/80 hover:text-slate-50",
                    ].join(" ")}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-dashed border-slate-800/80 bg-slate-950/70 p-3">
              <p className="text-xs font-medium text-slate-300">
                Today&apos;s focus
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Choose 3–5 important tasks and protect your focus blocks.
              </p>
            </div>
            <button
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 px-3 py-2 text-xs text-slate-400 transition hover:border-slate-600 hover:text-slate-200"
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
      className={[
        "flex flex-col rounded-2xl bg-slate-950/70 p-4 ring-1 ring-slate-800/80",
        className,
      ].join(" ")}
    >
      <header className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-50">{title}</h2>
          {description && (
            <p className="mt-0.5 text-xs text-slate-400">{description}</p>
          )}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </header>
      <div className="flex-1">{children}</div>
    </section>
  );
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6 ring-1 ring-slate-800">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 p-6 ring-1 ring-slate-800">
        <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
        <p className="mt-2 text-sm text-slate-400">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 hover:border-slate-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-rose-500 px-4 py-2 text-xs font-medium text-white hover:bg-rose-400"
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
function DashboardView({ assignments, subjects, getSubjectName }) {
  // Analytics calculations
  const totalTasks = assignments.reduce((acc, a) => acc + a.tasks.length, 0);
  const completedTasks = assignments.reduce(
    (acc, a) => acc + a.tasks.filter((t) => t.completed).length,
    0
  );

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

  return (
    <div className="flex flex-col gap-4 pb-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Overview
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
            Dashboard & Analytics
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Overall Progress Circle */}
        <Card title="Overall Progress" description="Total tasks completed.">
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <svg className="h-28 w-28 -rotate-90 transform">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="none"
                  className="text-slate-800"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${
                    totalTasks > 0 ? (completedTasks / totalTasks) * 301 : 0
                  } 301`}
                  className="text-sky-400"
                />
              </svg>
              <span className="absolute text-xl font-bold text-slate-50">
                {totalTasks > 0
                  ? Math.round((completedTasks / totalTasks) * 100)
                  : 0}
                %
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card title="Quick stats" description="Your progress at a glance.">
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Total assignments</span>
              <span className="font-medium text-slate-100">
                {assignments.length}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Total subjects</span>
              <span className="font-medium text-slate-100">
                {subjects.length}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Tasks completed</span>
              <span className="font-medium text-slate-100">
                {completedTasks}/{totalTasks}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">High priority</span>
              <span className="font-medium text-rose-400">
                {assignments.filter((a) => a.priority === "High").length}
              </span>
            </div>
          </div>
        </Card>

        {/* Priority Distribution */}
        <Card title="By Priority" description="Assignments breakdown.">
          <div className="grid grid-cols-3 gap-2 py-3">
            {["High", "Medium", "Low"].map((priority) => {
              const count = assignments.filter(
                (a) => a.priority === priority
              ).length;
              return (
                <div
                  key={priority}
                  className="flex flex-col items-center gap-1 rounded-xl border border-slate-800 bg-slate-950 p-3"
                >
                  <span
                    className={[
                      "text-2xl font-bold",
                      priority === "High"
                        ? "text-rose-400"
                        : priority === "Medium"
                        ? "text-amber-400"
                        : "text-slate-400",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                  <span className="text-[10px] text-slate-400">{priority}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Daily To-Do */}
        <Card
          title="Priority Tasks"
          description="High priority and due soon."
          className="lg:col-span-2"
        >
          <div className="flex flex-col gap-2">
            {assignments
              .filter(
                (a) => a.priority === "High" || a.deadline === "2026-02-02"
              )
              .slice(0, 4)
              .map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-950/70 px-3 py-2.5"
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      className="mt-1 h-3.5 w-3.5 rounded border-slate-700 bg-slate-950 text-sky-400"
                    />
                    <div>
                      <p className="text-xs font-medium text-slate-50">
                        {assignment.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {getSubjectName(assignment.subjectId)} · Due:{" "}
                        {assignment.deadline}
                      </p>
                    </div>
                  </div>
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                      assignment.priority === "High"
                        ? "bg-rose-500/20 text-rose-300"
                        : assignment.priority === "Medium"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-slate-500/20 text-slate-300",
                    ].join(" ")}
                  >
                    {assignment.priority}
                  </span>
                </div>
              ))}
            {assignments.filter(
              (a) => a.priority === "High" || a.deadline === "2026-02-02"
            ).length === 0 && (
              <p className="py-4 text-center text-xs text-slate-400">
                No priority tasks at the moment.
              </p>
            )}
          </div>
        </Card>

        {/* Progress by Subject */}
        <Card title="By Subject" description="Progress breakdown.">
          <div className="space-y-3 py-1">
            {tasksBySubject.map((subject) => (
              <div key={subject.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="text-slate-300">{subject.name}</span>
                  </div>
                  <span className="text-slate-400">
                    {subject.completed}/{subject.total}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${
                        subject.total > 0
                          ? (subject.completed / subject.total) * 100
                          : 0
                      }%`,
                      backgroundColor: subject.color,
                    }}
                  />
                </div>
              </div>
            ))}
            {subjects.length === 0 && (
              <p className="py-2 text-center text-xs text-slate-400">
                No subjects yet.
              </p>
            )}
          </div>
        </Card>

        {/* Upcoming Deadlines Table */}
        <Card
          title="Upcoming deadlines"
          description="All assignments overview."
          className="lg:col-span-3"
        >
          <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/60">
            <table className="min-w-full border-separate border-spacing-0 text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-3 py-2 font-medium">Assignment</th>
                  <th className="px-3 py-2 font-medium">Subject</th>
                  <th className="px-3 py-2 font-medium">Deadline</th>
                  <th className="px-3 py-2 font-medium">Priority</th>
                  <th className="px-3 py-2 font-medium">Progress</th>
                </tr>
              </thead>
              <tbody>
                {assignments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-6 text-center text-slate-400"
                    >
                      No assignments yet.
                    </td>
                  </tr>
                ) : (
                  assignments.map((assignment) => (
                    <tr
                      key={assignment.id}
                      className="border-t border-slate-800/80 text-slate-200"
                    >
                      <td className="px-3 py-2.5">{assignment.title}</td>
                      <td className="px-3 py-2.5 text-slate-400">
                        {getSubjectName(assignment.subjectId)}
                      </td>
                      <td className="px-3 py-2.5 text-slate-300">
                        {assignment.deadline}
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className={[
                            "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium",
                            assignment.priority === "High"
                              ? "bg-rose-500/20 text-rose-300"
                              : assignment.priority === "Medium"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-slate-500/20 text-slate-300",
                          ].join(" ")}
                        >
                          {assignment.priority}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className="h-full rounded-full bg-sky-400"
                              style={{
                                width: `${
                                  assignment.tasks.length > 0
                                    ? (assignment.tasks.filter(
                                        (t) => t.completed
                                      ).length /
                                        assignment.tasks.length) *
                                      100
                                    : 0
                                }%`,
                              }}
                            />
                          </div>
                          <span className="text-slate-400">
                            {assignment.tasks.filter((t) => t.completed).length}
                            /{assignment.tasks.length}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// SUBJECTS VIEW - SUBJECT MANAGEMENT FLOW
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
    const newSubject = {
      id: Date.now(),
      name: formData.name.trim(),
      color: formData.color,
    };
    setSubjects([...subjects, newSubject]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    if (!formData.name.trim()) return;
    setSubjects(
      subjects.map((s) =>
        s.id === selectedSubject.id
          ? { ...s, name: formData.name.trim(), color: formData.color }
          : s
      )
    );
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setSubjects(subjects.filter((s) => s.id !== selectedSubject.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Subjects
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
            Manage your subjects
          </h1>
        </div>
        <button
          onClick={handleAdd}
          className="rounded-full bg-slate-50 px-4 py-1.5 text-xs font-medium text-slate-900 shadow-subtle hover:bg-slate-200"
        >
          + Add subject
        </button>
      </header>

      <Card
        title="All subjects"
        description="View, edit, or delete your subjects."
      >
        <div className="space-y-2">
          {subjects.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">
              No subjects yet. Add your first subject to get started.
            </p>
          ) : (
            subjects.map((subject) => (
              <div
                key={subject.id}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  />
                  <span className="text-sm text-slate-200">{subject.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(subject)}
                    className="rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subject)}
                    className="rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-800 hover:text-rose-300"
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
            <label className="mb-1.5 block text-xs text-slate-400">
              Subject name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Mathematics"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-slate-400">Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData({ ...formData, color })}
                  className={[
                    "h-8 w-8 rounded-full transition",
                    formData.color === color
                      ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900"
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
              className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 hover:border-slate-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAdd}
              className="rounded-xl bg-sky-500 px-4 py-2 text-xs font-medium text-slate-950 hover:bg-sky-400"
            >
              Add subject
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
            <label className="mb-1.5 block text-xs text-slate-400">
              Subject name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-slate-400">Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData({ ...formData, color })}
                  className={[
                    "h-8 w-8 rounded-full transition",
                    formData.color === color
                      ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900"
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
              className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 hover:border-slate-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="rounded-xl bg-sky-500 px-4 py-2 text-xs font-medium text-slate-950 hover:bg-sky-400"
            >
              Save changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Subject"
        message={`Are you sure you want to delete "${selectedSubject?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}

// ============================================================
// ASSIGNMENTS VIEW - ASSIGNMENT MANAGEMENT FLOW
// ============================================================
function AssignmentsView({
  assignments,
  setAssignments,
  subjects,
  getSubjectName,
}) {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" or "calendar"
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [filter, setFilter] = useState("all"); // all, high, medium, low
  const [sortBy, setSortBy] = useState("deadline"); // deadline, priority, title

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1)); // February 2026

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
    const newAssignment = {
      id: Date.now(),
      title: formData.title.trim(),
      subjectId: Number(formData.subjectId),
      deadline: formData.deadline,
      priority: formData.priority,
      status: "Not started",
      description: formData.description,
      tasks: [],
    };
    setAssignments([...assignments, newAssignment]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    if (!formData.title.trim() || !formData.subjectId || !formData.deadline)
      return;
    setAssignments(
      assignments.map((a) =>
        a.id === selectedAssignment.id
          ? {
              ...a,
              title: formData.title.trim(),
              subjectId: Number(formData.subjectId),
              deadline: formData.deadline,
              priority: formData.priority,
              description: formData.description,
            }
          : a
      )
    );
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setAssignments(assignments.filter((a) => a.id !== selectedAssignment.id));
    setIsDeleteDialogOpen(false);
    if (selectedAssignment?.id === selectedAssignment?.id) {
      setSelectedAssignment(null);
    }
  };

  const handleViewDetails = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleBackToList = () => {
    setSelectedAssignment(null);
  };

  // Task management functions
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

  // Calendar functions
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

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // If an assignment is selected, show the detail view
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
        subjects={subjects}
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
    <div className="flex h-full flex-col gap-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Assignments
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
            Manage your assignments
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex rounded-xl border border-slate-800 p-1">
            <button
              onClick={() => setViewMode("list")}
              className={[
                "rounded-lg p-2 transition",
                viewMode === "list"
                  ? "bg-sky-500/20 text-sky-400"
                  : "text-slate-400 hover:text-slate-200",
              ].join(" ")}
              title="List view"
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
                  ? "bg-sky-500/20 text-sky-400"
                  : "text-slate-400 hover:text-slate-200",
              ].join(" ")}
              title="Calendar view"
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
            className="rounded-full bg-slate-50 px-4 py-1.5 text-xs font-medium text-slate-900 shadow-subtle hover:bg-slate-200"
          >
            + New assignment
          </button>
        </div>
      </header>

      {viewMode === "list" ? (
        <>
          {/* Filters and Sort */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter:</span>
              <div className="flex gap-1">
                {["all", "high", "medium", "low"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={[
                      "rounded-full px-3 py-1 text-[11px] capitalize transition",
                      filter === f
                        ? "bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/40"
                        : "border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200",
                    ].join(" ")}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              >
                <option value="deadline">Deadline</option>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>

          {/* Assignment List */}
          <Card
            title="All assignments"
            description="Click to view details and manage tasks."
            className="flex-1 overflow-auto"
          >
            <div className="space-y-2">
              {filteredAssignments.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-400">
                  No assignments found. Create your first assignment to get
                  started.
                </p>
              ) : (
                filteredAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 transition hover:border-slate-700"
                  >
                    <button
                      onClick={() => handleViewDetails(assignment)}
                      className="flex flex-1 items-center gap-4 text-left"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-100">
                          {assignment.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {getSubjectName(assignment.subjectId)} · Due:{" "}
                          {assignment.deadline}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={[
                            "inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium",
                            assignment.priority === "High"
                              ? "bg-rose-500/20 text-rose-300"
                              : assignment.priority === "Medium"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-slate-500/20 text-slate-300",
                          ].join(" ")}
                        >
                          {assignment.priority}
                        </span>
                        <span className="text-xs text-slate-500">
                          {assignment.tasks.filter((t) => t.completed).length}/
                          {assignment.tasks.length}
                        </span>
                        <svg
                          className="h-4 w-4 text-slate-500"
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
                  </div>
                ))
              )}
            </div>
          </Card>
        </>
      ) : (
        /* Calendar View */
        <Card title={monthName} className="flex-1 overflow-auto">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={prevMonth}
              className="rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
            >
              ← Previous
            </button>
            <button
              onClick={nextMonth}
              className="rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
            >
              Next →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-medium text-slate-400"
              >
                {day}
              </div>
            ))}

            {/* Empty cells for days before the first day of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2" />
            ))}

            {/* Days of the month */}
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
                      ? "border-sky-500/30 bg-sky-500/5"
                      : "border-slate-800/50 bg-slate-950/50",
                  ].join(" ")}
                >
                  <span
                    className={
                      hasAssignments
                        ? "font-medium text-sky-300"
                        : "text-slate-400"
                    }
                  >
                    {day}
                  </span>
                  {dayAssignments.slice(0, 2).map((a) => (
                    <button
                      key={a.id}
                      onClick={() => handleViewDetails(a)}
                      className="mt-1 w-full truncate rounded bg-sky-500/20 px-1.5 py-0.5 text-left text-[10px] text-sky-200 hover:bg-sky-500/30"
                    >
                      {a.title}
                    </button>
                  ))}
                  {dayAssignments.length > 2 && (
                    <div className="mt-1 text-[10px] text-slate-400">
                      +{dayAssignments.length - 2} more
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Add Assignment Modal */}
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
          saveLabel="Create assignment"
        />
      </Modal>

      {/* Edit Assignment Modal */}
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
          saveLabel="Save changes"
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Assignment"
        message={`Are you sure you want to delete "${selectedAssignment?.title}"? All tasks will also be deleted.`}
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
        <label className="mb-1.5 block text-xs text-slate-400">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g. Research essay"
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs text-slate-400">Subject</label>
          <select
            value={formData.subjectId}
            onChange={(e) =>
              setFormData({ ...formData, subjectId: e.target.value })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
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
          <label className="mb-1.5 block text-xs text-slate-400">
            Deadline
          </label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-slate-400">Priority</label>
        <div className="flex gap-2">
          {["High", "Medium", "Low"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setFormData({ ...formData, priority: p })}
              className={[
                "flex-1 rounded-xl px-3 py-2 text-xs font-medium transition",
                formData.priority === p
                  ? "bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/40"
                  : "border border-slate-700 text-slate-300 hover:border-slate-500",
              ].join(" ")}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-slate-400">
          Description (optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={2}
          placeholder="Add notes or instructions..."
          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onCancel}
          className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-200 hover:border-slate-500"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="rounded-xl bg-sky-500 px-4 py-2 text-xs font-medium text-slate-950 hover:bg-sky-400"
        >
          {saveLabel}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// ASSIGNMENT DETAIL VIEW - ASSIGNMENT DETAILS FLOW WITH TASKS
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
  const [taskFilter, setTaskFilter] = useState("all"); // all, pending, completed
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

  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
  };

  const handleSaveEdit = (taskId) => {
    if (!editingTaskTitle.trim()) return;
    onEditTask(assignment.id, taskId, editingTaskTitle.trim());
    setEditingTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskTitle("");
  };

  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setIsDeleteTaskDialogOpen(true);
  };

  const confirmDeleteTask = () => {
    onDeleteTask(assignment.id, taskToDelete.id);
    setIsDeleteTaskDialogOpen(false);
    setTaskToDelete(null);
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
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
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Assignment Details
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
              {assignment.title}
            </h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-500"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="rounded-full border border-rose-700/50 px-4 py-1.5 text-xs font-medium text-rose-300 hover:border-rose-500"
          >
            Delete
          </button>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Assignment Info */}
        <Card
          title="Details"
          description="Assignment information."
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-slate-400">Subject</p>
              <p className="mt-1 text-slate-200">
                {getSubjectName(assignment.subjectId)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Deadline</p>
              <p className="mt-1 text-slate-200">{assignment.deadline}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Priority</p>
              <span
                className={[
                  "mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                  assignment.priority === "High"
                    ? "bg-rose-500/20 text-rose-300"
                    : assignment.priority === "Medium"
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-slate-500/20 text-slate-300",
                ].join(" ")}
              >
                {assignment.priority}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400">Status</p>
              <p className="mt-1 text-slate-200">{assignment.status}</p>
            </div>
            {assignment.description && (
              <div className="col-span-2">
                <p className="text-xs text-slate-400">Description</p>
                <p className="mt-1 text-slate-300">{assignment.description}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Progress */}
        <Card title="Progress" description="Task completion status.">
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <svg className="h-24 w-24 -rotate-90 transform">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-slate-800"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${progressPercent * 2.51} 251`}
                  className="text-sky-400"
                />
              </svg>
              <span className="absolute text-xl font-bold text-slate-50">
                {progressPercent}%
              </span>
            </div>
            <p className="text-sm text-slate-300">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>
        </Card>

        {/* Tasks Section */}
        <Card
          title="Tasks"
          description="Manage tasks for this assignment."
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
                      ? "bg-sky-500/20 text-sky-300"
                      : "text-slate-400 hover:text-slate-200",
                  ].join(" ")}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        >
          <div className="space-y-3">
            {/* Add Task Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                placeholder="Add a new task..."
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              />
              <button
                onClick={handleAddTask}
                className="rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-slate-950 hover:bg-sky-400"
              >
                Add
              </button>
            </div>

            {/* Task List */}
            <div className="space-y-2">
              {filteredTasks.length === 0 ? (
                <p className="py-4 text-center text-sm text-slate-400">
                  {taskFilter === "all"
                    ? "No tasks yet. Add your first task above."
                    : `No ${taskFilter} tasks.`}
                </p>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={[
                      "flex items-center justify-between rounded-xl border px-4 py-3 transition",
                      task.completed
                        ? "border-slate-800/50 bg-slate-950/50"
                        : "border-slate-800 bg-slate-950",
                    ].join(" ")}
                  >
                    {editingTaskId === task.id ? (
                      <div className="flex flex-1 items-center gap-2">
                        <input
                          type="text"
                          value={editingTaskTitle}
                          onChange={(e) => setEditingTaskTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveEdit(task.id);
                            if (e.key === "Escape") handleCancelEdit();
                          }}
                          className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(task.id)}
                          className="rounded-lg px-3 py-1.5 text-xs text-sky-400 hover:bg-slate-800"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-800"
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
                            className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-sky-400"
                          />
                          <span
                            className={[
                              "text-sm",
                              task.completed
                                ? "text-slate-500 line-through"
                                : "text-slate-200",
                            ].join(" ")}
                          >
                            {task.title}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleStartEdit(task)}
                            className="rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task)}
                            className="rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-800 hover:text-rose-300"
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

      {/* Delete Task Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteTaskDialogOpen}
        onClose={() => setIsDeleteTaskDialogOpen(false)}
        onConfirm={confirmDeleteTask}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"?`}
      />
    </div>
  );
}

// ============================================================
// CALENDAR VIEW
// ============================================================
// ============================================================
// ANALYTICS VIEW
// ============================================================
// ============================================================
// TIMER VIEW - POMODORO TIMER FLOW
// ============================================================
function TimerView() {
  const [mode, setMode] = useState("focus"); // focus, shortBreak, longBreak
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const modes = {
    focus: { label: "Focus", duration: 25 * 60, color: "sky" },
    shortBreak: { label: "Short Break", duration: 5 * 60, color: "green" },
    longBreak: { label: "Long Break", duration: 15 * 60, color: "purple" },
  };

  const currentMode = modes[mode];

  // Timer effect
  useState(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (mode === "focus") {
              setSessionsCompleted((s) => s + 1);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  });

  // Use useEffect for the timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(currentMode.duration);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
    setIsRunning(false);
  };

  const progress =
    ((currentMode.duration - timeLeft) / currentMode.duration) * 100;

  return (
    <div className="flex h-full flex-col gap-4">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Pomodoro Timer
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
          Focus Sessions
        </h1>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Timer" className="lg:col-span-2">
          <div className="flex flex-col items-center gap-8 py-8">
            {/* Mode Selector */}
            <div className="flex gap-2">
              {Object.entries(modes).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => handleModeChange(key)}
                  className={[
                    "rounded-full px-4 py-2 text-xs font-medium transition",
                    mode === key
                      ? "bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/40"
                      : "border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Timer Display */}
            <div className="relative flex h-56 w-56 items-center justify-center">
              <svg className="h-56 w-56 -rotate-90 transform">
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-slate-800"
                />
                <circle
                  cx="112"
                  cy="112"
                  r="100"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${progress * 6.28} 628`}
                  className="text-sky-400 transition-all"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-bold tracking-tight text-slate-50">
                  {formatTime(timeLeft)}
                </span>
                <span className="mt-2 text-sm text-slate-400">
                  {currentMode.label}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3">
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="rounded-full bg-sky-500 px-8 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="rounded-full bg-amber-500 px-8 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-amber-400"
                >
                  Pause
                </button>
              )}
              <button
                onClick={handleReset}
                className="rounded-full border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500"
              >
                Reset
              </button>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card title="Sessions" description="Today's focus sessions.">
            <div className="flex flex-col items-center gap-4 py-6">
              <span className="text-5xl font-bold text-sky-400">
                {sessionsCompleted}
              </span>
              <p className="text-sm text-slate-400">sessions completed</p>
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={[
                      "h-3 w-3 rounded-full",
                      i < sessionsCompleted % 4 ? "bg-sky-400" : "bg-slate-800",
                    ].join(" ")}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500">
                {4 - (sessionsCompleted % 4)} more until long break
              </p>
            </div>
          </Card>

          <Card title="Tips" description="Pomodoro technique tips.">
            <div className="space-y-3 text-xs text-slate-400">
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
