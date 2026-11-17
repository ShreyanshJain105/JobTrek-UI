import { useEffect, useState, useMemo } from "react";
import { 
    Table, 
    Badge, 
    Modal, 
    TextInput, 
    Select, 
    PasswordInput, 
    ActionIcon, 
    Button, 
    Tooltip, 
    LoadingOverlay 
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { 
    IconShieldLock, 
    IconUsers, 
    IconBriefcase, 
    IconUserPlus, 
    IconEdit, 
    IconTrash, 
    IconCheck, 
    IconSearch, 
    IconBuilding, 
    IconExternalLink, 
    IconRefresh, 
    IconEye,
    IconCurrencyDollar,
    IconMapPin
} from "@tabler/icons-react";
import { 
    getAllUsers, 
    adminCreateUser, 
    adminUpdateUser, 
    adminDeleteUser 
} from "../Services/UserService";
import { getAllJobs, postJob, deleteJob } from "../Services/JobService";
import { successNotification, errorNotification } from "../Services/NotificationService";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";

const AdminPage = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"users" | "jobs">("users");

    // Search & Filter State
    const [userSearch, setUserSearch] = useState("");
    const [userRoleFilter, setUserRoleFilter] = useState("ALL");
    const [jobSearch, setJobSearch] = useState("");
    const [jobStatusFilter, setJobStatusFilter] = useState("ALL");

    // Add User Modal State
    const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
    const [newUserData, setNewUserData] = useState({
        name: "",
        email: "",
        password: "Password@123",
        accountType: "EMPLOYER"
    });
    const [savingUser, setSavingUser] = useState(false);

    // Edit User Modal State
    const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
    const [editUserData, setEditUserData] = useState<any>(null);

    // Delete Confirmation Modal State
    const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [targetDelete, setTargetDelete] = useState<{ type: "user" | "job"; id: any; name: string } | null>(null);

    // Load Data
    const loadAllData = async () => {
        setLoading(true);
        try {
            const [usersRes, jobsRes] = await Promise.all([
                getAllUsers(),
                getAllJobs()
            ]);
            setUsers(usersRes || []);
            setJobs(jobsRes || []);
        } catch (err: any) {
            console.error("Admin load error:", err);
            errorNotification("Data Load Failed", "Unable to retrieve platform administrative data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        loadAllData();
    }, []);

    // Filtered Users
    const filteredUsers = useMemo(() => {
        return users.filter((u) => {
            const matchesSearch = 
                (u.name || "").toLowerCase().includes(userSearch.toLowerCase()) ||
                (u.email || "").toLowerCase().includes(userSearch.toLowerCase());
            const matchesRole = userRoleFilter === "ALL" || u.accountType === userRoleFilter;
            return matchesSearch && matchesRole;
        });
    }, [users, userSearch, userRoleFilter]);

    // Filtered Jobs
    const filteredJobs = useMemo(() => {
        return jobs.filter((j) => {
            const matchesSearch = 
                (j.jobTitle || "").toLowerCase().includes(jobSearch.toLowerCase()) ||
                (j.company || "").toLowerCase().includes(jobSearch.toLowerCase()) ||
                (j.location || "").toLowerCase().includes(jobSearch.toLowerCase());
            const matchesStatus = jobStatusFilter === "ALL" || j.jobStatus === jobStatusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [jobs, jobSearch, jobStatusFilter]);

    // Handle Create User
    const handleCreateUser = async () => {
        if (!newUserData.name.trim() || !newUserData.email.trim() || !newUserData.password.trim()) {
            errorNotification("Validation Error", "Please provide name, email, and password.");
            return;
        }
        setSavingUser(true);
        try {
            await adminCreateUser(newUserData);
            successNotification("User Provisioned", `${newUserData.accountType} account for ${newUserData.name} created successfully.`);
            closeAddModal();
            setNewUserData({ name: "", email: "", password: "Password@123", accountType: "EMPLOYER" });
            loadAllData();
        } catch (err: any) {
            console.error(err);
            errorNotification("Creation Failed", err?.response?.data?.errorMessage || "Could not register user.");
        } finally {
            setSavingUser(false);
        }
    };

    // Handle Update User
    const handleUpdateUser = async () => {
        if (!editUserData?.name?.trim() || !editUserData?.email?.trim()) {
            errorNotification("Validation Error", "Name and email cannot be empty.");
            return;
        }
        setSavingUser(true);
        try {
            await adminUpdateUser(editUserData);
            successNotification("User Updated", `Account details for ${editUserData.name} updated.`);
            closeEditModal();
            loadAllData();
        } catch (err: any) {
            console.error(err);
            errorNotification("Update Failed", err?.response?.data?.errorMessage || "Could not update user.");
        } finally {
            setSavingUser(false);
        }
    };

    // Handle Delete Execution
    const handleExecuteDelete = async () => {
        if (!targetDelete) return;
        setSavingUser(true);
        try {
            if (targetDelete.type === "user") {
                await adminDeleteUser(targetDelete.id);
                successNotification("Account Removed", `User ${targetDelete.name} was removed from the system.`);
            } else {
                await deleteJob(targetDelete.id);
                successNotification("Job Deleted", `Job listing ${targetDelete.name} was deleted.`);
            }
            closeDeleteModal();
            loadAllData();
        } catch (err: any) {
            console.error(err);
            errorNotification("Action Failed", err?.response?.data?.errorMessage || "Could not complete deletion.");
        } finally {
            setSavingUser(false);
        }
    };

    // Quick Toggle Job Status
    const handleToggleJobStatus = async (job: any) => {
        const nextStatus = job.jobStatus === "ACTIVE" ? "CLOSED" : "ACTIVE";
        try {
            await postJob({ ...job, jobStatus: nextStatus });
            successNotification("Status Changed", `${job.jobTitle} marked as ${nextStatus}.`);
            loadAllData();
        } catch (err: any) {
            console.error(err);
            errorNotification("Error", "Unable to update job status.");
        }
    };

    // Calculate Platform Metrics
    const metrics = useMemo(() => {
        const totalUsers = users.length;
        const totalEmployers = users.filter((u) => u.accountType === "EMPLOYER").length;
        const totalApplicants = users.filter((u) => u.accountType === "APPLICANT").length;
        const totalSuperadmins = users.filter((u) => u.accountType === "SUPERADMIN").length;
        const totalJobs = jobs.length;
        const activeJobs = jobs.filter((j) => j.jobStatus === "ACTIVE").length;
        const totalApplicantsCount = jobs.reduce((acc, j) => acc + (j.applicants?.length || 0), 0);

        return {
            totalUsers,
            totalEmployers,
            totalApplicants,
            totalSuperadmins,
            totalJobs,
            activeJobs,
            totalApplicantsCount
        };
    }, [users, jobs]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-mine-shaft-950 text-slate-900 dark:text-slate-100 font-sans pb-20 transition-colors">
            <LoadingOverlay visible={loading && !users.length} zIndex={1000} loaderProps={{ color: "amber", type: "bars" }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
                {/* Header Banner */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 text-white border border-purple-500/20 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-glow-sm shrink-0">
                                <IconShieldLock size={30} />
                            </div>
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-1.5 font-mono">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                    <span>PLATFORM ROOT ACCESS</span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                                    Superadmin Command Center
                                </h1>
                                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                                    Complete administrative sovereignty over organizations, user accounts, and system-wide job listings.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                onClick={loadAllData}
                                variant="light"
                                color="gray"
                                radius="xl"
                                leftSection={<IconRefresh size={16} />}
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold"
                            >
                                Refresh Data
                            </Button>

                            <Button
                                onClick={openAddModal}
                                radius="xl"
                                leftSection={<IconUserPlus size={18} />}
                                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                            >
                                Provision New Account
                            </Button>
                        </div>
                    </div>
                </div>

                {/* KPI Metrics Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-white/[0.08] shadow-xs">
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
                            <span>Total Users</span>
                            <IconUsers size={18} className="text-purple-500" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display mt-2">
                            {metrics.totalUsers}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                            <span className="text-amber-500 font-semibold">{metrics.totalEmployers} Employers</span>
                            <span>&bull;</span>
                            <span>{metrics.totalApplicants} Applicants</span>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-white/[0.08] shadow-xs">
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
                            <span>Active Job Openings</span>
                            <IconBriefcase size={18} className="text-amber-500" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display mt-2">
                            {metrics.activeJobs}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                            Out of {metrics.totalJobs} total listings recorded
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-white/[0.08] shadow-xs">
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
                            <span>Candidate Submissions</span>
                            <IconCheck size={18} className="text-emerald-500" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display mt-2">
                            {metrics.totalApplicantsCount}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                            Direct applications received
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-white/[0.08] shadow-xs">
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
                            <span>Superadmin Accounts</span>
                            <IconShieldLock size={18} className="text-purple-400" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400 font-display mt-2">
                            {metrics.totalSuperadmins}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                            Platform Root Level Privileges
                        </div>
                    </div>
                </div>

                {/* Primary Content Container with Tabs */}
                <div className="rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200/90 dark:border-white/[0.08] shadow-md dark:shadow-xl overflow-hidden transition-colors">
                    {/* Navigation Tabs Bar */}
                    <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab("users")}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                    activeTab === "users"
                                        ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                                }`}
                            >
                                <IconUsers size={18} />
                                <span>Users & Employers ({users.length})</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab("jobs")}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                    activeTab === "jobs"
                                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                                }`}
                            >
                                <IconBriefcase size={18} />
                                <span>Platform Job Listings ({jobs.length})</span>
                            </button>
                        </div>

                        {/* Search and Filters */}
                        {activeTab === "users" ? (
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <TextInput
                                    value={userSearch}
                                    onChange={(e) => setUserSearch(e.currentTarget.value)}
                                    placeholder="Search by name or email..."
                                    leftSection={<IconSearch size={16} className="text-slate-400" />}
                                    radius="xl"
                                    size="sm"
                                    className="w-full sm:w-64"
                                />
                                <Select
                                    value={userRoleFilter}
                                    onChange={(val) => setUserRoleFilter(val || "ALL")}
                                    data={[
                                        { value: "ALL", label: "All Roles" },
                                        { value: "EMPLOYER", label: "Employers" },
                                        { value: "APPLICANT", label: "Applicants" },
                                        { value: "SUPERADMIN", label: "Superadmins" },
                                    ]}
                                    radius="xl"
                                    size="sm"
                                    className="w-36"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <TextInput
                                    value={jobSearch}
                                    onChange={(e) => setJobSearch(e.currentTarget.value)}
                                    placeholder="Search job or company..."
                                    leftSection={<IconSearch size={16} className="text-slate-400" />}
                                    radius="xl"
                                    size="sm"
                                    className="w-full sm:w-64"
                                />
                                <Select
                                    value={jobStatusFilter}
                                    onChange={(val) => setJobStatusFilter(val || "ALL")}
                                    data={[
                                        { value: "ALL", label: "All Status" },
                                        { value: "ACTIVE", label: "Active" },
                                        { value: "CLOSED", label: "Closed" },
                                        { value: "DRAFT", label: "Draft" },
                                    ]}
                                    radius="xl"
                                    size="sm"
                                    className="w-36"
                                />
                            </div>
                        )}
                    </div>

                    {/* TAB 1: USERS & ORGANIZATIONS TABLE */}
                    {activeTab === "users" && (
                        <div className="overflow-x-auto">
                            <Table verticalSpacing="md" horizontalSpacing="lg" className="min-w-full">
                                <Table.Thead className="bg-slate-100/70 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider font-mono">
                                    <Table.Tr>
                                        <Table.Th>ID</Table.Th>
                                        <Table.Th>Name & Contact</Table.Th>
                                        <Table.Th>Role / Account Type</Table.Th>
                                        <Table.Th>Profile Linked</Table.Th>
                                        <Table.Th className="text-right">Administrative Actions</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {filteredUsers.length === 0 ? (
                                        <Table.Tr>
                                            <Table.Td colSpan={5} className="text-center py-12 text-slate-500">
                                                No users found matching current filter criteria.
                                            </Table.Td>
                                        </Table.Tr>
                                    ) : (
                                        filteredUsers.map((u) => (
                                            <Table.Tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] border-b border-slate-200/80 dark:border-white/[0.05] transition-colors">
                                                <Table.Td className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                    #{u.id}
                                                </Table.Td>
                                                <Table.Td>
                                                    <div className="font-bold text-sm text-slate-900 dark:text-white font-display">
                                                        {u.name}
                                                    </div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                                        {u.email}
                                                    </div>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Badge
                                                        color={
                                                            u.accountType === "SUPERADMIN"
                                                                ? "grape"
                                                                : u.accountType === "EMPLOYER"
                                                                ? "amber"
                                                                : "blue"
                                                        }
                                                        variant="light"
                                                        radius="sm"
                                                        className="font-bold uppercase tracking-wider"
                                                    >
                                                        {u.accountType}
                                                    </Badge>
                                                </Table.Td>
                                                <Table.Td className="font-mono text-xs text-slate-500 dark:text-slate-400">
                                                    {u.profileId ? (
                                                        <Link 
                                                            to={`/talent-profile/${u.profileId}`} 
                                                            className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 font-semibold"
                                                        >
                                                            <span>Profile #{u.profileId}</span>
                                                            <IconExternalLink size={12} />
                                                        </Link>
                                                    ) : (
                                                        <span className="text-slate-400">None</span>
                                                    )}
                                                </Table.Td>
                                                <Table.Td className="text-right">
                                                    <div className="inline-flex items-center gap-1.5">
                                                        <Tooltip label="Edit User Profile & Credentials" position="top" withArrow>
                                                            <ActionIcon
                                                                variant="light"
                                                                color="amber"
                                                                radius="md"
                                                                onClick={() => {
                                                                    setEditUserData({ ...u, password: "" });
                                                                    openEditModal();
                                                                }}
                                                            >
                                                                <IconEdit size={16} />
                                                            </ActionIcon>
                                                        </Tooltip>

                                                        <Tooltip label="Delete Account" position="top" withArrow>
                                                            <ActionIcon
                                                                variant="light"
                                                                color="red"
                                                                radius="md"
                                                                onClick={() => {
                                                                    setTargetDelete({ type: "user", id: u.id, name: u.name });
                                                                    openDeleteModal();
                                                                }}
                                                            >
                                                                <IconTrash size={16} />
                                                            </ActionIcon>
                                                        </Tooltip>
                                                    </div>
                                                </Table.Td>
                                            </Table.Tr>
                                        ))
                                    )}
                                </Table.Tbody>
                            </Table>
                        </div>
                    )}

                    {/* TAB 2: SYSTEM-WIDE JOB LISTINGS TABLE */}
                    {activeTab === "jobs" && (
                        <div className="overflow-x-auto">
                            <Table verticalSpacing="md" horizontalSpacing="lg" className="min-w-full">
                                <Table.Thead className="bg-slate-100/70 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider font-mono">
                                    <Table.Tr>
                                        <Table.Th>ID</Table.Th>
                                        <Table.Th>Role Title & Company</Table.Th>
                                        <Table.Th>Location & Comp</Table.Th>
                                        <Table.Th>Applicants</Table.Th>
                                        <Table.Th>Status</Table.Th>
                                        <Table.Th className="text-right">Actions</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {filteredJobs.length === 0 ? (
                                        <Table.Tr>
                                            <Table.Td colSpan={6} className="text-center py-12 text-slate-500">
                                                No job openings found matching filter criteria.
                                            </Table.Td>
                                        </Table.Tr>
                                    ) : (
                                        filteredJobs.map((j) => (
                                            <Table.Tr key={j.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] border-b border-slate-200/80 dark:border-white/[0.05] transition-colors">
                                                <Table.Td className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                    #{j.id}
                                                </Table.Td>
                                                <Table.Td>
                                                    <div className="font-bold text-sm text-slate-900 dark:text-white font-display">
                                                        {j.jobTitle}
                                                    </div>
                                                    <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1.5 mt-0.5">
                                                        <IconBuilding size={14} />
                                                        <span>{j.company}</span>
                                                        <span className="text-slate-300 dark:text-slate-600">&bull;</span>
                                                        <span className="text-slate-500 font-normal">Posted by User #{j.postedBy}</span>
                                                    </div>
                                                </Table.Td>
                                                <Table.Td>
                                                    <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                                                        <IconMapPin size={13} className="text-amber-500" />
                                                        <span>{j.location || "Remote"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                                                        <IconCurrencyDollar size={13} />
                                                        <span>{j.packageOffered ? `${j.packageOffered} LPA` : "Not specified"}</span>
                                                    </div>
                                                </Table.Td>
                                                <Table.Td>
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                                                        {j.applicants?.length || 0} applied
                                                    </span>
                                                </Table.Td>
                                                <Table.Td>
                                                    <Badge
                                                        color={
                                                            j.jobStatus === "ACTIVE"
                                                                ? "teal"
                                                                : j.jobStatus === "DRAFT"
                                                                ? "yellow"
                                                                : "red"
                                                        }
                                                        variant="light"
                                                        radius="sm"
                                                        className="font-bold cursor-pointer"
                                                        onClick={() => handleToggleJobStatus(j)}
                                                        title="Click to toggle status"
                                                    >
                                                        {j.jobStatus}
                                                    </Badge>
                                                </Table.Td>
                                                <Table.Td className="text-right">
                                                    <div className="inline-flex items-center gap-1.5">
                                                        <Tooltip label="View Public Listing" position="top" withArrow>
                                                            <Link to={`/jobs/${j.id}`}>
                                                                <ActionIcon variant="light" color="blue" radius="md">
                                                                    <IconEye size={16} />
                                                                </ActionIcon>
                                                            </Link>
                                                        </Tooltip>

                                                        <Tooltip label="Edit Job Details" position="top" withArrow>
                                                            <Link to={`/post-job/${j.id}`}>
                                                                <ActionIcon variant="light" color="amber" radius="md">
                                                                    <IconEdit size={16} />
                                                                </ActionIcon>
                                                            </Link>
                                                        </Tooltip>

                                                        <Tooltip label="Delete Listing" position="top" withArrow>
                                                            <ActionIcon
                                                                variant="light"
                                                                color="red"
                                                                radius="md"
                                                                onClick={() => {
                                                                    setTargetDelete({ type: "job", id: j.id, name: `${j.jobTitle} (${j.company})` });
                                                                    openDeleteModal();
                                                                }}
                                                            >
                                                                <IconTrash size={16} />
                                                            </ActionIcon>
                                                        </Tooltip>
                                                    </div>
                                                </Table.Td>
                                            </Table.Tr>
                                        ))
                                    )}
                                </Table.Tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL: PROVISION NEW USER / EMPLOYER */}
            <Modal
                opened={addModalOpened}
                onClose={closeAddModal}
                title={<span className="font-display font-extrabold text-lg text-slate-900 dark:text-white">Provision New Account</span>}
                centered
                radius="lg"
                padding="xl"
            >
                <div className="flex flex-col gap-4">
                    <TextInput
                        label="Full Legal Name"
                        placeholder="e.g. Rachel Green"
                        value={newUserData.name}
                        onChange={(e) => setNewUserData({ ...newUserData, name: e.currentTarget.value })}
                        withAsterisk
                    />

                    <TextInput
                        label="Email Address"
                        placeholder="e.g. rachel@enterprise.com"
                        value={newUserData.email}
                        onChange={(e) => setNewUserData({ ...newUserData, email: e.currentTarget.value })}
                        withAsterisk
                    />

                    <PasswordInput
                        label="Account Password"
                        placeholder="Minimum 8 characters"
                        value={newUserData.password}
                        onChange={(e) => setNewUserData({ ...newUserData, password: e.currentTarget.value })}
                        withAsterisk
                    />

                    <Select
                        label="Account Role / Authority Level"
                        data={[
                            { value: "EMPLOYER", label: "Employer (Can post & manage jobs)" },
                            { value: "APPLICANT", label: "Applicant (Job seeker)" },
                            { value: "SUPERADMIN", label: "Superadmin (Root access)" },
                        ]}
                        value={newUserData.accountType}
                        onChange={(val) => setNewUserData({ ...newUserData, accountType: val || "EMPLOYER" })}
                        withAsterisk
                    />

                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
                        <Button variant="subtle" color="gray" onClick={closeAddModal} disabled={savingUser}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateUser}
                            loading={savingUser}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                        >
                            Create Account
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* MODAL: EDIT EXISTING USER */}
            <Modal
                opened={editModalOpened}
                onClose={closeEditModal}
                title={<span className="font-display font-extrabold text-lg text-slate-900 dark:text-white">Edit User #{editUserData?.id}</span>}
                centered
                radius="lg"
                padding="xl"
            >
                {editUserData && (
                    <div className="flex flex-col gap-4">
                        <TextInput
                            label="Full Legal Name"
                            value={editUserData.name}
                            onChange={(e) => setEditUserData({ ...editUserData, name: e.currentTarget.value })}
                            withAsterisk
                        />

                        <TextInput
                            label="Email Address"
                            value={editUserData.email}
                            onChange={(e) => setEditUserData({ ...editUserData, email: e.currentTarget.value })}
                            withAsterisk
                        />

                        <Select
                            label="Account Role"
                            data={[
                                { value: "EMPLOYER", label: "Employer" },
                                { value: "APPLICANT", label: "Applicant" },
                                { value: "SUPERADMIN", label: "Superadmin" },
                            ]}
                            value={editUserData.accountType}
                            onChange={(val) => setEditUserData({ ...editUserData, accountType: val })}
                            withAsterisk
                        />

                        <PasswordInput
                            label="Reset Password (Optional)"
                            placeholder="Leave empty to keep existing password"
                            value={editUserData.password || ""}
                            onChange={(e) => setEditUserData({ ...editUserData, password: e.currentTarget.value })}
                        />

                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
                            <Button variant="subtle" color="gray" onClick={closeEditModal} disabled={savingUser}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpdateUser}
                                loading={savingUser}
                                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* MODAL: CONFIRM DELETION */}
            <Modal
                opened={deleteModalOpened}
                onClose={closeDeleteModal}
                title={<span className="font-display font-extrabold text-lg text-rose-500">Confirm Deletion</span>}
                centered
                radius="lg"
                padding="xl"
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Are you sure you want to permanently delete <strong className="text-slate-900 dark:text-white">{targetDelete?.name}</strong>? This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                        <Button variant="subtle" color="gray" onClick={closeDeleteModal} disabled={savingUser}>
                            Cancel
                        </Button>
                        <Button
                            color="red"
                            onClick={handleExecuteDelete}
                            loading={savingUser}
                            className="bg-rose-600 hover:bg-rose-500 font-bold"
                        >
                            Confirm Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminPage;
