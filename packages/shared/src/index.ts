export const RELEASE_TYPES = ['Single', 'EP', 'Album'] as const;
export const SUBMISSION_STATUSES = ['Pending', 'Approved', 'Rejected', 'Draft'] as const;
export const AUDIO_FORMATS = ['mp3', 'wav', 'flac'] as const;
export const ARTWORK_FORMATS = ['jpg', 'jpeg', 'png'] as const;
export type ReleaseType = typeof RELEASE_TYPES[number];
export type SubmissionStatus = typeof SUBMISSION_STATUSES[number];
export interface TrackMetadata {
  title: string;
  artistName: string;
  featuredArtist?: string;
  composer?: string;
  lyricist?: string;
  producer?: string;
  language?: string;
  genre?: string;
}
export interface ReleaseSubmission {
  id: string;
  ownerId: string;
  title: string;
  releaseType: ReleaseType;
  status: SubmissionStatus;
  artworkPath?: string;
  tracks: TrackMetadata[];
  createdAt: string;
  updatedAt: string;
}