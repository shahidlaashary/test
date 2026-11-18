import React, { useMemo, useState } from 'react';
import {
  SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Pressable,
  TextInput, Alert, Switch, KeyboardAvoidingView, Platform
} from 'react-native';

type ReleaseStatus = 'Pending' | 'Approved' | 'Rejected' | 'Draft';
type Release = { id: string; title: string; type: string; date: string; status: ReleaseStatus; artist: string };
const initialReleases: Release[] = [
  { id: 'MS-1048', title: 'Raat Ki Baatein', type: 'Single', date: '18 Nov 2026', status: 'Pending', artist: 'Shahid Laashary' },
  { id: 'MS-1042', title: 'Safar EP', type: 'EP · 4 tracks', date: '14 Nov 2026', status: 'Approved', artist: 'Shahid Laashary' },
  { id: 'MS-1036', title: 'Dil Se', type: 'Single', date: '10 Nov 2026', status: 'Rejected', artist: 'Shahid Laashary' },
  { id: 'MS-1029', title: 'Yaadein', type: 'Album · 8 tracks', date: '06 Nov 2026', status: 'Draft', artist: 'Shahid Laashary' },
];
const palette = { bg: '#F6F7FB', ink: '#1E293B', muted: '#8290A3', purple: '#6857E8', line: '#E9EDF4', green: '#16865F', amber: '#B7791F', red: '#C4515B' };
const statusStyle = (status: ReleaseStatus) => status === 'Approved' ? styles.approved : status === 'Rejected' ? styles.rejected : status === 'Draft' ? styles.draft : styles.pending;

