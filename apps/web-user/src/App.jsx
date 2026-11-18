import React, { useMemo, useState } from 'react';
import {
  Activity, Bell, ChevronDown, ChevronRight, CircleHelp, Disc3, FileAudio2,
  FilePlus2, Headphones, Home, LayoutDashboard, LogOut, Menu, Music2,
  Search, Settings, ShieldCheck, SlidersHorizontal, UserRound, UserRoundPen,
  X, CheckCheck, Clock3, CircleCheck, CircleX, Upload, ExternalLink
} from 'lucide-react';

const initialSubmissions = [
  { id: 'MS-1048', title: 'Raat Ki Baatein', type: 'Single', date: '18 Nov 2026', status: 'Pending', tracks: 1 },
  { id: 'MS-1042', title: 'Safar EP', type: 'EP', date: '14 Nov 2026', status: 'Approved', tracks: 5 },
  { id: 'MS-1036', title: 'Dil Se', type: 'Single', date: '09 Nov 2026', status: 'Rejected', tracks: 1 },
  { id: 'MS-1028', title: 'Rang — The Album', type: 'Album', date: '02 Nov 2026', status: 'Approved', tracks: 9 },
  { id: 'MS-1021', title: 'Tera Mera', type: 'Single', date: '27 Oct 2026', status: 'Pending', tracks: 1 }
];
const notifications = [
  { title: 'Submission received', detail: 'Raat Ki Baatein is now under review.', time: '2 hours ago', unread: true, icon: FileAudio2 },
  { title: 'Release approved', detail: 'Your EP “Safar” has been approved.', time: 'Yesterday', unread: true, icon: CircleCheck },
  { title: 'Profile reminder', detail: 'Add your Spotify artist link to complete your profile.', time: '2 days ago', unread: false, icon: UserRoundPen }
];
const nav = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'My Submissions', icon: Disc3 },
  { label: 'New Submission', icon: FilePlus2 },
  { label: 'Artist Profile', icon: UserRound },
  { label: 'Notifications', icon: Bell },
  { label: 'Settings', icon: Settings }
];
const statusIcon = { Pending: Clock3, Approved: CircleCheck, Rejected: CircleX };

