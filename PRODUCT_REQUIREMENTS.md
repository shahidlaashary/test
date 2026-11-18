# Product Requirements

## User app
- Email/password account access with mandatory email verification.
- Public registration can be enabled/disabled by Super Admin; existing users retain login access when registration is disabled.
- Admin-created accounts use secure password-setup email links and still require email verification.
- User dashboard: welcome with username only; Total/Pending/Approved/Rejected counters; counters open filtered submission history; prominent New Music Submission action; latest five submissions and View All; latest three notifications and View All; quick links to Artist Profile, My Submissions, Notifications, Settings; profile completion percentage and missing-field guidance.
- Users can create Single, EP, and Album releases. Each track has its own audio and metadata; EP/Album share release artwork.
- Audio: MP3, WAV, FLAC. Artwork: JPG/JPEG/PNG only. Admin-configurable size limits per audio format and artwork. Upload UI must report progress, uploaded/remaining size, and completion.
- Audio technical metadata: duration, bitrate, sample rate, format. No configurable technical min/max thresholds.
- Save incomplete drafts; user may delete own drafts. Admin can view drafts only.
- Submission history statuses: Pending, Approved, Rejected. Pending cannot be edited. Rejected can be corrected and resubmitted. Approved can be edited; edits return to Pending. Preserve prior versions.
- No public rejection feedback. Admin-only internal notes.
- Email notifications: received, resubmitted, approved, rejected; status changes and suspicious-login security alerts. Security alerts are email-only, no SMS.
- Artist profile: artist name, bio, profile picture, country, city, social links (Instagram, Facebook, YouTube, TikTok, Spotify, Apple Music). Optional public URL, private by default.
- Account security: password reset/change, verified email change, account deletion request/approval, data export ZIP, login activity, logout all devices.
- Deletion requests: Pending/Approved/Rejected; user can cancel while pending; Admin rejection reason is user-visible.

## Admin dashboard
- Manage Submissions tabs: Pending, Approved, Rejected, Drafts; search/filter/sort; tabbed detail (Overview, Tracks, Artwork); per-track playback; approve/reject confirmation; status history and admin audit trail.
- Admin reference attachments: multiple files, admin always access; user visibility/download toggle; add/replace/delete.
- Manage Users: Active/Suspended tabs; search and profile detail; suspend/reactivate/permanent delete; bulk suspend/reactivate/delete; CSV/XLSX export; PDF profile/history export is lower priority.
- Suspension preserves account data and submissions. Permanent deletion removes account, submissions, audio, artwork, and related data after confirmation.
- Account deletion requests are reviewed by Admin.
- Admin notifications: registrations, submissions, approvals, rejections, system alerts; read/unread, mark all read, individual/bulk delete, sound and browser push settings.
- Settings: General, Registration, Upload Settings, Notifications, User Permissions. Branding includes logo, app name, primary/secondary colors. Login/signup backgrounds remain fixed.
- Backups: manual and daily automatic; automatic retained 15 days; manual retained until deleted; downloadable; restore preview and confirmation.
- System logs: login attempts, account changes, submission events, errors; filter/search/sort; CSV/XLSX export; delete individual/clear all with confirmation.
- One Main Admin initially; future roles Super Admin, Submission Manager, Support Admin with configurable permissions. Mandatory password + email OTP 2FA for every Admin.
- Admin audit trail includes actor, action, date/time, related record, and previous/new values.
- Permission changes terminate affected Admin sessions. Working-hour schedules and temporary extensions are configurable per Admin; expiry ends sessions and is logged.
- Simultaneous Admin device limit; device list and remote session termination.
- Separate failed-login thresholds and lock durations for Admin and User accounts; automatic and authorized manual unlock. Super Admin security alerts; user email alert for suspicious activity with secure-account actions.