function Action({ title, onPress, secondary = false }: { title: string; onPress: () => void; secondary?: boolean }) {
  return <Pressable onPress={onPress} style={[styles.action, secondary && styles.secondaryAction]}><Text style={[styles.actionText, secondary && styles.secondaryText]}>{title}</Text></Pressable>;
}
function Pill({ status }: { status: ReleaseStatus }) {
  return <Text style={[styles.pill, statusStyle(status)]}>{status}</Text>;
}
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('demo@sounddesk.app');
  const [password, setPassword] = useState('Demo1234!');
  const [tab, setTab] = useState('Home');
  const [releases, setReleases] = useState(initialReleases);
  const [filter, setFilter] = useState('All');
  const [showNew, setShowNew] = useState(false);
  const [releaseType, setReleaseType] = useState('Single');
  const [releaseTitle, setReleaseTitle] = useState('');
  const [artistName, setArtistName] = useState('Shahid Laashary');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('Urdu');
  const [releaseDate, setReleaseDate] = useState('');
  const [bio, setBio] = useState('Independent artist creating music and sharing stories.');
  const [sound, setSound] = useState(true);
  const [push, setPush] = useState(true);
  const [readNotifications, setReadNotifications] = useState(false);

  const counts = useMemo(() => ({
    Total: releases.filter(r => r.status !== 'Draft').length,
    Pending: releases.filter(r => r.status === 'Pending').length,
    Approved: releases.filter(r => r.status === 'Approved').length,
    Rejected: releases.filter(r => r.status === 'Rejected').length,
  }), [releases]);
  const visibleReleases = releases.filter(r => filter === 'All' || r.status === filter);

  const login = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Login details required', 'Demo login ke liye email aur password enter karein, ya Demo Login button use karein.');
      return;
    }
    setLoggedIn(true);
    setTab('Home');
  };
  const demoLogin = () => { setEmail('demo@sounddesk.app'); setPassword('Demo1234!'); setLoggedIn(true); setTab('Home'); };
  const createRelease = (asDraft: boolean) => {
    if (!releaseTitle.trim()) { Alert.alert('Release title required', 'Please enter a release title.'); return; }
    const item: Release = { id: 'DEMO-' + (Date.now().toString().slice(-5)), title: releaseTitle.trim(), type: releaseType, date: 'Today', status: asDraft ? 'Draft' : 'Pending', artist: artistName };
    setReleases(prev => [item, ...prev]);
    setShowNew(false); setReleaseTitle(''); setGenre(''); setReleaseDate(''); setTab('Submissions'); setFilter('All');
    Alert.alert(asDraft ? 'Draft saved' : 'Submission received', asDraft ? 'Your demo draft has been saved on this device.' : 'Your demo submission is now Pending.');
  };

  if (!loggedIn) return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.bg} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.loginWrap} keyboardShouldPersistTaps="handled">
          <View style={styles.brandMark}><Text style={styles.brandGlyph}>♫</Text></View>
          <Text style={styles.brand}>SoundDesk</Text>
          <Text style={styles.loginTitle}>Your music, managed.</Text>
          <Text style={styles.loginSub}>Sign in to manage releases, track submissions and keep your artist profile up to date.</Text>
          <View style={styles.loginCard}>
            <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
            <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="Enter your email" placeholderTextColor="#AAB3C0" style={styles.input} />
            <Text style={styles.fieldLabel}>PASSWORD</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Enter password" placeholderTextColor="#AAB3C0" style={styles.input} />
            <Action title="Sign In" onPress={login} />
            <Pressable onPress={demoLogin} style={styles.demoButton}><Text style={styles.demoButtonText}>Continue with Demo Login  →</Text></Pressable>
            <View style={styles.demoInfo}><Text style={styles.demoInfoTitle}>DEMO ACCESS</Text><Text style={styles.demoInfoText}>Email: demo@sounddesk.app</Text><Text style={styles.demoInfoText}>Password: Demo1234!</Text><Text style={styles.demoNote}>No registration required. Demo changes stay on this device and can be reset by restarting the app.</Text></View>
          </View>
          <Text style={styles.loginFooter}>DEMO MODE · NOT CONNECTED TO LIVE ACCOUNTS</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  const goNew = () => { setShowNew(true); setTab('New'); };
  const header = <View style={styles.topHeader}><View><Text style={styles.eyebrow}>SOUNDDESK ARTIST PORTAL</Text><Text style={styles.screenTitle}>{tab === 'Home' ? 'Welcome, Shahid' : tab === 'New' ? 'New submission' : tab}</Text></View><View style={styles.avatar}><Text style={styles.avatarText}>SL</Text></View></View>;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.bg} />
      {header}
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
        {tab === 'Home' && <>
          <Text style={styles.subheading}>Here’s what’s happening with your music.</Text>
          <Action title="＋  New Music Submission" onPress={goNew} />
          <View style={styles.statsGrid}>{(['Total', 'Pending', 'Approved', 'Rejected'] as const).map(label =>
            <Pressable key={label} style={styles.statCard} onPress={() => { setFilter(label === 'Total' ? 'All' : label); setTab('Submissions'); }}>
              <Text style={styles.statLabel}>{label} submissions</Text><Text style={styles.statNumber}>{counts[label]}</Text><Text style={styles.statLink}>View {label.toLowerCase()}  ↗</Text>
            </Pressable>)}</View>
          <View style={styles.card}><View style={styles.cardHead}><Text style={styles.cardTitle}>Recent submissions</Text><Pressable onPress={() => { setFilter('All'); setTab('Submissions'); }}><Text style={styles.link}>View all</Text></Pressable></View>
            {releases.filter(r => r.status !== 'Draft').slice(0, 5).map(r => <ReleaseRow key={r.id} item={r} />)}
          </View>
          <View style={styles.card}><View style={styles.cardHead}><Text style={styles.cardTitle}>Artist profile</Text><Pressable onPress={() => setTab('Artist Profile')}><Text style={styles.link}>Complete</Text></Pressable></View>
            <Text style={styles.progressText}>70% complete</Text><View style={styles.progressTrack}><View style={styles.progressFill}/></View><Text style={styles.helper}>Add your artist bio and streaming links to finish your profile.</Text>
          </View>
          <View style={styles.card}><Text style={styles.cardTitle}>Notifications</Text><Text style={styles.notificationLine}>●  Your release “Raat Ki Baatein” is under review.</Text><Text style={styles.notificationLine}>●  “Safar EP” has been approved.</Text><Pressable onPress={() => setTab('Notifications')}><Text style={styles.link}>View all notifications →</Text></Pressable></View>
        </>}
        {tab === 'New' && <View style={styles.card}>
          <Text style={styles.cardTitle}>Release information</Text><Text style={styles.helper}>Create a Single, EP or Album submission. This is a local demo form.</Text>
          <Text style={styles.fieldLabel}>RELEASE TYPE</Text><View style={styles.typeRow}>{['Single','EP','Album'].map(t=><Pressable key={t} onPress={()=>setReleaseType(t)} style={[styles.typeChip,releaseType===t&&styles.typeChipActive]}><Text style={[styles.typeText,releaseType===t&&styles.typeTextActive]}>{t}</Text></Pressable>)}</View>
          <Text style={styles.fieldLabel}>RELEASE TITLE *</Text><TextInput value={releaseTitle} onChangeText={setReleaseTitle} placeholder="Enter release title" style={styles.input}/>
          <Text style={styles.fieldLabel}>ARTIST NAME</Text><TextInput value={artistName} onChangeText={setArtistName} placeholder="Artist name" style={styles.input}/>
          <Text style={styles.fieldLabel}>GENRE</Text><TextInput value={genre} onChangeText={setGenre} placeholder="e.g. Pop, Qawwali, Sufi" style={styles.input}/>
          <Text style={styles.fieldLabel}>LANGUAGE</Text><TextInput value={language} onChangeText={setLanguage} placeholder="Language" style={styles.input}/>
          <Text style={styles.fieldLabel}>PLANNED RELEASE DATE</Text><TextInput value={releaseDate} onChangeText={setReleaseDate} placeholder="YYYY-MM-DD (optional)" style={styles.input}/>
          <View style={styles.uploadBox}><Text style={styles.uploadIcon}>♫</Text><Text style={styles.uploadTitle}>Audio and artwork upload</Text><Text style={styles.helper}>MP3 / WAV / FLAC · JPG / JPEG / PNG</Text><Text style={styles.demoNote}>File upload will be connected in the backend phase.</Text></View>
          <Action title="Submit for review" onPress={() => createRelease(false)}/><Action title="Save as draft" secondary onPress={() => createRelease(true)}/>
        </View>}
        {tab === 'Submissions' && <View style={styles.card}><Text style={styles.cardTitle}>My submissions</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginVertical:12}}>{['All','Pending','Approved','Rejected','Draft'].map(f=><Pressable key={f} onPress={()=>setFilter(f)} style={[styles.filterChip,filter===f&&styles.filterActive]}><Text style={[styles.filterText,filter===f&&styles.filterTextActive]}>{f}</Text></Pressable>)}</ScrollView>
          {visibleReleases.length ? visibleReleases.map(r=><ReleaseRow key={r.id} item={r}/>) : <Text style={styles.helper}>No submissions in this category yet.</Text>}
        </View>}
        {tab === 'Notifications' && <View style={styles.card}><View style={styles.cardHead}><Text style={styles.cardTitle}>Notifications</Text><Pressable onPress={()=>setReadNotifications(true)}><Text style={styles.link}>Mark all read</Text></Pressable></View>
          {['Your release “Raat Ki Baatein” is under review.','Congratulations! “Safar EP” has been approved.','Your artist profile is 70% complete.'].map((n,i)=><View key={n} style={styles.notice}><View style={[styles.noticeDot,readNotifications&&{backgroundColor:'#CBD2DC'}]}/><View style={{flex:1}}><Text style={styles.noticeText}>{n}</Text><Text style={styles.helper}>{i===0?'Today':i===1?'14 Nov 2026':'12 Nov 2026'}</Text></View></View>)}
        </View>}
        {tab === 'Artist Profile' && <View style={styles.card}><Text style={styles.cardTitle}>Artist profile</Text><View style={styles.profileHero}><View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>SL</Text></View><View><Text style={styles.profileName}>Shahid Laashary</Text><Text style={styles.helper}>Artist profile · Demo account</Text></View></View>
          <Text style={styles.fieldLabel}>ARTIST BIO</Text><TextInput multiline value={bio} onChangeText={setBio} style={[styles.input,{height:100,textAlignVertical:'top'}]}/><Text style={styles.fieldLabel}>COUNTRY</Text><TextInput defaultValue="Pakistan" style={styles.input}/><Text style={styles.fieldLabel}>CITY</Text><TextInput defaultValue="Dera Ghazi Khan" style={styles.input}/><Text style={styles.fieldLabel}>SOCIAL LINKS</Text>{['Instagram','Facebook','YouTube','TikTok','Spotify','Apple Music'].map(s=><TextInput key={s} placeholder={s+' URL (optional)'} style={styles.input}/>)}<Action title="Save profile (demo)" onPress={()=>Alert.alert('Saved','Profile changes are stored for this demo session.')}/></View>}
        {tab === 'Settings' && <View style={styles.card}><Text style={styles.cardTitle}>Settings</Text><Text style={styles.fieldLabel}>NOTIFICATIONS</Text><View style={styles.settingRow}><Text style={styles.settingText}>Notification sound</Text><Switch value={sound} onValueChange={setSound} trackColor={{true:palette.purple}}/></View><View style={styles.settingRow}><Text style={styles.settingText}>Push notifications</Text><Switch value={push} onValueChange={setPush} trackColor={{true:palette.purple}}/></View><Text style={styles.fieldLabel}>ACCOUNT</Text><Text style={styles.settingText}>demo@sounddesk.app</Text><Text style={styles.demoNote}>Demo mode: password, email verification and device sessions are not active yet.</Text><Action title="Log out" secondary onPress={()=>{setLoggedIn(false);setTab('Home');}}/><Action title="Reset demo data" secondary onPress={()=>Alert.alert('Reset demo data','Restart the app to restore the original sample data.')}/></View>}
      </ScrollView>
      <View style={styles.bottomNav}>{[['Home','⌂'],['Submissions','▤'],['New','＋'],['Notifications','♧'],['Settings','⚙']].map(([name,icon])=><Pressable key={name} onPress={()=>name==='New'?goNew():setTab(name)} style={styles.navItem}><Text style={[styles.navIcon,tab===name&&styles.navActive]}>{icon}</Text><Text style={[styles.navLabel,tab===name&&styles.navActive]}>{name}</Text></Pressable>)}</View>
      <View style={styles.demoRibbon}><Text style={styles.demoRibbonText}>DEMO MODE · SAMPLE DATA ONLY</Text></View>
    </SafeAreaView>
  );
}