function App() {
  const [page, setPage] = useState('Overview');
  const [filter, setFilter] = useState('All');
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState('');
  const [readAll, setReadAll] = useState(false);
  const [releaseType, setReleaseType] = useState('Single');
  const [draftSaved, setDraftSaved] = useState(false);
  const visibleSubmissions = useMemo(() => initialSubmissions.filter(s =>
    (filter === 'All' || s.status === filter) &&
    (s.title.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()))
  ), [filter, search]);
  const counts = { All: initialSubmissions.length, Pending: initialSubmissions.filter(s=>s.status==='Pending').length, Approved: initialSubmissions.filter(s=>s.status==='Approved').length, Rejected: initialSubmissions.filter(s=>s.status==='Rejected').length };
  const go = (next) => { setPage(next); setMobileNav(false); if (next === 'My Submissions') setFilter('All'); };
  const openStatus = (status) => { setFilter(status); setPage('My Submissions'); };

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Music2 size={21}/></div><div><b>SoundDesk</b><span>ARTIST PORTAL</span></div><button className="icon-btn close-nav" onClick={()=>setMobileNav(false)} aria-label="Close menu"><X size={19}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{nav.map(item => <button key={item.label} onClick={()=>go(item.label)} className={`nav-item ${page===item.label?'active':''}`}><item.icon size={18}/><span>{item.label}</span>{item.label==='Notifications' && <i className="nav-dot"/>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={17}/></div><b>Need a hand?</b><p>Visit our artist help center for guidance.</p><button onClick={()=>go('Help Center')}>Get support <ExternalLink size={13}/></button></div><div className="user-mini"><div className="avatar">SL</div><div className="user-mini-copy"><b>Shahid Lashari</b><span>Artist account</span></div><button className="icon-btn" aria-label="Account menu"><ChevronDown size={16}/></button></div></div>
    </aside>
    {mobileNav && <button className="scrim" onClick={()=>setMobileNav(false)} aria-label="Close navigation"/>}
    <main className="main-area">
      <header className="topbar"><button className="icon-btn menu-btn" onClick={()=>setMobileNav(true)} aria-label="Open menu"><Menu size={21}/></button><div className="breadcrumb">Workspace <ChevronRight size={14}/> <b>{page}</b></div><div className="top-actions"><button className="top-icon" onClick={()=>go('Notifications')} aria-label="Notifications"><Bell size={19}/><i/></button><div className="top-divider"/><div className="top-user"><div className="avatar small">SL</div><span>Shahid</span><ChevronDown size={15}/></div></div></header>
      <div className="page-wrap">
        {page === 'Overview' && <Dashboard counts={counts} openStatus={openStatus} go={go} readAll={readAll} setReadAll={setReadAll}/>}
        {page === 'My Submissions' && <Submissions items={visibleSubmissions} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} go={go}/>}
        {page === 'New Submission' && <NewSubmission releaseType={releaseType} setReleaseType={setReleaseType} draftSaved={draftSaved} setDraftSaved={setDraftSaved}/>}
        {page === 'Artist Profile' && <Profile/>}
        {page === 'Notifications' && <Notifications readAll={readAll} setReadAll={setReadAll}/>}
        {page === 'Settings' && <SettingsPage/>}
        {page === 'Help Center' && <section className="content-card"><h2>Artist Help Center</h2><p className="muted">Guides and support resources will be available here.</p></section>}
      </div>
    </main>
  </div>;
}

function PageHeading({eyebrow,title,description,action}) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}
function Dashboard({counts,openStatus,go,readAll,setReadAll}) {
  return <>
    <PageHeading eyebrow="YOUR MUSIC SPACE" title="Welcome, Shahid" description="Here’s what’s happening with your music." action={<button className="primary-btn" onClick={()=>go('New Submission')}><FilePlus2 size={17}/> New Music Submission</button>}/>
    <div className="stats-grid">{[
      ['Total submissions',counts.All,'All','violet',Disc3],['Pending review',counts.Pending,'Pending','amber',Clock3],['Approved',counts.Approved,'Approved','green',CircleCheck],['Rejected',counts.Rejected,'Rejected','rose',CircleX]
    ].map(([label,value,key,tone,Icon])=><button className="stat-card" key={key} onClick={()=>openStatus(key)}><div className="stat-top"><span>{label}</span><i className={tone}><Icon size={17}/></i></div><strong>{value}</strong><span className="stat-link">View {key.toLowerCase()} <ChevronRight size={14}/></span></button>)}</div>
    <div className="dashboard-grid">
      <section className="content-card submissions-card"><div className="card-heading"><div><h2>Recent submissions</h2><p>Your latest release activity</p></div><button className="text-btn" onClick={()=>go('My Submissions')}>View all <ChevronRight size={15}/></button></div><div className="table-wrap"><table><thead><tr><th>RELEASE</th><th>TYPE</th><th>SUBMITTED</th><th>STATUS</th></tr></thead><tbody>{initialSubmissions.slice(0,4).map(s=><tr key={s.id}><td><div className="release-cell"><div className="cover-art"><Music2 size={17}/></div><div><b>{s.title}</b><span>{s.id}</span></div></div></td><td>{s.type}</td><td>{s.date}</td><td><StatusPill status={s.status}/></td></tr>)}</tbody></table></div></section>
      <section className="content-card profile-card"><div className="card-heading"><div><h2>Artist profile</h2><p>Build your artist presence</p></div><button className="round-link" onClick={()=>go('Artist Profile')}><ChevronRight size={17}/></button></div><div className="profile-progress"><div className="progress-ring"><b>70%</b></div><div><b>Almost there!</b><span>Your profile is looking good.</span></div></div><div className="progress-bar"><i/></div><p className="small-note">Add your artist bio and Spotify link to reach 100%.</p><button className="outline-btn full" onClick={()=>go('Artist Profile')}>Complete profile <ChevronRight size={15}/></button></section>
    </div>
    <div className="dashboard-grid lower-grid">
      <section className="content-card"><div className="card-heading"><div><h2>Notifications</h2><p>Stay up to date</p></div><button className="text-btn" onClick={()=>go('Notifications')}>View all <ChevronRight size={15}/></button></div><div className="notification-list">{notifications.map((n,i)=><div className="notification-row" key={n.title}><div className="notice-icon"><n.icon size={17}/></div><div className="notice-copy"><b>{n.title}</b><span>{n.detail}</span><small>{n.time}</small></div>{n.unread&&!readAll&&<i className="unread-dot"/>}</div>)}</div><button className="subtle-btn" onClick={()=>setReadAll(true)}><CheckCheck size={15}/> Mark all as read</button></section>
      <section className="content-card quick-card"><div className="card-heading"><div><h2>Quick links</h2><p>Your shortcuts</p></div></div><div className="quick-grid">{[['Artist Profile',UserRoundPen],['My Submissions',Disc3],['Notifications',Bell],['Settings',Settings]].map(([name,Icon])=><button key={name} onClick={()=>go(name)}><Icon size={18}/><span>{name}</span><ChevronRight size={15}/></button>)}</div><div className="secure-note"><ShieldCheck size={16}/> Your account and music are kept secure.</div></section>
    </div>
    <footer className="footer">© 2026 SoundDesk <span>Made for independent artists</span></footer>
  </>;
}
function StatusPill({status}) { const Icon=statusIcon[status]||Clock3; return <span className={`status-pill ${status.toLowerCase()}`}><Icon size={13}/>{status}</span>; }
function Submissions({items,filter,setFilter,search,setSearch,go}) {
  return <><PageHeading eyebrow="YOUR CATALOG" title="My submissions" description="Track every release you’ve sent to SoundDesk." action={<button className="primary-btn" onClick={()=>go('New Submission')}><FilePlus2 size={17}/> New submission</button>}/><section className="content-card list-card"><div className="filter-row"><div className="tabs">{['All','Pending','Approved','Rejected'].map(x=><button className={filter===x?'selected':''} key={x} onClick={()=>setFilter(x)}>{x}</button>)}</div><label className="search-box"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search releases"/></label></div><div className="table-wrap"><table><thead><tr><th>RELEASE</th><th>FORMAT</th><th>TRACKS</th><th>SUBMITTED</th><th>STATUS</th><th/></tr></thead><tbody>{items.map(s=><tr key={s.id}><td><div className="release-cell"><div className="cover-art"><Music2 size={17}/></div><div><b>{s.title}</b><span>{s.id}</span></div></div></td><td>{s.type}</td><td>{s.tracks}</td><td>{s.date}</td><td><StatusPill status={s.status}/></td><td><button className="icon-btn" title="View submission"><ChevronRight size={17}/></button></td></tr>)}</tbody></table>{items.length===0&&<div className="empty-state">No submissions match this filter.</div>}</div></section></>;
}
function NewSubmission({releaseType,setReleaseType,draftSaved,setDraftSaved}) {
  return <><PageHeading eyebrow="RELEASE WORKFLOW" title="New music submission" description="Start a new release. You can save a draft and finish it later."/>{draftSaved&&<div className="success-banner"><CircleCheck size={17}/> Draft saved locally for this prototype.</div>}<div className="form-layout"><section className="content-card form-card"><div className="form-section-title"><span>01</span><div><h2>Release details</h2><p>Tell us about the music you’re submitting.</p></div></div><label className="field-label">Release type</label><div className="release-types">{[['Single','One track'],['EP','2–6 tracks'],['Album','7+ tracks']].map(([type,desc])=><button className={releaseType===type?'chosen':''} key={type} onClick={()=>setReleaseType(type)}><Disc3 size={19}/><b>{type}</b><span>{desc}</span></button>)}</div><div className="form-grid"><label>Release title<input placeholder="Enter release title"/></label><label>Primary artist<input placeholder="Artist or band name"/></label><label>Genre<select defaultValue=""><option value="" disabled>Select genre</option><option>Pop</option><option>Rock</option><option>Hip-hop</option><option>Classical</option><option>Other</option></select></label><label>Language<select defaultValue=""><option value="" disabled>Select language</option><option>Urdu</option><option>English</option><option>Punjabi</option><option>Other</option></select></label><label>Release date<input type="date"/></label><label>Label (optional)<input placeholder="Record label"/></label></div><div className="form-section-title track-title"><span>02</span><div><h2>Audio & artwork</h2><p>Upload your audio files and release cover.</p></div></div><div className="upload-box"><Upload size={22}/><b>Upload release artwork</b><span>JPG, JPEG or PNG · Size limit set by administrator</span><button className="outline-btn">Choose artwork</button></div><div className="upload-box audio-upload"><FileAudio2 size={22}/><b>Upload audio track</b><span>MP3, WAV or FLAC · {releaseType==='Single'?'One track required':'Add audio for each track'}</span><button className="outline-btn">Choose audio files</button></div><div className="form-actions"><button className="outline-btn" onClick={()=>setDraftSaved(true)}>Save as draft</button><button className="primary-btn" onClick={()=>setDraftSaved(true)}>Continue <ChevronRight size={16}/></button></div><p className="prototype-note">Upload controls and submission processing will be connected to secure storage in the next integration phase.</p></section><aside className="content-card checklist-card"><h3>Before you submit</h3><p>Make sure your release is ready for review.</p>{['Audio files are final and high quality','Artwork belongs to this release','Artist and track metadata is accurate','You have rights to distribute this music'].map(x=><div className="check-item" key={x}><CircleCheck size={16}/>{x}</div>)}</aside></div></>;
}
function Profile() { return <><PageHeading eyebrow="ARTIST IDENTITY" title="Artist profile" description="Manage the details listeners and our team use to identify your music."/><section className="content-card profile-edit"><div className="profile-banner"><div className="avatar profile-avatar">SL</div><div><h2>Shahid Lashari</h2><p>Artist profile · Private</p></div><button className="outline-btn">Change picture</button></div><div className="form-grid"><label>Artist name<input defaultValue="Shahid Lashari"/></label><label>Country<input defaultValue="Pakistan"/></label><label>City<input defaultValue="Dera Ghazi Khan"/></label><label>Public profile URL<input placeholder="Optional — enable public profile first"/></label><label className="span-two">Artist bio<textarea rows="4" placeholder="Tell listeners about your music and story."/></label><label>Instagram<input placeholder="https://instagram.com/"/></label><label>Facebook<input placeholder="https://facebook.com/"/></label><label>YouTube<input placeholder="https://youtube.com/"/></label><label>TikTok<input placeholder="https://tiktok.com/"/></label><label>Spotify<input placeholder="Artist profile link"/></label><label>Apple Music<input placeholder="Artist profile link"/></label></div><div className="form-actions"><button className="primary-btn">Save profile</button></div></section></>; }
function Notifications({readAll,setReadAll}) { return <><PageHeading eyebrow="UPDATES" title="Notifications" description="Your submission and account activity in one place." action={<button className="outline-btn" onClick={()=>setReadAll(true)}><CheckCheck size={15}/> Mark all as read</button>}/><section className="content-card notification-page">{notifications.map((n,i)=><div className="notification-row large" key={n.title}><div className="notice-icon"><n.icon size={18}/></div><div className="notice-copy"><b>{n.title}</b><span>{n.detail}</span><small>{n.time}</small></div>{n.unread&&!readAll&&<span className="new-label">NEW</span>}</div>)}</section></>; }
function SettingsPage() { return <><PageHeading eyebrow="ACCOUNT PREFERENCES" title="Settings" description="Manage your sign-in, notifications and privacy preferences."/><div className="settings-grid"><section className="content-card setting-item"><div className="setting-icon"><ShieldCheck size={19}/></div><div><h3>Security & password</h3><p>Change your password and review active sessions.</p></div><ChevronRight/></section><section className="content-card setting-item"><div className="setting-icon"><Bell size={19}/></div><div><h3>Notifications</h3><p>Manage email, push and sound preferences.</p></div><ChevronRight/></section><section className="content-card setting-item"><div className="setting-icon"><UserRound size={19}/></div><div><h3>Account & privacy</h3><p>Update your email, request account deletion or export data.</p></div><ChevronRight/></section></div></>; }
export default App;