function ReleaseRow({ item }: { item: Release }) {
  return <View style={styles.releaseRow}><View style={styles.cover}><Text style={styles.coverGlyph}>♫</Text></View><View style={{flex:1}}><Text style={styles.releaseTitle}>{item.title}</Text><Text style={styles.releaseMeta}>{item.id}  ·  {item.type}</Text><Text style={styles.releaseMeta}>{item.date}</Text></View><Pill status={item.status}/></View>;
}

const styles = StyleSheet.create({
 safe:{flex:1,backgroundColor:palette.bg},loginWrap:{flexGrow:1,justifyContent:'center',padding:24,paddingTop:42,paddingBottom:36},brandMark:{width:58,height:58,borderRadius:18,backgroundColor:'#EAE7FF',alignItems:'center',justifyContent:'center',alignSelf:'center'},brandGlyph:{fontSize:32,color:palette.purple},brand:{fontSize:20,fontWeight:'900',color:palette.ink,textAlign:'center',marginTop:12},loginTitle:{fontSize:27,fontWeight:'900',color:palette.ink,textAlign:'center',marginTop:28},loginSub:{fontSize:13,lineHeight:20,color:palette.muted,textAlign:'center',marginTop:8,marginBottom:24},loginCard:{backgroundColor:'#fff',borderRadius:18,padding:20,borderWidth:1,borderColor:palette.line},fieldLabel:{fontSize:10,fontWeight:'800',letterSpacing:1,color:'#8491A3',marginTop:15,marginBottom:8},input:{backgroundColor:'#FAFBFD',borderColor:palette.line,borderWidth:1,borderRadius:10,paddingHorizontal:13,paddingVertical:12,fontSize:13,color:palette.ink,marginBottom:5},action:{backgroundColor:palette.purple,padding:15,borderRadius:11,alignItems:'center',marginTop:13},actionText:{color:'#fff',fontWeight:'800',fontSize:13},secondaryAction:{backgroundColor:'#F0EEFF',marginTop:9},secondaryText:{color:palette.purple},demoButton:{alignItems:'center',padding:14,marginTop:3},demoButtonText:{fontSize:13,color:palette.purple,fontWeight:'800'},demoInfo:{backgroundColor:'#F7F6FF',borderRadius:10,padding:13,marginTop:8},demoInfoTitle:{fontSize:9,color:palette.purple,fontWeight:'900',letterSpacing:1.2,marginBottom:6},demoInfoText:{fontSize:12,color:'#596579',marginTop:3},demoNote:{fontSize:10,lineHeight:16,color:'#929DAD',marginTop:9},loginFooter:{fontSize:9,letterSpacing:1,color:'#A0A9B6',textAlign:'center',marginTop:22},topHeader:{paddingHorizontal:20,paddingTop:13,paddingBottom:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},eyebrow:{fontSize:9,letterSpacing:1.3,color:palette.purple,fontWeight:'900'},screenTitle:{fontSize:22,fontWeight:'900',color:palette.ink,marginTop:5},avatar:{width:39,height:39,borderRadius:20,backgroundColor:'#EAE7FF',alignItems:'center',justifyContent:'center'},avatarText:{color:palette.purple,fontWeight:'900'},page:{padding:18,paddingBottom:20},subheading:{fontSize:12,color:palette.muted,marginBottom:14},statsGrid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',marginTop:15,marginBottom:5},statCard:{width:'48.5%',backgroundColor:'#fff',borderRadius:13,borderWidth:1,borderColor:palette.line,padding:14,marginBottom:10},statLabel:{fontSize:10,color:palette.muted},statNumber:{fontSize:27,fontWeight:'900',color:palette.ink,marginTop:7},statLink:{fontSize:10,color:palette.purple,fontWeight:'700',marginTop:5},card:{backgroundColor:'#fff',borderRadius:14,borderWidth:1,borderColor:palette.line,padding:16,marginBottom:13},cardHead:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:9},cardTitle:{fontSize:14,fontWeight:'900',color:palette.ink},link:{fontSize:11,color:palette.purple,fontWeight:'800'},releaseRow:{flexDirection:'row',alignItems:'center',gap:10,paddingVertical:12,borderTopWidth:1,borderTopColor:'#F0F2F6'},cover:{width:38,height:38,borderRadius:8,backgroundColor:'#5D559B',alignItems:'center',justifyContent:'center'},coverGlyph:{fontSize:19,color:'#fff'},releaseTitle:{fontSize:12,fontWeight:'800',color:'#354156'},releaseMeta:{fontSize:9,color:'#98A2B0',marginTop:3},pill:{fontSize:9,fontWeight:'800',paddingHorizontal:8,paddingVertical:6,borderRadius:12,overflow:'hidden'},pending:{color:'#A66D16',backgroundColor:'#FFF3DF'},approved:{color:'#16865F',backgroundColor:'#E5F7EF'},rejected:{color:'#C4515B',backgroundColor:'#FFECEF'},draft:{color:'#68758A',backgroundColor:'#EEF1F5'},progressText:{fontSize:11,color:'#596579',marginBottom:8},progressTrack:{height:6,borderRadius:6,backgroundColor:'#EEECFA',overflow:'hidden'},progressFill:{height:6,width:'70%',backgroundColor:palette.purple},helper:{fontSize:10,color:'#929DAD',lineHeight:16,marginTop:7},notificationLine:{fontSize:11,color:'#657186',lineHeight:19,marginVertical:5},progressFillUnused:{},bottomNav:{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#fff',borderTopWidth:1,borderTopColor:palette.line,paddingTop:9,paddingBottom:7},navItem:{alignItems:'center',minWidth:55},navIcon:{fontSize:19,color:'#9AA4B2'},navLabel:{fontSize:9,color:'#9AA4B2',marginTop:2},navActive:{color:palette.purple,fontWeight:'900'},demoRibbon:{backgroundColor:'#F0EEFF',paddingVertical:5,alignItems:'center'},demoRibbonText:{fontSize:8,letterSpacing:1,color:palette.purple,fontWeight:'900'},filterChip:{borderRadius:20,paddingVertical:8,paddingHorizontal:12,backgroundColor:'#F3F5F8',marginRight:7},filterActive:{backgroundColor:'#EAE7FF'},filterText:{fontSize:10,color:'#768295',fontWeight:'700'},filterTextActive:{color:palette.purple},typeRow:{flexDirection:'row',gap:8},typeChip:{borderRadius:9,borderWidth:1,borderColor:palette.line,paddingVertical:10,paddingHorizontal:16},typeChipActive:{borderColor:palette.purple,backgroundColor:'#F1EFFF'},typeText:{fontSize:12,color:'#738095',fontWeight:'700'},typeTextActive:{color:palette.purple},uploadBox:{borderWidth:1,borderStyle:'dashed',borderColor:'#CFCBF5',borderRadius:12,alignItems:'center',padding:18,marginTop:16,marginBottom:6,backgroundColor:'#FBFAFF'},uploadIcon:{fontSize:24,color:palette.purple},uploadTitle:{fontSize:12,color:palette.ink,fontWeight:'800',marginTop:6},notice:{flexDirection:'row',paddingVertical:13,borderTopWidth:1,borderTopColor:'#F0F2F6',gap:10},noticeDot:{width:8,height:8,borderRadius:4,backgroundColor:palette.purple,marginTop:5},noticeText:{fontSize:12,color:'#526074',lineHeight:18},profileHero:{flexDirection:'row',alignItems:'center',gap:12,marginVertical:17},profileAvatar:{width:54,height:54,borderRadius:27,backgroundColor:'#EAE7FF',alignItems:'center',justifyContent:'center'},profileAvatarText:{fontSize:17,color:palette.purple,fontWeight:'900'},profileName:{fontSize:14,color:palette.ink,fontWeight:'900'},settingRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:12,borderTopWidth:1,borderTopColor:'#F0F2F6'},settingText:{fontSize:12,color:'#596579'}
});
